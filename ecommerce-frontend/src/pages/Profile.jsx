import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
            return;
        }

        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            // GET USER PROFILE
            const userResponse = await fetch(
                "http://localhost:8085/users/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!userResponse.ok) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            const userData = await userResponse.json();
            setUser(userData);

            // GET USER ORDERS
            const orderResponse = await fetch(
                `http://localhost:8085/orders/user/${userData.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (orderResponse.ok) {
                const orderData = await orderResponse.json();
                setOrders(orderData);
            }

        } catch (error) {
            console.error("Profile loading error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading profile...</h2>;
    }

    return (
        <div style={{ padding: "40px" }}>

            {/* PROFILE */}
            <div
                style={{
                    background: "#f5f5f5",
                    padding: "25px",
                    borderRadius: "12px",
                    marginBottom: "30px",
                }}
            >
                <h1>👤 My Profile</h1>

                {user && (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </>
                )}
            </div>

            {/* ORDERS */}
            <h1>📦 My Orders</h1>

            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            padding: "20px",
                            marginTop: "20px",
                        }}
                    >
                        <h2>Order #{order.id}</h2>

                        <p>
                            <strong>Order Status:</strong>{" "}
                            {order.orderStatus}
                        </p>

                        <p>
                            <strong>Payment Status:</strong>{" "}
                            {order.paymentStatus}
                        </p>

                        <p>
                            <strong>Total Amount:</strong>{" "}
                            ₹{order.finalAmount}
                        </p>

                        <p>
                            <strong>Delivery PIN:</strong>{" "}
                            {order.deliveryPinCode}
                        </p>

                        {order.items && order.items.length > 0 && (
                            <>
                                <h3>Items</h3>

                                {order.items.map((item) => (
                                    <div key={item.id}>
                                        Product ID: {item.productId} | Quantity:{" "}
                                        {item.quantity} | Price: ₹{item.price}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Profile;