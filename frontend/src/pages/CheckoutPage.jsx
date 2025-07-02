// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// const CheckoutPage = () => {
//   const { cart, setCart } = useCart();
//   const navigate = useNavigate();

//   const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

//   const handlePlaceOrder = () => {
//     alert("🎉 Order placed successfully!");
//     setCart([]); // clear cart
//     navigate("/"); // redirect to home page
//     console.log("Shipping data: ", data);
//   };

// //   const onSubmit = (data) => {
// //     console.log("Shipping data: " ,data)
// //   }
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">🧾 Checkout</h1>

//       <ul className="divide-y mb-4">
//         {cart.map((item) => (
//           <li key={item.id} className="py-3 flex justify-between items-center">
//             <span className="font-medium">{item.title}</span>
//             <span className="text-gray-600">${item.price.toFixed(2)}</span>
//           </li>
//         ))}
//       </ul>

//       <div className="text-right text-xl font-semibold">
//         Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
//       </div>

//       <button
//         onClick={handlePlaceOrder}
//         className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//       >
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;

// src/pages/CheckoutPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Shipping Data:", data);
    alert("🎉 Order placed successfully!");
    setCart([]);
    navigate("/thank-you");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🧾 Checkout</h1>

      {/* Cart Summary */}
      <ul className="divide-y mb-6">
        {cart.map((item) => (
          <li key={item.id} className="py-3 flex justify-between items-center">
            <span className="font-medium">{item.title}</span>
            <span className="text-gray-600">${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="text-right text-xl font-semibold mb-10">
        Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
      </div>

      {/* Shipping Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 p-6 rounded shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">📦 Shipping Information</h2>

        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">ZIP Code</label>
          <input
            type="text"
            {...register("zip", {
              required: "ZIP code is required",
              pattern: {
                value: /^[0-9]{5,6}$/,
                message: "Enter a valid ZIP code",
              },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.zip && (
            <p className="text-red-500 text-sm">{errors.zip.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            {...register("country", { required: "Country is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
