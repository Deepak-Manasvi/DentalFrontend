import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Bg from "../assets/bg.png";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/user/userLogin`,
        {
          email,
          password,
          role,
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      // Remove any previous visit flag to ensure the form shows up
      if (role === "admin") {
        localStorage.removeItem("dashboardVisited");
      }

      // Navigate to the appropriate dashboard
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/receptionist/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat fixed inset-0 overflow-hidden"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="flex flex-col items-center justify-center max-w-lg w-full px-4 py-6">
        {/* Header - Always at the top of the container */}
        <div className="w-full text-center mb-6">
          <h1 className="text-green-700 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            Dental Care
          </h1>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#2C7A7B] text-white rounded-3xl shadow-2xl w-full p-4 sm:p-6 md:p-8 mb-3"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-center font-semibold">
            Welcome To Dental Care
          </h2>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 text-center">
            Log In
          </h1>

          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-1">
                Select User
              </label>
              <select
                className="w-full px-3 py-2 rounded-md bg-white text-[#2C7A7B] text-sm sm:text-base focus:outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="receptionist">Receptionist</option>
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white text-[#2C7A7B] text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm sm:text-base md:text-lg mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-white text-[#2C7A7B] text-sm sm:text-base placeholder-gray-500 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-300 text-xs sm:text-sm text-center font-semibold">
                ⚠️ {error}
              </p>
            )}

            {/* Forgot Password */}
            <div className="w-full flex justify-end text-xs sm:text-sm">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-white text-[#2C7A7B] font-semibold py-2 rounded-md hover:bg-green-500 hover:text-white transition duration-300"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
