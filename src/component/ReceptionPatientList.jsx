import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const dummyPatients = [
  {
    date: "9-04-2025",
    appId: "APP123",
    uhid: "UHID001",
    name: "Amit Kumar",
    contact: "9876543210",
    address: "Delhi",
    doctor: "Dr. Mehta",
    modeOfPayment: "Cash",
    amount: 500,
  },
  {
    date: "10-04-2025",
    appId: "APP124",
    uhid: "UHID002",
    name: "Sneha Rani",
    contact: "9123456789",
    address: "Mumbai",
    doctor: "Dr. Sharma",
    modeOfPayment: "UPI",
    transactionId: "84854845255",
    amount: 600,
  },
];

const ReceptionPatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
    const [viewingReceipt, setViewingReceipt] = useState(null);
  

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };


  const handleView = (receipt) => {
    setViewingReceipt(receipt);
  };

  const handleCloseView = () => {
    setViewingReceipt(null);
  };


  const filteredPatients = dummyPatients.filter((patient) =>
    `${patient.name} ${patient.contact} ${patient.uhid}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleReceipt = (patient) => {
    const data = {
      date: patient.date,
      appId: patient.appId,
      patientName: patient.name,
      uhid: patient.uhid,
      doctorName: patient.doctor,
      receiptMode: patient.modeOfPayment,
      transactionId: patient.transactionId,
      amount: patient.amount,
      receptionist: patient.receptionist,
      dateTime: `${patient.date} ${patient.time}`,
    };
    navigate("/admin/receipt", { state: { patient: data } });
  };


  
  return (
    <div className="mx-auto px-4 py-6">
      <div className="mb-4 mt-2 flex justify-between">
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
          <p><strong>Date:</strong> {viewingReceipt.date}</p>
          <p><strong>Appointment Id:</strong> {viewingReceipt.appId}</p>
          <p><strong>UHID:</strong> {viewingReceipt.uhid}</p>
          <p><strong>Name:</strong> {viewingReceipt.name}</p>
          <p><strong>Contact:</strong> {viewingReceipt.contact}</p>
          <p><strong>Address:</strong> {viewingReceipt.address}</p>
          <p><strong>Amount:</strong> ₹{viewingReceipt.amount}</p>
          <p><strong>Doctor:</strong> {viewingReceipt.doctor}</p>
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
          <div className="max-h-[28rem] overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead className="bg-blue-900 text-white sticky top-0 z-10">
                <tr className="text-sm md:text-base">
                  <th className="py-2 px-4 w-1/10">Date</th>
                  <th className="py-2 px-4 w-1/10">App ID</th>
                  <th className="py-2 px-4 w-1/10">UHID</th>
                  <th className="py-2 px-4 w-1/10">Name</th>
                  <th className="py-2 px-4 w-1/10">Contact</th>
                  <th className="py-2 px-4 w-1/10">Address</th>
                  <th className="py-2 px-4 w-1/10">Amount</th>
                  <th className="py-2 px-4 w-1/10">Doctor</th>
                  <th className="py-2 px-4 w-1/10">Action</th>
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
                      className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                    >
                      <td className="py-2 px-4">{patient.date}</td>
                      <td className="py-2 px-4">{patient.appId}</td>
                      <td className="py-2 px-4">{patient.uhid}</td>
                      <td className="py-2 px-4">{patient.name}</td>
                      <td className="py-2 px-4">{patient.contact}</td>
                      <td className="py-2 px-4">{patient.address}</td>
                      <td className="py-2 px-4">₹{patient.amount}</td>
                      <td className="py-2 px-4">{patient.doctor}</td>
                      <td className="py-2 px-4 relative">
                        <button
                          className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1"
                          onClick={() => toggleDropdown(index)}
                        >
                          Actions <ChevronDown size={16} />
                        </button>

                        {dropdownOpen === index && (
                          <div
                            className="absolute z-10 mt-2 w-40 bg-white shadow-lg rounded-md border right-0"
                          >
                            <ul className="text-left">
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white"
                                  onClick={() => handleView(patient)}
                                >
                                  View
                                </button>
                              </li>
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white"
                                  onClick={() => handleReceipt(patient)}
                                >
                                  Receipt
                                </button>
                              </li>
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600"
                                  onClick={() => alert("Cancel Clicked")}
                                >
                                  Cancel
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
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
