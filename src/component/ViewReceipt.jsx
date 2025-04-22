import React, { useState, useEffect, useRef } from "react";
import { Eye, CheckCircle, X } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReceiptTemplate from "./ReceiptTemplate";

const ViewReceipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [viewingReceipt, setViewingReceipt] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/receipts/getAllReceipts`
        );
        setReceipts(response.data);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };
    fetchReceipts();
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
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

  const handleView = (receipt) => {
    setViewingReceipt(receipt);
  };

  const handlePrint = (receipt) => {
    setViewingReceipt(receipt);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleCloseView = () => setViewingReceipt(null);

  const handleGenerateInvoice = async (receipt) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/receipts/updateReceiptById/${receipt.appId}`,
        { generateInvoice: true }
      );
      if (res.status === 200) {
        toast.success("inovice  create successfully!");
        window.location.reload();
      } else {
        toast.error("Failed to save receipt.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving receipt.");
    }
  };

  const tableHeaders = [
    "Date", "Receipt No", "UHID", "Name", "Doctor Name",
    "Treatment", "Amount", "Mode", "Action",
  ];

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="relative">
          <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead className="bg-teal-900 text-white sticky top-0 z-10">
                <tr className="text-sm md:text-base">
                  {tableHeaders.map((header, idx) => (
                    <th key={idx} className="py-2 px-4 text-left w-1/10">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {receipts.length > 0 ? (
                  receipts.map((receipt, index) => (
                    <tr key={receipt.id || index} className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100">
                      <td className="py-2 px-4">
                        {new Date(receipt.appointmentId?.appointmentDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-2 px-4">{receipt.receiptId}</td>
                      <td className="py-2 px-4">{receipt.appointmentId?.uhid}</td>
                      <td className="py-2 px-4">{receipt.patientName}</td>
                      <td className="py-2 px-4">
                        {Array.isArray(receipt.doctorName) ? receipt.doctorName[0] : receipt.doctorName}
                      </td>
                      <td className="py-2 px-4">{receipt.treatmentType}</td>
                      <td className="py-2 px-4">₹{receipt.opdAmount}</td>
                      <td className="py-2 px-4">{receipt.paymentMode}</td>
                      <td className="py-2 px-4 relative" ref={dropdownRef}>
                        <button
                          className="bg-teal-900 text-white px-3 py-1 rounded-md hover:bg-teal-600 flex items-center gap-1"
                          onClick={() => toggleDropdown(index)}
                        >
                          Actions
                        </button>
                        {dropdownOpen === index && (
                          <div className="absolute z-10 mt-2 w-40 bg-white shadow-lg rounded-md border right-0 top-0">
                            <div className="flex justify-between items-center border-b p-2">
                              <span className="font-semibold">Actions</span>
                              <button onClick={() => setDropdownOpen(null)} className="p-1 hover:bg-gray-200 rounded">
                                <X size={16} />
                              </button>
                            </div>
                            <ul className="text-left">
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-500 hover:text-white flex items-center gap-2"
                                  onClick={() => handleView(receipt)}
                                >
                                  <Eye size={16} /><span>View</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 text-teal-600 hover:bg-teal-100 flex items-center gap-2"
                                  onClick={() => handlePrint(receipt)}
                                >
                                  <CheckCircle size={16} /><span>Print</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="w-full text-left px-4 py-2 text-teal-600 hover:bg-teal-100 flex items-center gap-2"
                                  onClick={() => console.log("receipt")}
                                >
                                  <CheckCircle size={16} /><span>Generate Invoice</span>
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
                    <td colSpan={10} className="text-center text-gray-500 py-4">
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
              <p><strong>Date:</strong> {viewingReceipt.appointmentDate}</p>
              <p><strong>Receipt No:</strong> {viewingReceipt.receiptNo}</p>
              <p><strong>UHID:</strong> {viewingReceipt.uhid}</p>
              <p><strong>Name:</strong> {viewingReceipt.patientName}</p>
              <p><strong>Doctor:</strong> {Array.isArray(viewingReceipt.doctorName) ? viewingReceipt.doctorName.join(", ") : viewingReceipt.doctorName}</p>
              <p><strong>Treatment:</strong> {viewingReceipt.treatment}</p>
              <p><strong>Amount:</strong> ₹{viewingReceipt.opdAmount}</p>
              <p><strong>Mode:</strong> {viewingReceipt.paymentMode}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseView}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Receipt Print Layout */}
      {viewingReceipt && (
        <ReceiptTemplate ref={receiptRef} formData={viewingReceipt} />
      )}
    </div>
  );
};

export default ViewReceipt;
