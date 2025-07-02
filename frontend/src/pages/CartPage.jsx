import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, setCart } = useCart();
  const handleRemoveFromCart = (removeItemId) => {
    const updatedCart = cart.filter((item) => item.id != removeItemId);
    setCart(updatedCart);
  };
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>
      {user ? (
        cart.length === 0 ? (
          <>
            <p className="text-gray-600">The cart is empty!</p>
            <Link
              to="/"
              className="inline-block mt-4 text-blue-600 hover:underline font-medium"
            >
              ← Continue Shopping
            </Link>
          </>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 flex gap-4 items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-contain rounded border"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-800 line-clamp-2 max-w-sm">
                        {item.title}
                      </h2>
                      <p className="text-gray-500 mt-1 text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-right text-2xl font-bold text-gray-800">
              Total:{" "}
              <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="text-right mt-4">
              <Link
                to="/checkout"
                className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Proceed to Checkout →
              </Link>
            </div>
            <div className="text-right mt-4">
              <Link
                to="/"
                className="text-blue-600 hover:underline text-base font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </>
        )
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
          <p className="mb-4">Please login or sign up to view your cart.</p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Login / Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
