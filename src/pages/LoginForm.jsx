import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl overflow-hidden bg-white/30 backdrop-blur-3xl border border-white/50 shadow-2xl"
      >
        {/* Left Image */}
        <div className="md:w-[50%] w-full flex items-center justify-center p-8 bg-white/10">
          <motion.img
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            src="https://static.vecteezy.com/system/resources/previews/029/269/310/original/dental-care-illustration-with-dentist-treating-human-teeth-and-cleaning-using-medical-equipment-in-healthcare-flat-cartoon-background-design-vector.jpg"
            alt="Dentist"
            className="object-cover rounded-2xl shadow-lg w-full h-[90%]"
          />
        </div>

        {/* Login Form */}
        <div className="md:w-[50%] w-full flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-10 text-blue-900">
              Login
            </h2>

            <motion.form
              onSubmit={handleLogin}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div>
                <select
                  className="w-full p-4 rounded-xl bg-white/50 border border-white shadow-sm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-5 rounded-2xl text-lg border-2 border-white/50 bg-white/40 backdrop-blur-md focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg placeholder-gray-600"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-5 rounded-2xl text-lg border-2 border-white/50 bg-white/40 backdrop-blur-md focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg placeholder-gray-600"
                  required
                />
              </div>

              {error && (
                <p className="text-red-600 text-center font-semibold">
                  ⚠️ {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-2xl shadow-md hover:shadow-xl hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
              >
                Login
              </button>

              <div className="text-center mt-4">
                <a href="#" className="text-blue-700 hover:underline text-sm">
                  Forgot Password?
                </a>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
