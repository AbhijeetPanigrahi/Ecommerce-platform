import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { removeFromCartAPI, getCartAPI } from "../utils/api"; // ✅ Add this at the top

const CartPage = () => {
  const { cart, setCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveFromCart = async (removeItemId) => {
    try {
      await removeFromCartAPI(removeItemId);
      const updatedCart = await getCartAPI();
      setCart(updatedCart);
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-[#FAFAFA] min-h-screen">
      <h1 className="text-3xl font-semibold text-[#212121] mb-8 text-center sm:text-left">
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
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition gap-4 sm:gap-0"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-contain rounded-xl border mb-2 sm:mb-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-md font-semibold text-[#212121] line-clamp-2 max-w-xs mx-auto sm:mx-0">
                        {item.title}
                      </h2>
                      <p className="text-sm text-[#616161] mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-2 rounded-xl transition text-sm font-medium w-full sm:w-auto mt-4 sm:mt-0"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-end space-y-4">
              <div className="text-xl font-semibold text-[#212121] text-right w-full sm:w-auto">
                Total:{" "}
                <span className="text-[#388E3C]">${totalPrice.toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="bg-[#20B2AA] hover:bg-[#199a96] text-white px-6 py-3 rounded-xl transition text-sm font-medium shadow-sm w-full sm:w-auto"
              >
                Proceed to Checkout →
              </Link>

              <Link
                to="/"
                className="text-[#20B2AA] hover:underline text-sm font-medium w-full sm:w-auto text-center sm:text-left"
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
            className="bg-[#20B2AA] hover:bg-[#199a96] text-white px-6 py-3 rounded-xl font-medium transition shadow-sm w-full max-w-xs mx-auto"
          >
            Login / Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
