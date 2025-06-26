import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <div>
      <Navbar cartCount={cart.length} />
      <main className="p-4">
        {/* <Outlet /> */}
        <Home cart={cart} setCart={setCart} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
