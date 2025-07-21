import { createContext, useState, useContext, useEffect } from "react";
import { addToCartAPI, getCartAPI } from "../utils/api"; // ✅ new
import { useUser } from "./UserContext"; // ✅ Add this at the top
import { useNavigate } from "react-router-dom";

// Create context
const CartContext = createContext();

// Custom hook
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { user } = useUser(); // ✅ Inside CartProvider
  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const items = await getCartAPI();
        setCart(items);
      } catch (err) {
        console.error("❌ Error loading cart:", err?.message || err);
      }
    };

    if (user?.name || user?.email || user?.userId) {
      loadCart(); // ✅ only when user is present
    } else {
      // Load from localStorage if not logged in
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
      else setCart([]);
    }
  }, [user?.name || user?.email || user?.userId]); // ✅ re-run only after user is loaded

  // // ✅ Add to cart logic (prevents duplicates)
  // const addToCart = (product) => {
  //   const exists = cart.find((item) => item.id === product.id);
  //   if (!exists) {
  //     setCart((prev) => [...prev, product]);
  //   }
  // };

  // ✅ Add to cart (calls DB + updates UI)
  const addToCart = async (product) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    try {
      // Map product.id to productId for backend compatibility
      const productToSend = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      };
      await addToCartAPI(productToSend);
      // Refresh cart from DB after adding
      const updated = await getCartAPI();
      setCart(updated);
      console.log("Calling addToCartAPI");
    } catch (err) {
      console.error("Add to cart failed:", err?.message || err);
    }
  };

  // // ✅ Remove from cart logic
  // const removeFromCart = (productId) => {
  //   const updated = cart.filter((item) => item.id !== productId);
  //   setCart(updated);
  // };

  // ✅ Local removal (optional: use DB delete if needed later)
  const removeFromCart = (productId) => {
    const updated = cart.filter((item) => item.productId !== productId);
    setCart(updated);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
