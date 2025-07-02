// src/pages/ThankYouPage.jsx
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
    <div className="max-w-xl mx-auto mt-20 text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Thank You for Your Order!
      </h1>

      <p className="text-lg text-gray-700 mb-3">
        We’ve received your order <strong>{orderId}</strong> and it's being
        processed.
      </p>

      <p className="text-md text-gray-600 mb-3">
        Estimated Delivery: <strong>{deliveryDate}</strong>
      </p>

      <p className="text-md text-gray-600 mb-6">
        A confirmation email has been sent to{" "}
        <strong>yourname@example.com</strong>. You’ll receive tracking
        information shortly.
      </p>

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYouPage;
