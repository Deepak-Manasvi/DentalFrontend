import React, { useEffect, useRef, useState } from "react";
import { Eye, Pencil, Trash2, Search, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageBranches = () => {
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchBranches = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/branch/getAllBranch`
      );
      setBranches(res.data.branches);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = (branch) => {
    setSelectedBranch(branch);
    setShowModal(true);
    setDropdownOpen(null);
  };

  const handleEdit = (branch) => {
    navigate(`/admin/edit-branch/${branch._id}`);
    setDropdownOpen(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/branch/deleteBranchById/${id}`
        );
        fetchBranches();
      } catch (error) {
        console.error("Error deleting branch:", error);
      } finally {
        setDropdownOpen(null);
      }
    }
  };

  const filteredBranches = branches.filter((branch) =>
    Object.values(branch).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const tableHeaders = [
    "Id",
    "Name",
    "Address",
    "Contact",
    "Pincode",
    "Actions",
  ];

  return (
    <div className="mx-auto px-2 md:px-4 py-4">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Branch Details</h2>
            <p>
              <strong>Name:</strong> {selectedBranch?.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedBranch?.address}
            </p>
            <p>
              <strong>Contact:</strong> {selectedBranch?.contact}
            </p>
            <p>
              <strong>Pincode:</strong> {selectedBranch?.pincode}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">
          Manage Branches
        </h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search branches..."
            className="p-2 pl-10 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-auto max-h-[70vh]">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-blue-900 text-white sticky top-0 z-10">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="py-3 px-2 md:px-4 text-left whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredBranches.length > 0 ? (
                filteredBranches.map((branch, index) => (
                  <tr
                    key={branch._id || index}
                    className="border-b text-gray-700 hover:bg-gray-100 relative"
                  >
                    <td className="py-2 px-2 md:px-4">{index + 1}</td>
                    <td className="py-2 px-2 md:px-4">{branch.name}</td>
                    <td className="py-2 px-2 md:px-4">{branch.address}</td>
                    <td className="py-2 px-2 md:px-4">{branch.contact}</td>
                    <td className="py-2 px-2 md:px-4">{branch.pincode}</td>
                    <td className="py-2 px-2 md:px-4 relative">
                      <button
                        className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownOpen(
                            dropdownOpen === index ? null : index
                          );
                        }}
                      >
                        Actions
                      </button>
                      {dropdownOpen === index && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-20"
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
                          <button
                            onClick={() => handleView(branch)}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-500 hover:text-white w-full text-left"
                          >
                            <Eye size={16} /> View
                          </button>
                          <button
                            onClick={() => handleEdit(branch)}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-yellow-500 hover:text-white w-full text-left"
                          >
                            <Pencil size={16} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(branch._id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-500 hover:text-white w-full text-left"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="py-4 text-center text-gray-500"
                  >
                    No branches available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBranches;
