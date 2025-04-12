import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStaff() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      username: "",
      password: "",
      address: "",
      email: "",
      contactNumber: "",
    });
  
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const validate = () => {
      const newErrors = {};
  
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.username.trim()) newErrors.username = "Username is required";
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.address.trim()) newErrors.address = "Address is required";
  
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
  
      if (!formData.contactNumber.trim()) {
        newErrors.contactNumber = "Contact Number is required";
      } else if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
        newErrors.contactNumber = "Contact Number must be 10 digits";
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSave = () => {
      if (validate()) {
        let existingStaff = JSON.parse(localStorage.getItem("staffList")) || [];
        existingStaff.push(formData);
        localStorage.setItem("staffList", JSON.stringify(existingStaff));
        navigate("/manage-staff"); // Corrected URL (always use lowercase for path)
      }
    };
  
    const handleCancel = () => {
      setFormData({
        name: "",
        username: "",
        password: "",
        address: "",
        email: "",
        contactNumber: "",
      });
      setErrors({});
    };
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-3xl p-10 bg-white shadow-2xl rounded-2xl">
                    <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Add Staff Details</h2>
                    <form className="space-y-6">
                        {/* Staff Name */}
                        <div>
                            <label className="block font-semibold mb-1">Staff Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border-2 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                                placeholder="Enter staff name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block font-semibold mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full border-2 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                                placeholder="Enter username"
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border-2 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                                placeholder="Enter password"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block font-semibold mb-1">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border-2 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                                placeholder="Enter address"
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border-2 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                                placeholder="Enter email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block font-semibold mb-1">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="w-full border-2 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                                placeholder="Enter 10-digit contact number"
                            />
                            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-6 mt-8">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 rounded-xl transition duration-300"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-3 rounded-xl transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
