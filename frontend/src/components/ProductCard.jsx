// Child component
// Modernized ProductCard Component
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function ProductCard({
  productId,
  title,
  price,
  image,
  onAddToCart,
  isInCart,
  onAddToWishlist,
}) {
  return (
    <div className="bg-[#F3F4F6] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative group">
      <Link to={`/product/${productId}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      <div className="p-4">
        <Link to={`/product/${productId}`}>
          <h2 className="text-[#212121] font-semibold text-base mb-1 truncate hover:underline">
            {title}
          </h2>
        </Link>
        <p className="text-[#20B2AA] font-bold text-lg mb-3">
          ${price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <button
          className={`w-full py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm ${
            isInCart
              ? "bg-[#ECECEC] text-gray-500 cursor-not-allowed"
              : "bg-[#20B2AA] text-white hover:bg-[#199a96]"
          }`}
          onClick={() =>
            onAddToCart({
              productId,
              title,
              price,
              image,
            })
          }
          disabled={isInCart}
        >
          {isInCart ? "✓ Added to Cart" : "Add to Cart"}
        </button>

        {/* Wishlist Button */}
        <button
          className="w-full mt-3 py-2 bg-white border border-[#20B2AA] text-[#20B2AA] rounded-xl font-medium text-sm hover:bg-[#E6E6FA] transition-all duration-300 flex justify-center items-center gap-2"
          onClick={onAddToWishlist}
        >
          <Heart size={16} /> Wishlist
        </button>
      </div>

      {/* Decorative Accent (optional) */}
      <div className="absolute top-3 left-3 bg-[#E6E6FA] text-[#616161] text-xs px-2 py-0.5 rounded-full">
        Featured
      </div>
    </div>
  );
}

export default ProductCard;
