// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
import { Outlet, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
// import CartPage from "./pages/CartPage";
// import AuthPage from "./pages/AuthPage";
// import WishlistPage from "./pages/WishlistPage";
// import CheckoutPage from "./pages/CheckOutPage";
// import ThankYouPage from "./pages/ThankYouPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ShopLayout from "./layouts/ShopLayout";

import { lazy, Suspense } from "react"; // Lazy Loading (for optimize web performance)

const Home = lazy(() => import("./pages/Home"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

function App() {
  // const [cart, setCart] = useState([]);
  return (
    <Suspense
      fallback={<div className="text-center mt-20 text-xl">Loading...</div>}
    >
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} /> */}
        <Route path="/" element={<ShopLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
