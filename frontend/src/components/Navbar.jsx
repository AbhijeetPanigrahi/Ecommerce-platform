import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cart } = useCart();
  const { user, login, logout } = useUser();
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between p-4 shadow bg-white">
      <Link to="/" className="font-bold text-xl">
        MyShop
      </Link>
      <div className="flex gap-4">
        <Link to="/cart">
          <p className="hover:underline">Cart</p>
          <p className="bg-white text-black px-2 py-0.5 rounded">
            {cart.length}
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
