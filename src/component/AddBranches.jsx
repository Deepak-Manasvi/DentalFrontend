import React, { useState } from 'react';

const AddBranches = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    else if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Enter a valid 10-digit number';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // ✅ Print form data in console
    console.log('Form Data:', formData);

    alert('Form submitted successfully!');

    // ✅ Reset form after submit
    setFormData({
      name: '',
      address: '',
      contact: '',
      pincode: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Add Branch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter branch name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter address"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.contact ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10-digit number"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.pincode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="6-digit pincode"
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBranches;
