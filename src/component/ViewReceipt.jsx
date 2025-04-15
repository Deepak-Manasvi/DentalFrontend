import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

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
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

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

  const tableHeaders = [
    "#",
    "Date",
    "Receipt No",
    "UHID",
    "Name",
    "Doctor Name",
    "Treatment",
    "Amount",
    "Mode",
    "Action",
  ];

  return (
    <div className="p-8">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="relative">
          <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead className="bg-blue-900 text-white sticky top-0 z-10">
                <tr className="text-sm md:text-base">
                  {tableHeaders.map((header) => (
                    <th key={header} className="py-2 px-4 text-left w-1/10">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {receipts.length > 0 ? (
                  receipts.map((receipt, index) => (
                    <tr
                      key={receipt.id}
                      className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                    >
                      <td className="py-2 px-4 w-1/10">{index + 1}</td>
                      <td className="py-2 px-4 w-1/10">{receipt.date}</td>
                      <td className="py-2 px-4 w-1/10">{receipt.receiptNo}</td>
                      <td className="py-2 px-4 w-1/10">{receipt.uhid}</td>
                      <td className="py-2 px-4 w-1/10">{receipt.name}</td>
                      <td className="py-2 px-4 w-1/10">{receipt.doctorName}</td>
                      <td className="py-2 px-4 w-1/10">{receipt.treatment}</td>
                      <td className="py-2 px-4 w-1/10">₹{receipt.amount}</td>
                      <td className="py-2 px-4 w-1/10">{receipt.mode}</td>
                      <td className="py-2 px-4 relative">
                        <button
                          className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"
                          onClick={() => toggleDropdown(index)}
                        >
                          Actions <ChevronDown size={16} />
                        </button>

                        {dropdownOpen === index && (
                          <div className="absolute z-50 mt-2 w-40 bg-white shadow-lg rounded-md border right-0">
                            <ul className="text-left">
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white"
                                  onClick={() => handleView(receipt)}
                                >
                                  View
                                </button>
                              </li>
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-300"
                                  onClick={() => handleEdit(receipt)}
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-100"
                                  onClick={() => handlePrint(receipt.id)}
                                >
                                  Print
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
                    <td
                      colSpan={10}
                      className="text-center text-gray-500 py-4"
                    >
                      No Receipts Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96">
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
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96">
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
