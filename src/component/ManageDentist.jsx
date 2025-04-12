import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageDentist = () => {
  // Dummy data to simulate dentist
  const navigate = useNavigate();
  const [dentist, setDentist] = useState([]);

  const fetchDentist = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/dentist/getAllDentist`)
      .then((res) => {
        setDentist(res.data.dentists);
      })
      .catch((error) => {
        console.error("Error fetching dentistes:", error);
      });
  };

  useEffect(() => {
    fetchDentist();
  }, []);

  const handleView = (dentist) => {
    console.log("Viewing:", dentist);
  };

  const handleEdit = (dentist) => {
    navigate(`/admin/edit-dentist/${dentist._id}`);
  };

  const handleDelete = async (id) => {
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
  };

  // Handle cases where dentist is not an array

  return (
    <div className="mx-auto overflow-x-hidden">
      <div className="mb-4 mt-4 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-700">Manage Dentist</h2>
        <input
          type="text"
          placeholder="Search dentist..."
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
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Password</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {dentist.length > 0 ? (
              dentist.map((dentist, index) => (
                <tr
                  key={dentist.id}
                  className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{dentist.name}</td>
                  <td className="py-2 px-4">{dentist.address}</td>
                  <td className="py-2 px-4">{dentist.contact}</td>
                  <td className="py-2 px-4">{dentist.email}</td>
                  <td className="py-2 px-4">{dentist.password}</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-3">
                      <Eye
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => handleView(dentist)}
                      />
                      <Pencil
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        onClick={() => handleEdit(dentist)}
                      />
                      <Trash
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(dentist._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No dentist available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDentist;
