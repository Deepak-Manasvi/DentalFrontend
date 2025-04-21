import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditStaff() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch staff data when component mounts
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/staff/getstaffById/${id}`
        );

        // Update form with existing staff data
        const staffData = response.data.data.staff;
        setFormData({
          name: staffData.name || "",
          username: staffData.username || "",
          // Password field is left empty for security reasons
          password: staffData.password,
          address: staffData.address || "",
          email: staffData.email || "",
          contactNumber: staffData.contactNumber || "",
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch staff data. Please try again.");
        setLoading(false);
        console.error("Error fetching staff data:", err);
      }
    };

    fetchStaffData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when the user makes changes
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";

    // Only validate password if it's provided (optional during edit)
    if (formData.password.trim() && formData.password.length < 6) {
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        // Create data object, only include password if provided
        const updateData = {
          name: formData.name,
          username: formData.username,
          address: formData.address,
          email: formData.email,
          contactNumber: formData.contactNumber,
        };

        // Only include password in update if user entered one
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }

        const res = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/staff/updatestaffById/${id}`,
          updateData
        );

        if (res.status === 200) {
          toast.success("Staff updated successfully!");
          navigate("/admin/manage-staff");
        } else {
          toast.error("Failed to update staff. Please try again.");
        }
      } catch (error) {
        console.error("Error updating staff:", error);
        toast.error("An error occurred while updating staff. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/admin/manage-staff");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading staff data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-8 bg-red-50 shadow-xl rounded-2xl">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/admin/manage-staff")}
          className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto p-8 bg-gradient-to-br from-white to-teal-50 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
          Edit Staff
        </h2>
        <form className="space-y-4" onSubmit={handleUpdate}>
          {/* Staff Name */}
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
              placeholder="Enter staff name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username<span className="text-red-500">*</span>
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password{" "}
              <span className="text-gray-500">
                (Leave blank to keep current password)
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              placeholder="Enter new password (min 6 characters)"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Address<span className="text-red-500">*</span>
            </label>
            <textarea
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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contact Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
              placeholder="Enter 10-digit contact number"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber}
              </p>
            )}
          </div>

          {/* Update & Cancel Buttons */}
          <div className="flex justify-start gap-4 pt-4">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition text-lg"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
