import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    // Not logged in, redirect to homepage
    return <Navigate to="/" replace />;
  }
  // Logged in → show the protected page
  return children;
};

export default ProtectedRoute;
