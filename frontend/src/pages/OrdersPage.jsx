import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    if (user?.name) {
      const userOrders = allOrders.filter(
        (order) => order.userEmail === user.name
      );
      setOrders(userOrders);
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Your Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No past orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">
                  Order ID: #{order.id}
                </span>
                <span className="text-sm text-gray-500">{order.date}</span>
              </div>
              <p className="text-lg font-semibold text-green-600">
                Total: ${order.total.toFixed(2)}
              </p>
              <p className="text-sm text-blue-600 mb-2">
                Status: {order.status}
              </p>
              <ul className="ml-4 list-disc text-sm text-gray-700">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} – ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
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
