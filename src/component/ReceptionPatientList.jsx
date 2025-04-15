import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toWords } from "number-to-words";
import { Eye, Edit, CheckCircle, X } from "lucide-react"; 

const ReceptionPatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [viewingReceipt, setViewingReceipt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/appointments/appointmentList`
      );

      const checkInPatients = response.data.appointmentList.filter(
        (patient) => patient.isPatient === true
      );

      setPatients(checkInPatients);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleView = (patient) => {
    setViewingReceipt(patient);
  };

  const handleCloseView = () => {
    setViewingReceipt(null);
  };

  const handleReceipt = (patient) => {
    const data = {
      date: formatDate(patient.appointmentDate),
      appId: patient.appId,
      patientName: patient.patientName,
      uhid: patient.uhid,
      doctorName: patient.doctorName?.[0] || "N/A",
      receiptMode: patient.paymentMode,
      transactionId: patient.transactionId,
      amount: patient.opdAmount,
      amountInWords: toWords(patient.opdAmount),
      receptionist: patient.receptionist,
      dateTime: `${formatDate(patient.appointmentDate)} ${patient.time}`,
    };
    navigate("/admin/receipt", { state: { patient: data } });
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.patientName} ${patient.mobileNumber} ${patient.uhid}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto px-4 py-6">
      <div className="mb-4 mt-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">Patient List</h2>
        <input
          type="text"
          placeholder="Search by name, contact or ID"
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {viewingReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">View Receipt</h2>
            <div className="space-y-2">
              <p><strong>Date:</strong> {formatDate(viewingReceipt.appointmentDate)}</p>
              <p><strong>Appointment ID:</strong> {viewingReceipt.appId}</p>
              <p><strong>UHID:</strong> {viewingReceipt.uhid}</p>
              <p><strong>Name:</strong> {viewingReceipt.patientName}</p>
              <p><strong>Contact:</strong> {viewingReceipt.mobileNumber}</p>
              <p><strong>Address:</strong> {viewingReceipt.address}</p>
              <p><strong>Amount:</strong> ₹{viewingReceipt.opdAmount}</p>
              <p><strong>Doctor:</strong> {viewingReceipt.doctorName?.[0] || "N/A"}</p>
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

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="relative">
          <div className="max-h-[28rem] overflow-y-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-blue-900 text-white sticky top-0 z-10 text-sm md:text-base">
                <tr>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">App ID</th>
                  <th className="py-2 px-4">UHID</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Contact</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Doctor</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No matching patients found.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient, index) => (
                    <tr
                      key={index}
                      className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-50"
                    >
                      <td className="py-2 px-4">{formatDate(patient.appointmentDate)}</td>
                      <td className="py-2 px-4">{patient.appId}</td>
                      <td className="py-2 px-4">{patient.uhid}</td>
                      <td className="py-2 px-4">{patient.patientName}</td>
                      <td className="py-2 px-4">{patient.mobileNumber}</td>
                      <td className="py-2 px-4">{patient.address}</td>
                      <td className="py-2 px-4">₹{patient.opdAmount}</td>
                      <td className="py-2 px-4">{patient.doctorName?.[0] || "N/A"}</td>
                      <td className="py-2 px-4">
                        <div className="relative">
                          <button
                            className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"
                            onClick={() => toggleDropdown(index)}
                          >
                            Actions
                          </button>

                          {dropdownOpen === index && (
                            <div className="absolute right-0 mt-1 w-40 bg-white z-50 shadow-lg rounded-md border">
                              <ul className="text-left">
                                <div className="flex justify-between items-center border-b p-2">
                                  <span className="font-semibold">Actions</span>
                                  <button
                                    onClick={() => setDropdownOpen(null)}
                                    className="p-1 hover:bg-gray-200 rounded"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                                <li>
                                  <button
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white flex items-center gap-2"
                                    onClick={() => handleView(patient)}
                                  >
                                    <Eye size={18} /> View
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                                    onClick={() => handleReceipt(patient)}
                                  >
                                    <Edit size={18} /> Receipt
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 flex items-center gap-2"
                                    onClick={() => alert("Cancel Clicked")}
                                  >
                                    <CheckCircle size={18} /> Cancel
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionPatientList;
