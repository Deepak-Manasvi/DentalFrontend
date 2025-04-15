import React, { useEffect, useState, useRef } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const getStafs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/staff/getAllStaff`);
      setStaffList(res.data.data.staff);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    getStafs();
    // Close dropdown if clicked outside
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
      await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/staff/deletestaffById/${id}`);
      alert("Staff deleted successfully!");
      getStafs();
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-staff/${id}`);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="mx-auto overflow-x-hidden">
      <div className="mb-4 mt-4 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-700">Manage Staff</h2>
        <input
          type="text"
          placeholder="Search staff..."
          className="p-2 border rounded w-1/3"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg h-screen">
        <table className="w-full min-w-max border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr className="text-sm md:text-base">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Contact</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.length > 0 ? (
              staffList.map((staff, index) => (
                <tr key={staff._id || index} className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{staff.name}</td>
                  <td className="py-2 px-4">{staff.username}</td>
                  <td className="py-2 px-4">{staff.email}</td>
                  <td className="py-2 px-4">{staff.address}</td>
                  <td className="py-2 px-4">{staff.contactNumber}</td>
                  <td className="py-2 px-4 relative">
                    <button
                      className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
                      onClick={() => toggleDropdown(index)}
                    >
                      Actions ▼
                    </button>

                    {dropdownOpen === index && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md border z-10"
                      >
                        <ul className="text-left">
                          <li>
                            <button
                              onClick={() => handleEdit(staff._id)}
                              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white flex items-center gap-2"
                            >
                              <Pencil size={16} />
                              <span>Edit</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete(staff._id)}
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
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No staff available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}