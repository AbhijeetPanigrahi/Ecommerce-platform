import { createContext, useContext, useState } from "react";

//  create Context
const UserContext = createContext();

// Custom Hook
export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not looged in

  // Simulate Login
  const login = (userData) => {
    setUser(userData);
  };
  // Simulate Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
