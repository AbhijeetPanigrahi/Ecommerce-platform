import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Heart, User } from "lucide-react";

const Navbar = () => {
  const { cart, setCart } = useCart();
  const { user, logout } = useUser();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Platform name always visible, centered on mobile */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-[#212121] font-[Inter]"
          >
            BuyBuff
          </Link>
        </div>
        {/* Desktop Nav (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6 text-[#212121]">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative hover:text-[#20B2AA] transition"
          >
            <Heart size={22} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#20B2AA] text-white text-xs rounded-full px-1.5 py-0.5">
                {wishlist.length}
              </span>
            )}
          </Link>
          {/* Cart */}
          <Link to="/cart" className="relative hover:text-[#20B2AA] transition">
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#20B2AA] text-white text-xs rounded-full px-1.5 py-0.5">
                {cart.length}
              </span>
            )}
          </Link>
          {/* User */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="relative group">
                <Link
                  to="/profile"
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <User
                    size={24}
                    className="text-[#212121] group-hover:text-[#20B2AA] transition-colors"
                  />
                </Link>
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max 
                  bg-white rounded-lg shadow-xl py-2 px-4
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transform group-hover:translate-y-0 translate-y-2
                  transition-all duration-300 ease-out z-50
                  after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-3 after:bg-white after:rotate-45"
                >
                  <span className="block text-center text-sm font-semibold text-[#212121]">
                    {user.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setCart([]);
                  localStorage.removeItem("cart");
                }}
                className="text-sm text-white bg-[#D32F2F] rounded-full px-6 py-3 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="text-sm text-black bg-[#20B2AA] rounded-full  px-6 py-3 hover:underline"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
