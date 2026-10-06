import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:8085/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);

                setError(
                    "Unable to load products. Please check Product Service."
                );

                setLoading(false);
            });
    }, []);

    const filteredProducts =
        category === "All"
            ? products
            : products.filter(
                (product) => product.category?.name === category
            );

    if (loading) {
        return (
            <main className="products-page">
                <div className="products-header">
                    <h1>Shop Electronics</h1>
                    <p>Loading products...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="products-page">
                <div className="products-header">
                    <h1>Shop Electronics</h1>
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="products-page">
            <div className="products-header">
                <h1>Shop Electronics</h1>

                <p>
                    Find your favourite products and brands
                </p>
            </div>

            <div className="products-layout">

                {/* FILTER */}
                <aside className="filter-sidebar">
                    <h3>Categories</h3>

                    <div
                        className="filter-option"
                        onClick={() => setCategory("All")}
                    >
                        🛍️ All Products
                    </div>

                    <div
                        className="filter-option"
                        onClick={() => setCategory("Mobile Phones")}
                    >
                        📱 Mobile Phones
                    </div>

                    <div
                        className="filter-option"
                        onClick={() => setCategory("Laptops")}
                    >
                        💻 Laptops
                    </div>

                    <div
                        className="filter-option"
                        onClick={() => setCategory("TVs")}
                    >
                        📺 TVs
                    </div>

                    <div
                        className="filter-option"
                        onClick={() => setCategory("Tablets")}
                    >
                        📱 Tablets
                    </div>

                    <div
                        className="filter-option"
                        onClick={() => setCategory("Accessories")}
                    >
                        🎧 Accessories
                    </div>
                </aside>

                {/* PRODUCTS */}
                <div>
                    <div style={{ marginBottom: "15px" }}>
                        <strong>
                            {filteredProducts.length} Products
                        </strong>
                    </div>

                    <div className="product-grid">

                        {filteredProducts.length === 0 ? (
                            <p>No products found.</p>
                        ) : (
                            filteredProducts.map((product) => (
                                <div
                                    className="product-card"
                                    key={product.id}
                                >
                                    <div className="product-image">
                                        <img
                                            src={
                                                product.category?.name === "TVs"
                                                    ? "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=700&q=85"
                                                    : product.category?.name === "Mobile Phones"
                                                        ? "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85"
                                                        : product.category?.name === "Laptops"
                                                            ? "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85"
                                                            : product.category?.name === "Tablets"
                                                                ? "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=85"
                                                                : product.category?.name === "Accessories"
                                                                    ? "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85"
                                                                    : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"
                                            }
                                            alt={product.name}
                                            style={{
                                                width: "100%",
                                                height: "190px",
                                                objectFit: "contain",
                                                borderRadius: "10px"
                                            }}
                                        />
                                    </div>

                                    <div className="product-info">

                                        <h3>{product.name}</h3>

                                        {product.brand && (
                                            <p
                                                style={{
                                                    color: "#2874f0",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {product.brand.name}
                                            </p>
                                        )}

                                        <p className="product-description">
                                            {product.description}
                                        </p>

                                        <p className="product-price">
                                            ₹
                                            {Number(product.price).toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>

                                        <p className="product-rating">
                                            ⭐⭐⭐⭐⭐
                                        </p>

                                        <Link
                                            to={`/product/${product.id}`}
                                        >
                                            <button className="add-cart">
                                                View Product
                                            </button>
                                        </Link>

                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}

export default Products;