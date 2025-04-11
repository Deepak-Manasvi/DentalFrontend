// src/pages/ViewReceipt.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewReceipt = () => {
  const navigate = useNavigate();

  const [receipts, setReceipts] = useState([
    {
      id: 1,
      date: "2025-04-11",
      receiptNo: "R001",
      uhid: "UH12345",
      name: "John Doe",
      doctorName: "Dr. Smith",
      treatment: "Dental Cleaning",
      amount: "500",
      mode: "Cash",
    },
    {
      id: 2,
      date: "2025-04-10",
      receiptNo: "R002",
      uhid: "UH67890",
      name: "Jane Smith",
      doctorName: "Dr. Watson",
      treatment: "Eye Checkup",
      amount: "800",
      mode: "Card",
    },
  ]);

  const [editingReceipt, setEditingReceipt] = useState(null);
  const [viewingReceipt, setViewingReceipt] = useState(null);

  const handleGenerateInvoice = () => {
    navigate("/Invoice");
  };

  const handleView = (receipt) => {
    setViewingReceipt(receipt);
  };

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
  };

  const handlePrint = (id) => {
    alert(`Print receipt with ID: ${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingReceipt({ ...editingReceipt, [name]: value });
  };

  const handleSave = () => {
    const updatedReceipts = receipts.map((r) =>
      r.id === editingReceipt.id ? editingReceipt : r
    );
    setReceipts(updatedReceipts);
    setEditingReceipt(null);
    alert("Receipt Updated Successfully!");
  };

  const handleCloseEdit = () => {
    setEditingReceipt(null);
  };

  const handleCloseView = () => {
    setViewingReceipt(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">View Receipts</h1>

      <div className="overflow-y-auto border border-gray-300 rounded-lg" style={{ maxHeight: "500px" }}>
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-gray-200 z-10">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Receipt No</th>
              <th className="border px-4 py-2">UHID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Doctor Name</th>
              <th className="border px-4 py-2">Treatment</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Mode</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {receipts.length > 0 ? (
              receipts.map((receipt, index) => (
                <tr key={receipt.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{receipt.date}</td>
                  <td className="border px-4 py-2">{receipt.receiptNo}</td>
                  <td className="border px-4 py-2">{receipt.uhid}</td>
                  <td className="border px-4 py-2">{receipt.name}</td>
                  <td className="border px-4 py-2">{receipt.doctorName}</td>
                  <td className="border px-4 py-2">{receipt.treatment}</td>
                  <td className="border px-4 py-2">₹{receipt.amount}</td>
                  <td className="border px-4 py-2">{receipt.mode}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleView(receipt)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(receipt)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePrint(receipt.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-8 text-center" colSpan="10">
                  No Receipts Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleGenerateInvoice}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Generate Invoice
        </button>
      </div>

      {/* View Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">View Receipt</h2>

            <div className="space-y-2">
              <p><strong>Date:</strong> {viewingReceipt.date}</p>
              <p><strong>Receipt No:</strong> {viewingReceipt.receiptNo}</p>
              <p><strong>UHID:</strong> {viewingReceipt.uhid}</p>
              <p><strong>Name:</strong> {viewingReceipt.name}</p>
              <p><strong>Doctor:</strong> {viewingReceipt.doctorName}</p>
              <p><strong>Treatment:</strong> {viewingReceipt.treatment}</p>
              <p><strong>Amount:</strong> ₹{viewingReceipt.amount}</p>
              <p><strong>Mode:</strong> {viewingReceipt.mode}</p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseView}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Receipt</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={editingReceipt.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="doctorName"
                value={editingReceipt.doctorName}
                onChange={handleChange}
                placeholder="Doctor Name"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="treatment"
                value={editingReceipt.treatment}
                onChange={handleChange}
                placeholder="Treatment"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="amount"
                value={editingReceipt.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="mode"
                value={editingReceipt.mode}
                onChange={handleChange}
                placeholder="Mode (Cash / Card)"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCloseEdit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReceipt;
