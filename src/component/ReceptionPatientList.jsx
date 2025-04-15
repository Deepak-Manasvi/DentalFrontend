import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, X } from "lucide-react";

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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef({});

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown-box")) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      const button = buttonRefs.current[index];
      if (button) {
        const rect = button.getBoundingClientRect();
        setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left });
      }
      setDropdownOpen(index);
    }
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
    };
    navigate("/admin/receipt", { state: { patient: data } });
  };

  return (
    <div className="mx-auto px-2 md:px-4 py-4 relative">
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-0 text-gray-700">
          Patient List
        </h2>
        <input
          type="text"
          placeholder="Search by name, contact or ID"
          className="p-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-blue-900 text-white sticky top-0 z-10">
              <tr>
                <th className="py-2 px-2 md:px-4">Date</th>
                <th className="py-2 px-2 md:px-4">App ID</th>
                <th className="py-2 px-2 md:px-4">UHID</th>
                <th className="py-2 px-2 md:px-4">Name</th>
                <th className="py-2 px-2 md:px-4">Contact</th>
                <th className="py-2 px-2 md:px-4">Address</th>
                <th className="py-2 px-2 md:px-4">Amount</th>
                <th className="py-2 px-2 md:px-4">Doctor</th>
                <th className="py-2 px-2 md:px-4">Action</th>
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
                  <tr key={index} className="border-b text-gray-700 hover:bg-gray-100">
                    <td className="py-2 px-2 md:px-4">{patient.date}</td>
                    <td className="py-2 px-2 md:px-4">{patient.appId}</td>
                    <td className="py-2 px-2 md:px-4">{patient.uhid}</td>
                    <td className="py-2 px-2 md:px-4">{patient.name}</td>
                    <td className="py-2 px-2 md:px-4">{patient.contact}</td>
                    <td className="py-2 px-2 md:px-4">{patient.address}</td>
                    <td className="py-2 px-2 md:px-4">₹{patient.amount}</td>
                    <td className="py-2 px-2 md:px-4">{patient.doctor}</td>
                    <td className="py-2 px-2 md:px-4">
                      <td className="py-2 px-2 md:px-4 whitespace-nowrap">
                      <button
                        ref={(el) => (buttonRefs.current[index] = el)}
                        onClick={() => toggleDropdown(index)}
                        className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        Actions
                      </button>
                      </td>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {dropdownOpen !== null && (
        <div
          className="fixed z-50 bg-white shadow-lg rounded-md border w-48"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          <div className="flex justify-between items-center border-b p-2">
            <span className="font-semibold">Actions</span>
            <button
              onClick={() => setDropdownOpen(null)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="text-left text-sm">
            <li>
              <button
                onClick={() => console.log("View", filteredPatients[dropdownOpen])}
                className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center gap-2"
              >
                <Eye size={16} />
                <span>View</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleReceipt(filteredPatients[dropdownOpen])}
                className="w-full text-left px-4 py-2 hover:bg-green-500 hover:text-white flex items-center gap-2"
              >
                <Edit size={16} />
                <span>Receipt</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => console.log("Delete", filteredPatients[dropdownOpen])}
                className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 flex items-center gap-2"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReceptionPatientList;
