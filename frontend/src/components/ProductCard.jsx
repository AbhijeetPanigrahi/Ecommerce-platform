// Child Component

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
function ProductCard({
  productId,
  title,
  price,
  image,
  onAddToCart,
  isInCart,
  onAddToWishlist,
}) {
  const { cart, setCart } = useCart();
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
      <Link to={`/product/${productId}`}>
        <img src={image} alt={title} className="h-56 w-full object-cover" />
      </Link>

      <div className="p-4">
        {/* 📝 Title now links to Product Details */}
        <Link to={`/product/${productId}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:underline truncate">
            {title}
          </h2>
        </Link>

        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>

        {/* Add to Cart */}
        {isInCart ? (
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded cursor-not-allowed"
            disabled
          >
            Added
          </button>
        ) : (
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        )}

        {/* Wishlist */}
        <button
          className="mt-2 w-full bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
          onClick={onAddToWishlist}
        >
          ❤️ Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
