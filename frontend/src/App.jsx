import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Outlet, Routes, Route } from "react-router-dom";
import { useState } from "react";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";

function App() {
  // const [cart, setCart] = useState([]);
  return (
    <div>
      {/* <Navbar cartCount={cart.length} /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      {/* <main className="p-4">
        
        <Home cart={cart} setCart={setCart} />
      </main> */}
      <Footer />
    </div>
  );
}

export default App;
