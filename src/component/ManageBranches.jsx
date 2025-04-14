import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageBranches = () => {
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleView = (branch) => {
    setSelectedBranch(branch);
    setShowModal(true);
  };

  const handleEdit = (branch) => {
    navigate(`/admin/edit-branch/${branch._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/branch/deleteBranchById/${id}`
        );
        fetchBranches();
        console.log(`Branch with ID ${id} deleted`);
      } catch (error) {
        console.error("Error deleting branch:", error);
      }
    }
  };

  const filteredBranches = branches.filter((branch) =>
    Object.values(branch).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const tableHeaders = ["#", "Name", "Address", "Contact", "Actions"];

  return (
    <div className="mx-auto overflow-x-hidden">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Branch Details</h2>
            <p><strong>Name:</strong> {selectedBranch?.name}</p>
            <p><strong>Address:</strong> {selectedBranch?.address}</p>
            <p><strong>Contact:</strong> {selectedBranch?.contact}</p>
            <p><strong>Pincode:</strong> {selectedBranch?.pincode}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 mt-4 flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center">Manage Branches</h2>
        <input
          type="text"
          placeholder="Search branches..."
          className="p-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full border-collapse table-fixed">
            <thead className="bg-blue-900 text-white sticky top-0 z-10">
              <tr className="text-sm md:text-base">
                {tableHeaders.map((header) => (
                  <th key={header} className="py-2 px-4 text-left w-1/5">
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
                    className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 w-1/5">{index + 1}</td>
                    <td className="py-2 px-4 w-1/5">{branch.name}</td>
                    <td className="py-2 px-4 w-1/5">{branch.address}</td>
                    <td className="py-2 px-4 w-1/5">{branch.contact}</td>
                    <td className="py-2 px-4 w-1/5">
                      <div className="flex flex-col gap-1 md:flex-row md:gap-2">
                        <button
                          onClick={() => handleView(branch)}
                          className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-700 flex items-center gap-1"
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          onClick={() => handleEdit(branch)}
                          className="bg-green-600 text-white px-2 py-1 rounded-md text-xs hover:bg-green-700 flex items-center gap-1"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(branch._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded-md text-xs hover:bg-red-700 flex items-center gap-1"
                        >
                          <Trash size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
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
