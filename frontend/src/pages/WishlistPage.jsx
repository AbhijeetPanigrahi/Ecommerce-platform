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

  //   if (!user) {
  //     return (
  //       <div className="text-center mt-8">
  //         <h2 className="text-xl font-bold">
  //           Please log in to view your wishlist
  //         </h2>
  //         <button
  //           onClick={() => navigate("/auth")}
  //           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
  //         >
  //           Login / Signup
  //         </button>
  //       </div>
  //     );
  //   }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">💖 Your Wishlist</h1>
      {user ? (
        wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li
                key={item.id}
                className="border rounded p-4 flex justify-between items-center"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20"
                  />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded"
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
          <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
          <p className="mb-4">Please login or sign up to view your Wishlist.</p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Login / Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
