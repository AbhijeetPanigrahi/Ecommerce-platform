import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // for (add to cart) and (wishlist) feature:
  const { cart, setCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  // for (add to cart) and (wishlist) feature:
  const handleAddToCart = () => {
    if (!user) return navigate("/auth");
    setCart((prev) => [...prev, product]);
  };
  const handleAddToWishlist = () => {
    if (!user) return navigate("/auth");
    addToWishlist(product);
  };
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-40 h-40 object-contain mb-4"
      />
      <p className="text-lg text-gray-700 mb-2">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
      <div>
        <button
          className={`px-6 py-2 rounded ${
            isInCart
              ? "bg-green-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
        <button
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
