import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cart } = useCart();
  const { user, login, logout } = useUser();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between p-4 shadow bg-white">
      <Link to="/" className="font-bold text-xl">
        MyShop
      </Link>
      <div className="flex gap-4">
        <Link
          to="/cart"
          className="relative flex items-center gap-1 hover:underline"
        >
          <span className="text-lg">🛒 Cart</span>
          {cart.length > 0 && (
            <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </Link>
        <Link to="/wishlist">
          <p className="hover:underline">Wishlist</p>
          <p className="bg-pink-500 text-white px-2 py-0.5 rounded text-sm text-center">
            {wishlist.length}
          </p>
        </Link>

        {/* <Link to="/login">Login</Link> */}
        {user ? (
          <>
            <span className="text-xl text-black">👋 {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          // <button
          //   onClick={() => login({ name: "Abhijeet" })}
          //   className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
          // >
          //   Login
          // </button>
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
