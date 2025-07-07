import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  const [orderId, setOrderId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    // Generate a random order ID (e.g., #MH-7281)
    const randomId = `#MH-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(randomId);

    // Estimate delivery (2–5 days from today)
    const eta = new Date();
    eta.setDate(eta.getDate() + Math.floor(Math.random() * 4 + 2));
    setDeliveryDate(eta.toDateString());
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-24 text-center px-6 bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F0] p-8 rounded-3xl shadow-xl border border-gray-200">
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-6">
        🎉 Thank You for Your Order!
      </h1>

      <p className="text-lg text-gray-800 mb-4">
        We’ve received your order{" "}
        <span className="font-semibold text-[#20B2AA]">{orderId}</span> and it's
        being processed.
      </p>

      <p className="text-md text-gray-700 mb-3">
        Estimated Delivery:{" "}
        <span className="font-medium text-[#388E3C]">{deliveryDate}</span>
      </p>

      <p className="text-sm text-gray-600 mb-8">
        A confirmation email has been sent to{" "}
        <span className="font-semibold">yourname@example.com</span>. You’ll
        receive tracking information shortly.
      </p>

      <Link
        to="/"
        className="inline-block bg-[#20B2AA] hover:bg-[#199a96] text-white px-6 py-3 rounded-xl shadow-md transition font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYouPage;
