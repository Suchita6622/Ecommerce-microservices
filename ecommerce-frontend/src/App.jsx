import "./App.css";

import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
function App() {
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        window.location.href = "/";
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to="/" className="logo">
                        ShopKart
                    </Link>

                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                </div>

                <div className="navbar-right">
                    <Link to="/cart">🛒 Cart</Link>

                    {token ? (
                        <>
                            <Link to="/profile">👤 My Profile</Link>

                            <button onClick={logout} className="nav-button">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* ROUTES */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products />} />

                <Route path="/product/:id" element={<ProductDetails />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>

            {/* FOOTER */}
            <footer className="footer">
                <div>
                    <h3>ShopKart</h3>
                    <p>Your trusted online electronics store.</p>
                </div>

                <div>
                    <h4>Quick Links</h4>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                </div>

                <div>
                    <h4>Customer Service</h4>
                    <p>Secure Shopping</p>
                    <p>Fast Delivery</p>
                    <p>Easy Checkout</p>
                </div>

                <div>
                    <h4>Contact</h4>
                    <p>Email: support@shopkart.com</p>
                    <p>India</p>
                </div>
            </footer>
        </>
    );
}

export default App;