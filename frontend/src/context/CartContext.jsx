// import { createContext, useState, useContext } from "react";

// // Create context
// const CartContext = createContext();

// // Custom hook for easy usage
// export const useCart = () => useContext(CartContext);

// // Provider component
// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   return (
//     <CartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// src/context/CartContext.jsx
import { createContext, useState, useContext } from "react";

// Create context
const CartContext = createContext();

// Custom hook
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add to cart logic (prevents duplicates)
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      setCart((prev) => [...prev, product]);
    }
  };

  // ✅ Remove from cart logic
  const removeFromCart = (productId) => {
    const updated = cart.filter((item) => item.id !== productId);
    setCart(updated);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
