import React, { useEffect, useState } from "react";

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
    <div>
        <div className="max-w-7xl mx-auto p-8 mt-10 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Manage Staff</h2>
      {staffList.length === 0 ? (
        <p className="text-center text-gray-500">No staff added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border border-gray-300 rounded-lg shadow">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-6 border">Name</th>
                <th className="py-3 px-6 border">Username</th>
                <th className="py-3 px-6 border">Address</th>
                <th className="py-3 px-6 border">Email</th>
                <th className="py-3 px-6 border">Contact</th>
                <th className="py-3 px-6 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {editingIndex === index ? (
                    <>
                      {/* Editable fields */}
                      <td className="py-2 px-4 border">
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          type="text"
                          name="username"
                          value={editData.username}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          type="text"
                          name="address"
                          value={editData.address}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          type="text"
                          name="contactNumber"
                          value={editData.contactNumber}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border space-x-2">
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      {/* Normal fields */}
                      <td className="py-2 px-4 border">{staff.name}</td>
                      <td className="py-2 px-4 border">{staff.username}</td>
                      <td className="py-2 px-4 border">{staff.address}</td>
                      <td className="py-2 px-4 border">{staff.email}</td>
                      <td className="py-2 px-4 border">{staff.contactNumber}</td>
                      <td className="py-2 px-4 border space-x-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  )
}
