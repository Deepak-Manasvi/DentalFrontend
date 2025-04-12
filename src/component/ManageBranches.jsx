import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageBranches = () => {
  // Dummy data to simulate branches
  const [branches, setBranches] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const navigate = useNavigate();

  const fetchBranches = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/branch/getAllBranch`)
      .then((res) => {
        setBranches(res.data.branches);
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      });
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleView = (branch) => {
    console.log("Viewing:", branch);
  };

  const handleEdit = (branch) => {
    navigate(`/admin/edit-branch/${branch._id}`);
  };

  const handleDelete = (id) => {
    const res = axios.delete(
      `${import.meta.env.VITE_APP_BASE_URL}/branch/deleteBranchById/${id}`
    );
    fetchBranches();
    console.log(`Branch with ID ${id} deleted`);
  };

  // Handle cases where branches is not an array
  const branchesList = Array.isArray(branches) ? branches : [];

  return (
    <div className="mx-auto overflow-x-hidden">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-lg shadow-2xl w-1/2">
            <h2 className="text-xl font-bold mb-4">Branch Details</h2>
            <p>Name: {selectedBranch?.name}</p>
            <p>Address: {selectedBranch?.address}</p>
            <p>Contact: {selectedBranch?.contact}</p>
            <p>pincode: {selectedBranch?.pincode}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setshowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="mb-4 mt-4 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-700">Manage Branches</h2>
        <input
          type="text"
          placeholder="Search branches..."
          className="p-2 border rounded w-1/3"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg h-screen">
        <table className="w-full min-w-max border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr className="text-sm md:text-base">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Contact</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {branchesList.length > 0 ? (
              branchesList.map((branch, index) => (
                <tr
                  key={branch.id}
                  className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{branch.name}</td>
                  <td className="py-2 px-4">{branch.address}</td>
                  <td className="py-2 px-4">{branch.contact}</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-3">
                      <Eye
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => {
                          setshowModal(true);
                          setSelectedBranch(branch);
                        }}
                      />
                      <Pencil
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        onClick={() => handleEdit(branch)}
                      />
                      <Trash
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(branch._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No branches available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBranches;
