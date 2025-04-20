import { useState, useRef, useEffect } from "react";
import { Settings, User, Shield, X, Eye, Edit, Trash2 } from "lucide-react";

const Setting = () => {
  const [openForm, setOpenForm] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);

  const cards = [
    {
      id: "insurance",
      title: "Insurance",
      icon: <Shield size={24} className="text-teal-600" />,
      color: "bg-teal-500 hover:bg-teal-700",
      borderColor: "border-teal-300",
      iconColor: "text-teal-500",
    },
    {
      id: "clinic",
      title: "Clinic Configuration",
      icon: <Settings size={24} className="text-teal-600" />,
      color: "bg-teal-500 hover:bg-teal-700",
      borderColor: "border-teal-300",
      iconColor: "text-teal-500",
    },
    {
      id: "user",
      title: "User",
      icon: <User size={24} className="text-purple-600" />,
      color: "bg-teal-500 hover:bg-teal-700",
      borderColor: "border-purple-300",
      iconColor: "text-purple-500",
    },
    {
      id: "business",
      title: "Business Form",
      icon: <User size={24} className="text-purple-600" />,
      color: "bg-teal-500 hover:bg-teal-700",
      borderColor: "border-purple-300",
      iconColor: "text-purple-500",
    },
  ];

  const insuranceData = [
    {
      id: 1,
      name: "ABC Insurance",
      address: "123 Main St",
      contact: "555-1234",
      applicable: "Yes",
    },
    {
      id: 2,
      name: "XYZ Healthcare",
      address: "456 Oak Ave",
      contact: "555-5678",
      applicable: "No",
    },
  ];

  const userData = [
    {
      id: 1,
      branch: "Main",
      staffName: "John Doe",
      userName: "john_doe",
      contact: "555-1111",
      status: "Active",
    },
    {
      id: 2,
      branch: "East",
      staffName: "Jane Smith",
      userName: "jane_smith",
      contact: "555-2222",
      status: "Inactive",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCardClick = (id) => {
    setOpenForm(id);
  };

  const closeForm = () => {
    setOpenForm(null);
  };

  const toggleDropdown = (id, event) => {
    if (dropdownOpen === id) {
      setDropdownOpen(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 5,
        left: rect.right - 190,
      });
      setDropdownOpen(id);
    }
  };

  const handleView = (id) => {
    console.log("View item:", id);
    setDropdownOpen(null);
  };

  const handleEdit = (id) => {
    console.log("Edit item:", id);
    setDropdownOpen(null);
  };

  const handleDelete = (id) => {
    console.log("Delete item:", id);
    setDropdownOpen(null);
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
        <div className="overflow-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-teal-900 text-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-left whitespace-nowrap">S No</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Company Name
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Address
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Contact
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Applicable
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {insuranceData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b text-gray-700 hover:bg-gray-100"
                >
                  <td className="py-2 px-4 whitespace-nowrap">{index + 1}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{item.name}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {item.address}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {item.contact}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <select className="border rounded p-1">
                      <option value="Yes" selected={item.applicable === "Yes"}>
                        Yes
                      </option>
                      <option value="No" selected={item.applicable === "No"}>
                        No
                      </option>
                    </select>
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <button
                      className="bg-teal-900 text-white px-3 py-1 rounded-md hover:bg-teal-600"
                      onClick={(e) => toggleDropdown(`insurance-${item.id}`, e)}
                    >
                      Actions
                    </button>
                  </td>
                </tr>
              ))}
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
        <div className="overflow-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-teal-900 text-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Company Header
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Footer
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Terms & Condition
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">Share</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b text-gray-700 hover:bg-gray-100">
                <td className="py-2 px-4 whitespace-nowrap">
                  <select className="border rounded p-1 w-full">
                    <option value="">Select file</option>
                    <option value="header1.jpg">header1.jpg</option>
                    <option value="header2.jpg">header2.jpg</option>
                  </select>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <select className="border rounded p-1 w-full">
                    <option value="">Select file</option>
                    <option value="footer1.jpg">footer1.jpg</option>
                    <option value="footer2.jpg">footer2.jpg</option>
                  </select>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <textarea
                    className="border rounded p-1 w-full"
                    rows="2"
                  ></textarea>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Share on mail</span>
                    <input type="checkbox" className="ml-2 h-4 w-4" />
                  </div>
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
        <div className="overflow-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-teal-900 text-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-left whitespace-nowrap">S No</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Branch
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Staff Name
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  User Name
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Contact
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b text-gray-700 hover:bg-gray-100"
                >
                  <td className="py-2 px-4 whitespace-nowrap">{index + 1}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{user.branch}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {user.staffName}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {user.userName}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {user.contact}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <span
                      className={
                        user.status === "Active"
                          ? "text-teal-600"
                          : "text-red-600"
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <button
                      className="bg-teal-900 text-white px-3 py-1 rounded-md hover:bg-teal-600"
                      onClick={(e) => toggleDropdown(`user-${user.id}`, e)}
                    >
                      Actions
                    </button>
                  </td>
                </tr>
              ))}
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

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="fixed z-50 bg-white shadow-lg rounded-md border w-48"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          <div className="flex justify-between items-center border-b p-2">
            <span className="font-semibold">Actions</span>
            <button
              onClick={() => setDropdownOpen(null)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="text-left">
            <li>
              <button
                onClick={() => handleView(dropdownOpen)}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-500 hover:text-white flex items-center gap-2"
              >
                <Eye size={16} />
                <span>View</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleEdit(dropdownOpen)}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white flex items-center gap-2"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDelete(dropdownOpen)}
                className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 flex items-center gap-2"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Setting;
