import { useState } from "react";
import { Settings, User, PlusSquare, Shield } from "lucide-react";

const Setting =() => {
  const [openForm, setOpenForm] = useState(null);

  const cards = [
    {
      id: "insurance",
      title: "Insurance",
      icon: <Shield size={24} className="text-blue-600" />,
      color: "bg-blue-100 hover:bg-blue-200",
      borderColor: "border-blue-300",
      iconColor: "text-blue-500",
    },
    {
      id: "clinic",
      title: "Clinic Configuration",
      icon: <Settings size={24} className="text-green-600" />,
      color: "bg-green-100 hover:bg-green-200",
      borderColor: "border-green-300",
      iconColor: "text-green-500",
    },
    {
      id: "user",
      title: "User",
      icon: <User size={24} className="text-purple-600" />,
      color: "bg-purple-100 hover:bg-purple-200",
      borderColor: "border-purple-300",
      iconColor: "text-purple-500",
    },
    {
      id: "medicine",
      title: "Medicine",
      icon: <PlusSquare size={24} className="text-red-600" />,
      color: "bg-red-100 hover:bg-red-200",
      borderColor: "border-red-300",
      iconColor: "text-red-500",
    },
  ];

  const handleCardClick = (id) => {
    setOpenForm(id);
  };

  const closeForm = () => {
    setOpenForm(null);
  };

  const renderForm = (id) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {cards.find((card) => card.id === id).title} Form
            </h2>
            <button
              onClick={closeForm}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${card.color} border ${card.borderColor} rounded-lg shadow p-6 cursor-pointer transition-all duration-200 transform hover:scale-105`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="flex items-center">
              <div
                className={`p-3 rounded-full ${card.iconColor} bg-white mr-4`}
              >
                {card.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {card.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  Click to manage {card.title.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openForm && renderForm(openForm)}
    </div>
  );
}

export default Setting