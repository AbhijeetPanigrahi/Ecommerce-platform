// Updated Product Details Page
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useUser } from "../context/UserContext";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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

  const handleAddToCart = () => {
    if (!user) return navigate("/auth");
    setCart((prev) => [...prev, product]);
  };

  const handleAddToWishlist = () => {
    if (!user) return navigate("/auth");
    addToWishlist(product);
  };

  const isInCart = cart.some((item) => item.id === product?.id);

  if (!product)
    return (
      <p className="text-center mt-10 text-gray-600">Loading product...</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#F8F8F8] rounded-2xl shadow-md mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-[#212121] leading-tight">
            {product.title}
          </h1>

          <p className="text-xl text-[#20B2AA] font-bold">${product.price}</p>

          <p className="text-gray-700 leading-relaxed text-sm">
            {product.description}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              className={`px-6 py-3 text-sm rounded-xl transition font-medium shadow-sm ${
                isInCart
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-[#20B2AA] hover:bg-[#199a96] text-white"
              }`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </button>

            <button
              className="px-6 py-3 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition font-medium shadow-sm"
              onClick={handleAddToWishlist}
            >
              ❤️ Wishlist
            </button>
          </div>

          <Link
            to="/"
            className="block mt-6 text-sm text-[#20B2AA] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
