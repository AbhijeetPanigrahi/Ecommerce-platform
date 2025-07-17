// Modernized AuthPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { signupUser, loginUser } from "../utils/api";

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
  const onSubmit = async (data) => {
    // if (isLogin) {
    //   // In future: call backend login API here
    //   // console.log("Logging in with:", data);
    //   login({ name: "User", email: data.email }); // no name during login
    // } else {
    //   // In future: call backend signup API here
    //   // console.log("Registering with:", data);
    //   login({ name: data.name, email: data.email }); // get name from signup form
    // }
    try {
      let response;
      if (isLogin) {
        response = await loginUser({
          email: data.email,
          password: data.password,
        });
      } else {
        response = await signupUser({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      }

      if (response.token && response.user) {
        login(response.user, response.token);
        navigate("/");
      } else {
        console.log(
          "Signup/Login failed. Server response:",
          JSON.stringify(response)
        );
        alert(response.message);
      }
    } catch (error) {
      console.error("Auth Error:", error?.message || error);
      alert("Server error. Try again later.");
    }
  };

  // This keeps track of whatever the user types in the "password" input.
  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition shadow-sm ${
              isLogin ? "bg-[#20B2AA] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition shadow-sm ${
              !isLogin ? "bg-[#20B2AA] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#20B2AA] hover:bg-[#199a96] text-white py-2 rounded-xl font-medium transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
