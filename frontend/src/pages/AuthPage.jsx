// src/pages/AuthPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  // Simulated backend-ready submit handler
  const onSubmit = (data) => {
    if (isLogin) {
      // In future: call backend login API here
      console.log("Logging in with:", data);
      login({ name: data.email });
      navigate("/");
    } else {
      // In future: call backend signup API here
      console.log("Registering with:", data);
      login({ name: data.email }); // simulate auto-login after signup
      navigate("/");
    }
  };

  // This keeps track of whatever the user types in the "password" input.
  const password = watch("password");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-2xl">
      <div className="flex justify-between mb-6">
        <button
          className={`w-1/2 py-2 ${
            isLogin ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`w-1/2 py-2 ${
            !isLogin ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Password do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
            {/* For backend password match logic later */}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;
