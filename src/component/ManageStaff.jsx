import React, { useEffect, useState, useRef } from "react";
import { Pencil, Trash, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const getStafs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/user/getAllUser`
      );
      const receptionists = res.data.user.filter(
        (user) =>
          user.role === "receptionist" &&
          user.branchId === localStorage.getItem("selectedBranch")
      );
      setStaffList(receptionists);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    getStafs();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/user/deleteUserById/${id}`
      );
      toast.success("Staff deleted successfully!");
      getStafs();
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("Failed to delete staff. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-staff/${id}`);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Staff</h2>
        <input
          type="text"
          placeholder="Search staff..."
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-teal-900 text-white">
            <tr>
              <th className="py-3 px-4">S.No</th>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.length > 0 ? (
              staffList.map((staff, index) => (
                <tr
                  key={staff._id || index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{staff.firstName}</td>
                  <td className="py-2 px-4">{staff.lastName}</td>
                  <td className="py-2 px-4">{staff.email}</td>
                  <td className="py-2 px-4">{staff.address}</td>
                  <td className="py-2 px-4">{staff.phone}</td>
                  <td className="py-2 px-4 relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="bg-teal-900 text-white px-3 py-1 rounded hover:bg-teal-700"
                      >
                        Actions
                      </button>
                      {dropdownOpen === index && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10"
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
                          <ul className="py-1">
                            <li>
                              <button
                                onClick={() => handleEdit(staff._id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-white"
                              >
                                <Pencil size={16} className="mr-2" />
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete(staff._id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600"
                              >
                                <Trash size={16} className="mr-2" />
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No staff available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {staffList.length > 0 ? (
          staffList.map((staff, index) => (
            <div
              key={staff._id || index}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="mb-2 font-bold text-lg">{staff.name}</div>
              <div className="text-sm text-gray-600">
                Username: {staff.username}
              </div>
              <div className="text-sm text-gray-600">Email: {staff.email}</div>
              <div className="text-sm text-gray-600">
                Address: {staff.address}
              </div>
              <div className="text-sm text-gray-600">
                Contact: {staff.contactNumber}
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => handleEdit(staff._id)}
                  className="flex items-center px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                >
                  <Pencil size={16} className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(staff._id)}
                  className="flex items-center px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  <Trash size={16} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">
            No staff available.
          </div>
        )}
      </div>
    </div>
  );
}
