const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Existing Auth APIs
export const signupUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

// ---------------------------    After Backend Setup ---------------------------------

// 🛒 Wishlist APIs
export const fetchWishlist = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const removeWishlistItem = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/wishlist/remove/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

// 📦 Orders API
export const fetchOrders = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

////////////////////////////////////////////////////

const getToken = () => localStorage.getItem("token");

// ✅ Add to cart
export const addToCartAPI = async (product) => {
  const res = await fetch(`${API_BASE}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(product),
  });
  return res.json();
};

// ✅ Get cart
export const getCartAPI = async () => {
  const res = await fetch(`${API_BASE}/cart`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

export const removeFromCartAPI = async (itemId) => {
  const res = await fetch(`${API_BASE}/cart/remove/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

export const clearCartAPI = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/cart/clear`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const placeOrderAPI = async (orderData, token) => {
  // const res = await fetch("http://localhost:5000/api/orders/create", {
  const res = await fetch(`${API_BASE}/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  return await res.json();
};
