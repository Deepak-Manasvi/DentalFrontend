import React, { useState } from "react";

const AddServices = ({ onSaveService }) => {
  const [showForm, setShowForm] = useState(false);
  const [activeService, setActiveService] = useState("");
  const [formData, setFormData] = useState({
    procedureName: "",
    treatmentName: "",
    price: "",
  });

  const serviceTypes = [
    { id: 1, title: "Chief Complaint", icon: "🩺" },
    { id: 2, title: "Examination", icon: "🔍" },
    { id: 3, title: "Treatment Procedure", icon: "💊" },
    { id: 4, title: "Medicine", icon: "💉" },
  ];

  const handleCardClick = (serviceTitle) => {
    setActiveService(serviceTitle);
    setShowForm(true);

    // Reset form data based on service type
    if (serviceTitle === "Treatment Procedure") {
      setFormData({ procedureName: "", treatmentName: "", price: "" });
    } else {
      setFormData({ name: "" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For Treatment Procedure, validate and include all three fields
    if (activeService === "Treatment Procedure") {
      if (
        formData.procedureName.trim() === "" ||
        formData.treatmentName.trim() === ""
      )
        return;

      onSaveService({
        type: activeService,
        procedureName: formData.procedureName,
        treatmentName: formData.treatmentName,
        price: formData.price || "0",
      });
    } else {
      // For other services, only save type and name
      if (formData.name.trim() === "") return;

      onSaveService({
        type: activeService,
        name: formData.name,
      });
    }

    // Reset form and hide it
    setFormData({ procedureName: "", treatmentName: "", price: "", name: "" });
    setShowForm(false);
  };

  // Render different forms based on service type
  const renderForm = () => {
    if (activeService === "Treatment Procedure") {
      return (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="procedureName"
              className="block text-gray-700 font-medium mb-2"
            >
              Procedure Name
            </label>
            <input
              type="text"
              id="procedureName"
              value={formData.procedureName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="treatmentName"
              className="block text-gray-700 font-medium mb-2"
            >
              Treatment Name
            </label>
            <input
              type="text"
              id="treatmentName"
              value={formData.treatmentName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
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
      );
    } else {
      // Standard form for other service types
      return (
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
              value={formData.name || ""}
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
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Services</h2>

      {!showForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
          {renderForm()}
        </div>
      )}
    </div>
  );
};

export default AddServices;
