import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import MobileNavBar from "../components/MobileNavBar";
import ScrollToTop from "../components/ScrollToTop";

const ShopLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className='className="p-4 min-h-[80vh]'>
        <Outlet />
      </main>
      <Footer />
      <MobileNavBar />
    </>
  );
};

export default ShopLayout;
