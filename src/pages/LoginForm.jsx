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
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-green-700 text-9xl font-bold drop-shadow-lg mb-150">
          Dental Care
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#2C7A7B] text-white rounded-3xl shadow-2xl w-full max-w-lg p-10 z-10 mt-40"
      >
        <h2 className="text-2xl mb-3 text-center font-semibold">
          Welcome To Dental Care
        </h2>
        <h1 className="text-3xl font-bold mb-8 text-center">Log In</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-lg mb-2">Select User</label>
            <select
              className="w-full px-4 py-3 rounded-md bg-white text-[#2C7A7B] text-lg focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="receptionist">Receptionist</option>
            </select>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-lg mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white text-[#2C7A7B] text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-lg mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white text-[#2C7A7B] text-lg placeholder-gray-500 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-300 text-sm text-center font-semibold">
              ⚠️ {error}
            </p>
          )}

          {/* Forgot Password */}
          <div className="w-full flex justify-end text-sm">
  <a href="#" className="hover:underline">
    Forgot Password?
  </a>
</div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-[#2C7A7B] font-semibold py-3 rounded-md hover:bg-green-500 hover:text-white transition duration-300"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
