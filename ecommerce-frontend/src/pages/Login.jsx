import { useState } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8085/users/login?email=${encodeURIComponent(
                    email
                )}&password=${encodeURIComponent(password)}`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                alert("Invalid email or password");
                return;
            }

            const data = await response.json();
            console.log("LOGIN DATA:", data);
            localStorage.setItem(
                "token",
                data.token
            );

            alert("Login successful!");

            navigate("/products");

        } catch (error) {
            console.error(error);

            alert(
                "User Service is not running."
            );
        }
    };

    return (
        <main className="auth-page">

            <div className="auth-card">

                <h1>Login</h1>

                <form onSubmit={login}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <br />

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </main>
    );
}

export default Login;