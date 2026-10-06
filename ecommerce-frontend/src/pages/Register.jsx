import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8085/users/register", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: "USER",
                }),
            });

            const data = await response.json();

            console.log("REGISTER STATUS:", response.status);
            console.log("REGISTER RESPONSE:", data);

            if (!response.ok) {
                alert("Registration failed: " + (data.message || "Please try again"));
                return;
            }

            alert("Registration successful!");
            navigate("/login");

        } catch (error) {
            console.error("REGISTER ERROR:", error);
            alert("User Service is not running.");
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-card">
                <h1>Create Account</h1>

                <form onSubmit={register}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="auth-button" type="submit">
                        Register
                    </button>
                </form>

                <br />

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    );
}

export default Register;