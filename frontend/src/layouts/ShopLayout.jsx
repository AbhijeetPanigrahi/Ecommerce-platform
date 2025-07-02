import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const ShopLayout = () => {
  return (
    <>
      <Navbar />
      <main className='className="p-4 min-h-[80vh]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ShopLayout;
