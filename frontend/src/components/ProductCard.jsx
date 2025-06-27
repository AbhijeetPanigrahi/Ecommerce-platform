// Child Component

import { useCart } from "../context/CartContext";

function ProductCard({ title, price, image, onAddToCart, isInCart }) {
  const { cart, setCart } = useCart();
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
      <img src={image} alt={title} className="h-56 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h2>
        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
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
      </div>
    </div>
  );
}

export default ProductCard;
