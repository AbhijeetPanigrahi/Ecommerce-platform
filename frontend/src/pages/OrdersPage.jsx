import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { fetchOrders } from "../utils/api"; // ✅ New

const OrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  // Frontend Fetches and Displays Orders
  // On page load, fetch orders using the API.
  // Display each order’s items, total, date, and status.
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        if (data?.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    if (user) loadOrders();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        📦 Your Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">
          No past orders found.
        </p>
      ) : (
        <ul className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <li
              key={order._id}
              className="border p-4 sm:p-6 rounded-xl shadow bg-white flex flex-col gap-2"
            >
              <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2 sm:gap-0">
                <span className="text-sm text-gray-500">
                  Order ID: #{order._id}
                </span>
                <span className="text-sm text-gray-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <p className="text-lg font-semibold text-green-600">
                Total: ${order.totalAmount?.toFixed(2) ?? "0.00"}
              </p>
              <p className="text-sm text-blue-600 mb-2">
                Status: {order.status || "Placed"}
              </p>
              <ul className="ml-4 list-disc text-sm text-gray-700">
                {(order.items || []).map((item, idx) => (
                  <li
                    key={item.productId || idx}
                    className="flex flex-col sm:flex-row sm:items-center gap-1"
                  >
                    <span>{item.title}</span>
                    <span className="text-gray-400">
                      – ${item.price?.toFixed(2) ?? "0.00"}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-center sm:text-left">
        <Link
          to="/"
          className="text-blue-600 hover:underline font-medium text-sm"
        >
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default OrdersPage;
