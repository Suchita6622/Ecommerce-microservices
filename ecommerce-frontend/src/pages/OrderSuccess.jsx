import { Link } from "react-router-dom";

function OrderSuccess() {
    const order =
        JSON.parse(
            localStorage.getItem("lastOrder")
        );

    return (
        <main
            style={{
                minHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 20px",
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    textAlign: "center",
                    padding: "45px",
                    borderRadius: "16px",
                    background: "#fff",
                    boxShadow:
                        "0 8px 30px rgba(0,0,0,0.1)",
                }}
            >

                <div style={{ fontSize: "70px" }}>
                    🎉
                </div>

                <h1
                    style={{
                        color: "#2874f0",
                        marginBottom: "10px",
                    }}
                >
                    Order Placed Successfully!
                </h1>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#555",
                    }}
                >
                    Thank you for shopping with
                    ShopKart.
                </p>

                {order && (

                    <div
                        style={{
                            marginTop: "25px",
                            padding: "20px",
                            background: "#f7f9fc",
                            borderRadius: "10px",
                            textAlign: "left",
                        }}
                    >

                        <p>
                            <strong>
                                Order ID:
                            </strong>{" "}
                            {order.id}
                        </p>

                        <p>
                            <strong>
                                Amount:
                            </strong>{" "}
                            ₹
                            {Number(
                                order.finalAmount ??
                                order.subtotal ??
                                0
                            ).toLocaleString(
                                "en-IN"
                            )}
                        </p>

                        <p>
                            <strong>
                                Payment:
                            </strong>{" "}
                            {order.paymentMethod}
                        </p>

                        <p>
                            <strong>
                                Status:
                            </strong>{" "}
                            {order.orderStatus}
                        </p>

                        {order.expectedDeliveryDate && (

                            <p>
                                <strong>
                                    Expected Delivery:
                                </strong>{" "}
                                {order.expectedDeliveryDate}
                            </p>

                        )}

                    </div>

                )}

                <div
                    style={{
                        marginTop: "30px",
                    }}
                >

                    <Link to="/products">

                        <button className="checkout-btn">
                            Continue Shopping
                        </button>

                    </Link>

                </div>

            </div>

        </main>
    );
}

export default OrderSuccess;