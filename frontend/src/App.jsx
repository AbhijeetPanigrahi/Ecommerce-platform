import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Outlet, Routes, Route } from "react-router-dom";
import { useState } from "react";
import CartPage from "./pages/CartPage";

function App() {
  // const [cart, setCart] = useState([]);
  return (
    <div>
      {/* <Navbar cartCount={cart.length} /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      {/* <main className="p-4">
        
        <Home cart={cart} setCart={setCart} />
      </main> */}
      <Footer />
    </div>
  );
}

export default App;
