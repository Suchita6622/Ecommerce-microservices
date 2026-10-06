import { useState } from "react";
import {
    useNavigate,
} from "react-router-dom";

function Checkout() {
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        houseNumber: "",
        street: "",
        area: "",
        city: "",
        state: "",
        pinCode: "",
        landmark: "",
    });

    const [paymentMethod, setPaymentMethod] =
        useState("COD");

    const [placingOrder, setPlacingOrder] =
        useState(false);

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) * item.quantity,
        0
    );

    const handleChange = (event) => {
        setAddress({
            ...address,
            [event.target.name]: event.target.value,
        });
    };

    const placeOrder = async () => {

        if (
            !address.houseNumber ||
            !address.street ||
            !address.city ||
            !address.state ||
            !address.pinCode
        ) {
            alert(
                "Please fill all required address details."
            );
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {
            alert(
                "Please login before placing an order."
            );

            navigate("/login");
            return;
        }

        setPlacingOrder(true);

        try {

            /* GET LOGGED-IN USER */

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

                alert(
                    "Session expired. Please login again."
                );

                navigate("/login");
                return;
            }

            const user =
                await userResponse.json();


            /* CREATE ADDRESS */

            const addressResponse =
                await fetch(
                    "http://localhost:8085/addresses",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            userId: user.id,
                            houseNumber:
                            address.houseNumber,
                            street:
                            address.street,
                            area:
                            address.area,
                            city:
                            address.city,
                            state:
                            address.state,
                            pinCode:
                            address.pinCode,
                            landmark:
                            address.landmark,
                        }),
                    }
                );

            if (!addressResponse.ok) {
                throw new Error(
                    "Address creation failed"
                );
            }

            const savedAddress =
                await addressResponse.json();


            /* CREATE ORDER */

            const orderResponse =
                await fetch(
                    "http://localhost:8085/orders",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            userId: user.id,

                            subtotal: total,

                            promoCode: null,

                            discount: 0,

                            finalAmount: total,

                            deliveryPinCode:
                            address.pinCode,

                            addressId:
                            savedAddress.id,

                            paymentMethod:
                            paymentMethod,

                            paymentStatus:
                                "PENDING",

                            orderStatus:
                                "PLACED",

                            items: cart.map(
                                (item) => ({
                                    productId: item.id,
                                    quantity:
                                    item.quantity,
                                    price:
                                        Number(item.price),
                                })
                            ),
                        }),
                    }
                );

            if (!orderResponse.ok) {
                throw new Error(
                    "Order creation failed"
                );
            }

            const order =
                await orderResponse.json();


            /* CREATE PAYMENT RECORD */

            const paymentResponse =
                await fetch(
                    "http://localhost:8085/payments",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            orderId: order.id,
                            userId: user.id,
                            amount: total,
                            paymentMethod:
                            paymentMethod,
                        }),
                    }
                );

            if (!paymentResponse.ok) {
                throw new Error(
                    "Payment creation failed"
                );
            }


            /* CLEAR CART */

            localStorage.removeItem("cart");


            /* SAVE LAST ORDER */

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );


            /* SUCCESS */

            alert(
                "🎉 Order placed successfully!"
            );

            navigate("/order-success");

        } catch (error) {

            console.error(error);

            alert(
                "Something went wrong while placing your order. Please make sure all backend services are running."
            );

        } finally {

            setPlacingOrder(false);

        }
    };

    return (
        <main className="checkout-page">

            <h1>Checkout</h1>


            {/* ADDRESS */}

            <section className="checkout-section">

                <h2>
                    📍 Delivery Address
                </h2>

                <div className="address-grid">

                    <input
                        name="houseNumber"
                        placeholder="House Number *"
                        value={
                            address.houseNumber
                        }
                        onChange={handleChange}
                    />

                    <input
                        name="street"
                        placeholder="Street *"
                        value={
                            address.street
                        }
                        onChange={handleChange}
                    />

                    <input
                        name="area"
                        placeholder="Area"
                        value={
                            address.area
                        }
                        onChange={handleChange}
                    />

                    <input
                        name="city"
                        placeholder="City *"
                        value={
                            address.city
                        }
                        onChange={handleChange}
                    />

                    <input
                        name="state"
                        placeholder="State *"
                        value={
                            address.state
                        }
                        onChange={handleChange}
                    />

                    <input
                        name="pinCode"
                        placeholder="PIN Code *"
                        value={
                            address.pinCode
                        }
                        onChange={handleChange}
                    />

                    <input
                        name="landmark"
                        placeholder="Landmark"
                        value={
                            address.landmark
                        }
                        onChange={handleChange}
                    />

                </div>

            </section>


            {/* PAYMENT */}

            <section className="checkout-section">

                <h2>
                    💳 Payment Method
                </h2>

                <label>

                    <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={
                            paymentMethod === "COD"
                        }
                        onChange={(e) =>
                            setPaymentMethod(
                                e.target.value
                            )
                        }
                    />

                    Cash on Delivery

                </label>

                <br />

                <label>

                    <input
                        type="radio"
                        name="payment"
                        value="ONLINE"
                        checked={
                            paymentMethod === "ONLINE"
                        }
                        onChange={(e) =>
                            setPaymentMethod(
                                e.target.value
                            )
                        }
                    />

                    Online Payment

                </label>

            </section>


            {/* ORDER SUMMARY */}

            <section className="checkout-section">

                <h2>
                    🛒 Order Summary
                </h2>

                {cart.map((item) => (

                    <div
                        className="cart-summary-row"
                        key={item.id}
                    >

            <span>
              {item.name} ×{" "}
                {item.quantity}
            </span>

                        <span>
              ₹
                            {(
                                Number(item.price) *
                                item.quantity
                            ).toLocaleString("en-IN")}
            </span>

                    </div>

                ))}

                <div className="cart-summary-row cart-total">

          <span>
            Total Amount
          </span>

                    <span>
            ₹
                        {total.toLocaleString(
                            "en-IN"
                        )}
          </span>

                </div>

                <button
                    className="checkout-btn"
                    onClick={placeOrder}
                    disabled={placingOrder}
                >
                    {placingOrder
                        ? "Placing Order..."
                        : "Place Order"}
                </button>

            </section>

        </main>
    );
}

export default Checkout;