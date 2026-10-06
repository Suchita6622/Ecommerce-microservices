import "../App.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to ShopKart</h1>

                    <p>
                        Discover the latest electronics, amazing deals and everything
                        you need in one place.
                    </p>

                    <Link to="/products">
                        <button>Explore Products</button>
                    </Link>
                </div>
            </section>

            <section className="promo-section">
                <h2>Explore Electronics</h2>

                <div className="promo-grid">
                    <div className="promo-card">
                        <h3>💻 Laptops</h3>
                        <p>
                            Powerful laptops for work, study and entertainment.
                        </p>

                        <Link to="/products">
                            <button>Shop Now</button>
                        </Link>
                    </div>

                    <div className="promo-card">
                        <h3>📱 Smartphones</h3>

                        <p>
                            Discover the latest smartphones from top brands.
                        </p>

                        <Link to="/products">
                            <button>Explore</button>
                        </Link>
                    </div>

                    <div className="promo-card">
                        <h3>📺 Smart TVs</h3>

                        <p>
                            Upgrade your entertainment experience.
                        </p>

                        <Link to="/products">
                            <button>View Deals</button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="promo-section">
                <h2>Why ShopKart?</h2>

                <div className="promo-grid">
                    <div className="promo-card">
                        <h3>🚚 Fast Delivery</h3>

                        <p>
                            Get your products delivered quickly to your doorstep.
                        </p>
                    </div>

                    <div className="promo-card">
                        <h3>🔒 Secure Shopping</h3>

                        <p>
                            Your account and shopping experience stay protected.
                        </p>
                    </div>

                    <div className="promo-card">
                        <h3>💳 Easy Checkout</h3>

                        <p>
                            Simple checkout with multiple payment options.
                        </p>
                    </div>
                </div>
            </section>

            <section className="promo-section">
                <div
                    style={{
                        textAlign: "center",
                        padding: "30px",
                    }}
                >
                    <h2>Ready to Start Shopping?</h2>

                    <p
                        style={{
                            margin: "15px 0 25px",
                            color: "#666",
                        }}
                    >
                        Login to your ShopKart account and start shopping today.
                    </p>

                    <Link to="/login">
                        <button className="checkout-btn">
                            Login & Start Shopping
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Home;