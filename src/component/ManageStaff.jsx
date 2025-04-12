import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from 'lucide-react';

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    email: "",
    contactNumber: "",
  });

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staffList")) || [];
    setStaffList(storedStaff);
  }, []);

  const handleDelete = (index) => {
    const updatedList = staffList.filter((_, i) => i !== index);
    setStaffList(updatedList);
    localStorage.setItem("staffList", JSON.stringify(updatedList));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(staffList[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedList = [...staffList];
    updatedList[editingIndex] = editData;
    setStaffList(updatedList);
    localStorage.setItem("staffList", JSON.stringify(updatedList));
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
                        onClick={() => handleEdit(staff)}
                      />
                      <Trash
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(staff.id || index)}
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
    
  )
}
