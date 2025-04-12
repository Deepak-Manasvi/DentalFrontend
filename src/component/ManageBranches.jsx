import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';

const ManageBranches = () => {
  // Dummy data to simulate branches
  const [branches, setBranches] = useState([
    { id: 1, name: 'Main Branch', address: '123 Main St', contact: '123-456-7890' },
    { id: 2, name: 'North Branch', address: '456 North St', contact: '987-654-3210' },
    { id: 3, name: 'South Branch', address: '789 South St', contact: '555-123-4567' }
  ]);

  useEffect(() => {
    // Simulate an API call and set the branches data (we are using the dummy data above)
    console.log(branches); // Log the dummy data to check
  }, []);

  const handleView = (branch) => {
    console.log('Viewing:', branch);
  };

  const handleEdit = (branch) => {
    console.log('Editing:', branch);
  };

  const handleDelete = (id) => {
    setBranches(prev => prev.filter(branch => branch.id !== id));
    console.log(`Branch with ID ${id} deleted`);
  };

  // Handle cases where branches is not an array
  const branchesList = Array.isArray(branches) ? branches : [];

  return (
    <div className="mx-auto overflow-x-hidden">
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
                        onClick={() => handleView(branch)}
                      />
                      <Pencil
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        onClick={() => handleEdit(branch)}
                      />
                      <Trash
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(branch.id)}
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
