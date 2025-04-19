import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDentist = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    opdAmount: "",
    timeSlots: [],
    branch: (localStorage.getItem("branch") || 1),
  });

  const [newSlot, setNewSlot] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddTimeSlot = () => {
    if (newSlot.trim() !== "" && !formData.timeSlots.includes(newSlot)) {
      setFormData((prevData) => ({
        ...prevData,
        timeSlots: [...prevData.timeSlots, newSlot],
      }));
      setNewSlot("");
    }
  };

  const handleRemoveSlot = (slotToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      timeSlots: prevData.timeSlots.filter((slot) => slot !== slotToRemove),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.opdAmount.trim()) newErrors.opdAmount = "OPD Amount is required";
    if (formData.timeSlots.length === 0) newErrors.timeSlots = "At least one time slot is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/dentist/createDentist`,
        formData
      );
      console.log("Dentist added successfully:", res.data);

      // Optional: reset form
      setFormData({
        name: "",
        address: "",
        contact: "",
        email: "",
        password: "",
        opdAmount: "",
        timeSlots: [],
      });
      setNewSlot("");
      setErrors({});

      // Show success toast notification
      toast.success("Dentist added successfully!");
    } catch (error) {
      console.error("Error adding dentist:", error);

      // Show error toast notification
      toast.error("Failed to add dentist. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Add Dentist
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
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
            Contact <span className="text-red-500">*</span>
          </label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            placeholder="Enter contact number"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* OPD Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            OPD Amount <span className="text-red-500">*</span>
          </label>
          <input
            name="opdAmount"
            type="number"
            value={formData.opdAmount}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            placeholder="Enter OPD Amount"
          />
          {errors.opdAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.opdAmount}</p>
          )}
        </div>

        {/* Time Slots */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Time Slots <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              placeholder="e.g. Morning, Evening"
              className="p-2 border rounded-xl flex-1"
            />
            <button
              type="button"
              onClick={handleAddTimeSlot}
              className="bg-teal-500 text-white px-4 py-2 rounded-xl"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.timeSlots.map((slot, index) => (
              <span
                key={index}
                className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center"
              >
                {slot}
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(slot)}
                  className="ml-2 text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {errors.timeSlots && (
            <p className="text-red-500 text-sm mt-1">{errors.timeSlots}</p>
          )}
        </div>


        <div className="text-center">
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition"
          >
            Add Dentist
          </button>
        </div>
      </form>


      <ToastContainer />
    </div>
  );
};

export default AddDentist;
