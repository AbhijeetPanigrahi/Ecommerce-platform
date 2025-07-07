import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F0] min-h-[80vh] rounded-3xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-[#212121] mb-6">
        👤 Your Profile
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <p className="text-lg text-[#424242]">
          <span className="font-semibold text-[#20B2AA]">Name:</span>{" "}
          {user.name.split(" ")[0]}
        </p>

        <p className="text-lg text-[#424242]">
          <span className="font-semibold text-[#20B2AA]">Email:</span>{" "}
          {user.email}
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="w-full bg-[#20B2AA] hover:bg-[#199a96] text-white px-5 py-3 rounded-xl transition font-medium shadow-md"
        >
          View Order History
        </button>

        <button
          onClick={logout}
          className="w-full text-red-600 hover:text-red-700 mt-4 text-sm underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
