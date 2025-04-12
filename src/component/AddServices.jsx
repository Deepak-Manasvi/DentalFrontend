
import React, { useState } from "react";

const AddServices = ({ onSaveService }) => {
  const [showForm, setShowForm] = useState(false);
  const [activeService, setActiveService] = useState("");
  const [formData, setFormData] = useState({ name: "" });

  const serviceTypes = [
    { id: 1, title: "Chief Complaint", icon: "🩺" },
    { id: 2, title: "Examination", icon: "🔍" },
    { id: 3, title: "Treatment", icon: "💊" },
    { id: 4, title: "Procedure Medicine", icon: "💉" },
  ];

  const handleCardClick = (serviceTitle) => {
    setActiveService(serviceTitle);
    setShowForm(true);
    setFormData({ name: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") return;

    // Save the service with its type and name
    onSaveService({
      type: activeService,
      name: formData.name,
    });

    // Reset form and hide it
    setFormData({ name: "" });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Services</h2>

      {!showForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceTypes.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              onClick={() => handleCardClick(service.title)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 mt-2">Click to add</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Add New {activeService}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddServices;
