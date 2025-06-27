import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
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
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
