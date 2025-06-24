import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 shadow bg-white">
      <Link to="/" className="font-bold text-xl">
        MyShop
      </Link>
      <div className="flex gap-4">
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
