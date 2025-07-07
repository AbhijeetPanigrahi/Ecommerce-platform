import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const CartPage = () => {
  const { cart, setCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveFromCart = (removeItemId) => {
    const updatedCart = cart.filter((item) => item.id !== removeItemId);
    setCart(updatedCart);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#FAFAFA] min-h-screen">
      <h1 className="text-3xl font-semibold text-[#212121] mb-8">
        🛒 Your Cart
      </h1>

      {user ? (
        cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg">
              Your cart is currently empty.
            </p>
            <Link
              to="/"
              className="inline-block mt-6 text-[#20B2AA] hover:underline text-base font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-contain rounded-xl border"
                    />
                    <div>
                      <h2 className="text-md font-semibold text-[#212121] line-clamp-2 max-w-xs">
                        {item.title}
                      </h2>
                      <p className="text-sm text-[#616161] mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition text-sm font-medium"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-end space-y-4">
              <div className="text-xl font-semibold text-[#212121]">
                Total:{" "}
                <span className="text-[#388E3C]">${totalPrice.toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="bg-[#20B2AA] hover:bg-[#199a96] text-white px-6 py-3 rounded-xl transition text-sm font-medium shadow-sm"
              >
                Proceed to Checkout →
              </Link>

              <Link
                to="/"
                className="text-[#20B2AA] hover:underline text-sm font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#212121] mb-4">
            You are not logged in
          </h2>
          <p className="text-[#616161] mb-6">
            Please login or sign up to view your cart.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-[#20B2AA] hover:bg-[#199a96] text-white px-6 py-3 rounded-xl font-medium transition shadow-sm"
          >
            Login / Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
