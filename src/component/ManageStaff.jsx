import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    email: "",
    contactNumber: "",
  });

  const getStafs = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/staff/getAllStaff`)
      .then((res) => {
        setStaffList(res.data.data.staff);
      })
      .catch((error) => {
        console.error("Error fetching dentistes:", error);
      });
  };

  useEffect(() => {
    getStafs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/staff/deletestaffById/${id}`
      );

      alert("staff deleted successfully!");

      getStafs();
    } catch (error) {
      console.error("Error deleting dentist:", error);
      alert("Failed to delete dentist. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-staff/${id}`);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
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
                <tr
                  key={staff.id || index}
                  className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{staff.name}</td>
                  <td className="py-2 px-4">{staff.username}</td>
                  <td className="py-2 px-4">{staff.email}</td>
                  <td className="py-2 px-4">{staff.address}</td>
                  <td className="py-2 px-4">{staff.contactNumber}</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-3">
                      <Pencil
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        onClick={() => handleEdit(staff._id)}
                      />
                      <Trash
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(staff._id)}
                      />
                    </div>
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
