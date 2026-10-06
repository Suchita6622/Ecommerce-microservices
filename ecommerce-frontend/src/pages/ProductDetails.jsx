import { useEffect, useState } from "react";
import {
    Link,
    useParams,
} from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8085/products/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Product not found");
                }

                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const addToCart = () => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(
            (item) => item.id === product.id
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
            });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Product added to cart 🛒");
    };

    if (loading) {
        return (
            <main className="product-details">
                <h2>Loading product...</h2>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="product-details">
                <h2>Product not found</h2>

                <Link to="/products">
                    ← Back to Products
                </Link>
            </main>
        );
    }

    return (
        <main className="product-details">

            <div className="product-details-image">
                <div style={{ fontSize: "160px" }}>
                    📦
                </div>
            </div>

            <div className="product-details-info">

                <h1>{product.name}</h1>

                {product.brand && (
                    <p>
                        <strong>Brand:</strong>{" "}
                        {product.brand.name}
                    </p>
                )}

                {product.category && (
                    <p>
                        <strong>Category:</strong>{" "}
                        {product.category.name}
                    </p>
                )}

                <p className="product-rating">
                    ⭐⭐⭐⭐⭐
                </p>

                <p className="price">
                    ₹
                    {Number(product.price).toLocaleString(
                        "en-IN"
                    )}
                </p>

                <p className="description">
                    {product.description}
                </p>

                <p>
                    <strong>Available Quantity:</strong>{" "}
                    {product.quantity}
                </p>

                <br />

                <button
                    className="details-cart"
                    onClick={addToCart}
                >
                    🛒 Add to Cart
                </button>

                <Link to="/cart">
                    <button className="buy-now">
                        Buy Now
                    </button>
                </Link>

                <br />
                <br />

                <Link to="/products">
                    ← Back to Products
                </Link>

            </div>
        </main>
    );
}

export default ProductDetails;