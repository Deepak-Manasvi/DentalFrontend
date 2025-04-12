import { useState } from "react";

const ManageServices =()=> {
  const [activeCategory, setActiveCategory] = useState(null);
  const [actionDropdown, setActionDropdown] = useState(null);

  // Service categories
  const serviceTypes = [
    { id: 1, title: "Chief Complaint", icon: "🩺" },
    { id: 2, title: "Examination", icon: "🔍" },
    { id: 3, title: "Treatment", icon: "💊" },
    { id: 4, title: "Procedure Medicine", icon: "💉" },
  ];

  // Dummy services data (replace with API data later)
  const dummyServices = [
    { id: 1, name: "Fever", type: "Chief Complaint" },
    { id: 2, name: "Headache", type: "Chief Complaint" },
    { id: 3, name: "Blood Test", type: "Examination" },
    { id: 4, name: "X-Ray", type: "Examination" },
    { id: 5, name: "CT Scan", type: "Examination" },
    { id: 6, name: "Antibiotics", type: "Treatment" },
    { id: 7, name: "Pain Management", type: "Treatment" },
    { id: 8, name: "Vaccination", type: "Procedure Medicine" },
    { id: 9, name: "IV Fluid", type: "Procedure Medicine" },
  ];

  // Handle category card click
  const handleCardClick = (serviceTitle) => {
    setActiveCategory(serviceTitle);
    setActionDropdown(null);
  };

  // Toggle action dropdown
  const toggleDropdown = (index) => {
    if (actionDropdown === index) {
      setActionDropdown(null);
    } else {
      setActionDropdown(index);
    }
  };

  // Filter services based on active category
  const filteredServices = activeCategory
    ? dummyServices.filter((service) => service.type === activeCategory)
    : [];

  // Handle service actions
  const handleEditService = (service) => {
    alert(`Editing ${service.name}`);
  };

  const handleDeleteService = (service) => {
    if (window.confirm(`Are you sure you want to delete ${service.name}?`)) {
      alert(`Deleted ${service.name}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {serviceTypes.map((service) => (
          <div
            key={service.id}
            className={`rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 border ${
              activeCategory === service.title
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
            onClick={() => handleCardClick(service.title)}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-2">
                {dummyServices.filter((s) => s.type === service.title).length}{" "}
                items
              </p>
            </div>
          </div>
        ))}
      </div>

      {activeCategory ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {activeCategory} List
          </h3>

          {filteredServices.length === 0 ? (
            <p className="text-center text-gray-600 py-4">
              No items found for {activeCategory}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left font-medium text-gray-700">
                      Name
                    </th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-right font-medium text-gray-700 w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 border-b border-gray-200">
                        {service.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200 text-right relative">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(index);
                          }}
                        >
                          Actions
                        </button>

                        {actionDropdown === index && (
                          <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  alert(`Viewing details for ${service.name}`);
                                  setActionDropdown(null);
                                }}
                              >
                                View
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditService(service);
                                  setActionDropdown(null);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteService(service);
                                  setActionDropdown(null);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-4">
          Select a category to view its services
        </p>
      )}
    </div>
  );
}
export default ManageServices