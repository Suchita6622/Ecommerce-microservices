import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCart(savedCart);
    }, []);

    const updateQuantity = (id, change) => {
        const updatedCart = cart
            .map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + change,
                    };
                }

                return item;
            })
            .filter((item) => item.quantity > 0);

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter(
            (item) => item.id !== id
        );

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    const subtotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.price) * item.quantity,
        0
    );

    const delivery = subtotal > 0 ? 0 : 0;

    const total = subtotal + delivery;

    return (
        <main className="cart-page">

            <h1>🛒 Your Shopping Cart</h1>

            {cart.length === 0 ? (

                <div className="cart-summary">

                    <h2>Your cart is empty</h2>

                    <p>
                        Add some products to continue shopping.
                    </p>

                    <Link to="/products">
                        <button className="checkout-btn">
                            Continue Shopping
                        </button>
                    </Link>

                </div>

            ) : (

                <>
                    {cart.map((item) => (

                        <div
                            className="cart-item"
                            key={item.id}
                        >

                            <div className="cart-item-image">
                                <div style={{ fontSize: "70px" }}>
                                    📦
                                </div>
                            </div>

                            <div className="cart-item-info">

                                <h2>{item.name}</h2>

                                {item.brand && (
                                    <p>
                                        Brand: {item.brand.name}
                                    </p>
                                )}

                                <p>
                                    ₹
                                    {Number(item.price).toLocaleString(
                                        "en-IN"
                                    )}
                                </p>

                                <div className="quantity-control">

                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, -1)
                                        }
                                    >
                                        −
                                    </button>

                                    <strong>
                                        {item.quantity}
                                    </strong>

                                    <button
                                        onClick={() =>
                                            updateQuantity(item.id, 1)
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <br />

                                <button
                                    onClick={() =>
                                        removeItem(item.id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                            <div>
                                <strong>
                                    ₹
                                    {(
                                        Number(item.price) *
                                        item.quantity
                                    ).toLocaleString("en-IN")}
                                </strong>
                            </div>

                        </div>

                    ))}

                    <div className="cart-summary">

                        <h2>Price Details</h2>

                        <div className="cart-summary-row">
                            <span>Subtotal</span>

                            <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
                        </div>

                        <div className="cart-summary-row">
                            <span>Delivery</span>

                            <span>
                {delivery === 0
                    ? "FREE"
                    : `₹${delivery}`}
              </span>
                        </div>

                        <div className="cart-summary-row cart-total">
                            <span>Total Amount</span>

                            <span>
                ₹{total.toLocaleString("en-IN")}
              </span>
                        </div>

                        <Link to="/checkout">
                            <button className="checkout-btn">
                                Proceed to Checkout
                            </button>
                        </Link>

                    </div>
                </>
            )}

        </main>
    );
}

export default Cart;