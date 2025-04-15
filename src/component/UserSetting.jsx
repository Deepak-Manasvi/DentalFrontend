import { useState } from "react";
import { Settings, User, Shield } from "lucide-react";

const Setting = () => {
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
  ];

  const handleCardClick = (id) => {
    setOpenForm(id);
  };

  const closeForm = () => {
    setOpenForm(null);
  };

  const renderInsuranceTable = () => {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Insurance Applicable</h2>
          <button
            onClick={closeForm}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border border-gray-200">#</th>
                <th className="px-4 py-2 border border-gray-200">
                  Company Name
                </th>
                <th className="px-4 py-2 border border-gray-200">Address</th>
                <th className="px-4 py-2 border border-gray-200">Contact</th>
                <th className="px-4 py-2 border border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200">1</td>
                <td className="px-4 py-2 border border-gray-200"></td>
                <td className="px-4 py-2 border border-gray-200"></td>
                <td className="px-4 py-2 border border-gray-200"></td>
                <td className="px-4 py-2 border border-gray-200">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      View
                    </button>
                    <span>/</span>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderClinicTable = () => {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Clinic Configuration</h2>
          <button
            onClick={closeForm}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border border-gray-200">
                  Company Header
                </th>
                <th className="px-4 py-2 border border-gray-200">Footer</th>
                <th className="px-4 py-2 border border-gray-200">
                  Terms & Condition
                </th>
                <th className="px-4 py-2 border border-gray-200">Share</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200">
                  <button className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-sm">
                    Upload File
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  <button className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-sm">
                    Upload File
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-200">Text area</td>
                <td className="px-4 py-2 border border-gray-200">
                  Share on mail
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderUserTable = () => {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User Setting</h2>
          <button
            onClick={closeForm}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border border-gray-200">Branch</th>
                <th className="px-4 py-2 border border-gray-200">Staff Name</th>
                <th className="px-4 py-2 border border-gray-200">User Name</th>
                <th className="px-4 py-2 border border-gray-200">Contact</th>
                <th className="px-4 py-2 border border-gray-200">Status</th>
                <th className="px-4 py-2 border border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200"></td>
                <td className="px-4 py-2 border border-gray-200"></td>
                <td className="px-4 py-2 border border-gray-200"></td>
                <td className="px-4 py-2 border border-gray-200"></td>
                <td className="px-4 py-2 border border-gray-200"></td>
                <td className="px-4 py-2 border border-gray-200">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      View
                    </button>
                    <span>/</span>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderForm = (id) => {
    switch (id) {
      case "insurance":
        return renderInsuranceTable();
      case "clinic":
        return renderClinicTable();
      case "user":
        return renderUserTable();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Setting</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
};

export default Setting;
