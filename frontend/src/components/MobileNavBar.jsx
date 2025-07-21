import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useUser } from "../context/UserContext";

const MobileNavBar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center py-2 md:hidden">
      <Link
        to="/"
        className="flex flex-col items-center text-[#212121] hover:text-[#20B2AA] transition"
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link
        to="/wishlist"
        className="flex flex-col items-center text-[#212121] hover:text-[#20B2AA] transition relative"
      >
        <Heart size={24} />
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-2 bg-[#20B2AA] text-white text-xs rounded-full px-1.5 py-0.5">
            {wishlist.length}
          </span>
        )}
        <span className="text-xs mt-1">Wishlist</span>
      </Link>
      <Link
        to="/cart"
        className="flex flex-col items-center text-[#212121] hover:text-[#20B2AA] transition relative"
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-1 right-2 bg-[#20B2AA] text-white text-xs rounded-full px-1.5 py-0.5">
            {cart.length}
          </span>
        )}
        <span className="text-xs mt-1">Cart</span>
      </Link>
      {user ? (
        <Link
          to="/profile"
          className="flex flex-col items-center text-[#212121] hover:text-[#20B2AA] transition"
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      ) : (
        <button
          onClick={() => navigate("/auth")}
          className="flex flex-col items-center text-[#212121] hover:text-[#20B2AA] transition"
        >
          <User size={24} />
          <span className="text-xs mt-1">Login</span>
        </button>
      )}
    </nav>
  );
};

export default MobileNavBar;
