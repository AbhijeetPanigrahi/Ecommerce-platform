import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchWishlist, removeWishlistItem } from "../utils/api";
import { useUser } from "./UserContext.jsx";
import { useNavigate } from "react-router-dom";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch wishlist from backend when user logs in or changes
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist();
        if (data?.products) {
          // Map backend productId to id for frontend consistency
          setWishlist(
            data.products.map((item) => ({ ...item, id: item.productId }))
          );
        } else {
          setWishlist([]);
        }
      } catch (err) {
        setWishlist([]);
        // Optionally log error message only
        // console.error('Error loading wishlist:', err?.message || err);
      }
    };
    if (user) loadWishlist();
    else setWishlist([]);
  }, [user]);

  // Add to wishlist (backend)
  const addToWishlist = async (product) => {
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
      // POST to backend
      await fetch(
        `${
          import.meta.env.VITE_API_BASE || "http://localhost:5000/api"
        }/wishlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(productToSend),
        }
      );
      // Refresh wishlist
      const data = await fetchWishlist();
      if (data?.products) {
        setWishlist(
          data.products.map((item) => ({ ...item, id: item.productId }))
        );
      }
    } catch (err) {
      // Optionally show error
      // console.error('Add to wishlist failed:', err?.message || err);
    }
  };

  // Remove from wishlist (backend)
  const removeFromWishlist = async (productId) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    try {
      await removeWishlistItem(productId);
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      // Optionally show error
      // console.error('Remove from wishlist failed:', err?.message || err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
