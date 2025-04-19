import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBranches = () => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const adminId = decodedToken.id;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    pincode: "",
    adminId: adminId,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";
    else if (!/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Enter a valid 10-digit number";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/branch/createBranch`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Branch Created successfully!");

    navigate("/admin/manage-branches");

    // ✅ Reset form after submit
    setFormData({
      name: "",
      address: "",
      contact: "",
      pincode: "",
    });
  };

  return (
    <div className="mx-auto p-8 bg-gradient-to-br from-white to-teal-50 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
        Add Branch
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl"
            placeholder="Enter branch name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Address<span className="text-red-500">*</span>
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl"
            placeholder="Enter address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Contact<span className="text-red-500">*</span>
          </label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl"
            placeholder="10-digit number"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Pincode<span className="text-red-500">*</span>
          </label>
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl"
            placeholder="6-digit pincode"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition text-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddBranches;
