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
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Manage Branches</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left text-sm text-gray-700">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {branchesList.length > 0 ? (
            branchesList.map((branch, index) => (
              <tr key={branch.id} className="hover:bg-gray-50 text-sm">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{branch.name}</td>
                <td className="border px-4 py-2">{branch.address}</td>
                <td className="border px-4 py-2">{branch.contact}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <Eye className="text-blue-500 cursor-pointer" onClick={() => handleView(branch)} />
                  <Pencil className="text-green-500 cursor-pointer" onClick={() => handleEdit(branch)} />
                  <Trash className="text-red-500 cursor-pointer" onClick={() => handleDelete(branch.id)} />
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
  );
};

export default ManageBranches;
