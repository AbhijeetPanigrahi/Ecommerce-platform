import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#FAFAFA] min-h-screen">
      <h1 className="text-3xl font-semibold text-[#212121] mb-8">
        💖 Your Wishlist
      </h1>

      {user ? (
        wishlist.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg">
              Your wishlist is currently empty.
            </p>
            <Link
              to="/"
              className="inline-block mt-6 text-[#20B2AA] hover:underline text-base font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {wishlist.map((item) => (
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

                <div className="flex gap-3">
                  <button
                    className="bg-[#20B2AA] hover:bg-[#199a96] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#212121] mb-4">
            You are not logged in
          </h2>
          <p className="text-[#616161] mb-6">
            Please login or sign up to view your wishlist.
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

export default WishlistPage;
