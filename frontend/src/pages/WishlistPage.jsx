import React, { useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { fetchWishlist, removeWishlistItem } from "../utils/api"; // ✅ Import backend functions

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // ✅ Load wishlist from backend
  useEffect(() => {
    // No need to manually fetch or mutate wishlist here; context handles it.
  }, [user]);

  const handleRemove = async (id) => {
    await removeWishlistItem(id);
    removeFromWishlist(id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#FAFAFA] min-h-screen">
      <h1 className="text-3xl font-semibold text-[#212121] mb-8 text-center sm:text-left">
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
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <button
                    className="bg-[#20B2AA] hover:bg-[#199a96] text-white px-4 sm:px-6 py-2 sm:py-2 rounded-xl text-sm font-medium shadow-sm w-full sm:w-auto"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-2 rounded-xl transition text-sm font-medium w-full sm:w-auto mt-2 sm:mt-0"
                    onClick={() => handleRemove(item.id)}
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
            className="bg-[#20B2AA] hover:bg-[#199a96] text-white px-6 py-3 rounded-xl font-medium transition shadow-sm w-full max-w-xs mx-auto"
          >
            Login / Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
