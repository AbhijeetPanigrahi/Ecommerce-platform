// src/pages/CheckoutPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { placeOrderAPI, clearCartAPI } from "../utils/api";

const CheckoutPage = () => {
  const { cart, setCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Remove the onSubmit function and all localStorage order logic

  // Only use this for placing orders:
  const handlePlaceOrder = async (formData) => {
    const token = localStorage.getItem("token");
    const orderData = {
      items: cart,
      totalAmount: totalPrice,
      shipping: formData, // include shipping info if needed
    };
    const res = await placeOrderAPI(orderData, token);
    if (res && res.order) {
      await clearCartAPI(); // <-- clear backend cart
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/thank-you");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 bg-[#FAFAFA] rounded-2xl shadow-md mt-6 sm:mt-10">
      <h1 className="text-3xl font-semibold text-[#212121] mb-8 text-center sm:text-left">
        🧾 Checkout
      </h1>

      {/* 🛒 Cart Summary */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-8 sm:mb-10">
        <ul className="divide-y divide-gray-200">
          {cart.map((item, idx) => (
            <li
              key={item.productId || item.id || idx}
              className="py-4 flex flex-col sm:flex-row justify-between items-center"
            >
              <span className="font-medium text-gray-800 truncate w-full sm:w-3/4 text-center sm:text-left">
                {item.title}
              </span>
              <span className="text-[#20B2AA] font-semibold mt-2 sm:mt-0">
                ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="text-right text-xl font-semibold mt-4">
          Total:{" "}
          <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* 📦 Shipping Form */}
      <form
        onSubmit={handleSubmit(handlePlaceOrder)}
        className="bg-white p-4 sm:p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-medium text-[#212121] mb-4 text-center sm:text-left">
          📦 Shipping Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              {...register("zip", {
                required: "ZIP code is required",
                pattern: {
                  value: /^[0-9]{5,6}$/,
                  message: "Enter a valid ZIP code",
                },
              })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
            />
            {errors.zip && (
              <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            {...register("country", { required: "Country is required" })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-[#20B2AA] hover:bg-[#199a96] text-white py-3 px-8 rounded-xl font-semibold transition mt-2"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
