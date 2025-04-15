import React, { useEffect, useState, useRef } from "react";
import { Eye, Pencil, Trash, ChevronDown } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageDentist = () => {
  const [dentist, setDentist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const fetchDentist = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/dentist/getAllDentist`
      );
      setDentist(res.data.dentists);
    } catch (error) {
      console.error("Error fetching dentists:", error);
    }
  };

  useEffect(() => {
    fetchDentist();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleView = (dentist) => {
    setShowModal(true);
    setSelectedDentist(dentist);
  };

  const handleEdit = (dentist) => {
    navigate(`/admin/edit-dentist/${dentist._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dentist?")) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/dentist/deleteDentistById/${id}`
        );
        if (res.status === 200) {
          alert("Dentist deleted successfully!");
          fetchDentist();
        }
      } catch (error) {
        console.error("Error deleting dentist:", error);
        alert("Failed to delete dentist. Please try again.");
      }
    }
  };

  // Handle cases where dentist is not an array
  const dentistList = Array.isArray(dentist) ? dentist : [];

  // Filter dentists based on search term
  const filteredDentists = dentistList.filter((dentist) =>
    Object.values(dentist).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const tableHeaders = ["#", "Name", "Address", "Contact", "Email", "Action"];

  return (
    <div className="mx-auto overflow-x-hidden">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-lg shadow-2xl w-1/2">
            <h2 className="text-xl font-bold mb-4">Dentist Details</h2>
            <p>Name: {selectedDentist?.name}</p>
            <p>Address: {selectedDentist?.address}</p>
            <p>Contact: {selectedDentist?.contact}</p>
            <p>Email: {selectedDentist?.email}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 mt-4 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-700">Manage Dentist</h2>
        <input
          type="text"
          placeholder="Search dentist..."
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="relative">
          <div className="max-h-96 overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead className="bg-blue-900 text-white sticky top-0 z-10">
                <tr className="text-sm md:text-base">
                  {tableHeaders.map((header) => (
                    <th key={header} className="py-2 px-4 text-left w-1/6">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDentists.length > 0 ? (
                  filteredDentists.map((dentist, index) => (
                    <tr
                      key={dentist._id || index}
                      className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                    >
                      <td className="py-2 px-4 w-1/6">{index + 1}</td>
                      <td className="py-2 px-4 w-1/6">{dentist.name}</td>
                      <td className="py-2 px-4 w-1/6">{dentist.address}</td>
                      <td className="py-2 px-4 w-1/6">{dentist.contact}</td>
                      <td className="py-2 px-4 w-1/6">{dentist.email}</td>
                      <td className="py-2 px-4 w-1/6 relative">
                        <button
                          className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none flex items-center gap-1"
                          onClick={() => toggleDropdown(dentist._id || index)}
                        >
                          Actions <ChevronDown size={16} />
                        </button>

                        {dropdownOpen === (dentist._id || index) && (
                          <div
                            ref={dropdownRef}
                            className="absolute z-10 mt-2 w-40 bg-white shadow-lg rounded-md border"
                            style={{ transform: "translateY(0%)", right: "0" }}
                          >
                            <ul className="text-left">
                              <li>
                                <button
                                  onClick={() => handleView(dentist)}
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                                >
                                  <Eye size={16} />
                                  <span>View</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleEdit(dentist)}
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white flex items-center gap-2"
                                >
                                  <Pencil size={16} />
                                  <span>Edit</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleDelete(dentist._id)}
                                  className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 flex items-center gap-2"
                                >
                                  <Trash size={16} />
                                  <span>Delete</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-4">
                      No dentists available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDentist;
