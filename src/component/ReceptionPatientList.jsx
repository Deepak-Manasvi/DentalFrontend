import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const dummyPatients = [
  {
    date: "9-04-2025",
    appId: "APP123",
    uhid: "UHID001",
    name: "Amit Kumar",
    contact: "9876543210",
    address: "Delhi",
    doctor: "Dr. Mehta",
  },
  {
    date: "10-04-2025",
    appId: "APP124",
    uhid: "UHID002",
    name: "Sneha Rani",
    contact: "9123456789",
    address: "Mumbai",
    doctor: "Dr. Sharma",
  },
];


// Shared Modal Component
const Modal = ({ isOpen, onClose, content, patient }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    if (content === "View") {
      return (
        <>
          <p><strong>Patient:</strong> {patient.name}</p>
          <p><strong>UHID:</strong> {patient.uhid}</p>
          <p><strong>Doctor:</strong> {patient.doctor}</p>
        </>
      );
    } else if (content === "Receipt") {
      return (
        <>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>UHID:</strong> {patient.uhid}</p>
          <p><strong>App ID:</strong> {patient.appId}</p>
          <p><strong>Doctor:</strong> {patient.doctor}</p>
          <p><strong>Date:</strong> {patient.date}</p>
          <p><strong>Address:</strong> {patient.address}</p>
        </>
      );
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-4">{content} Details</h2>
        <div className="mb-4 space-y-1">{renderContent()}</div>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ReceptionPatientList = () => {
    
const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    content: "",
    patient: null,
  });

  const handleReceipt = (patient) => {
    console.log("get")
    navigate("/reception/receipt", { state: { patient } }); // 👈 Send patient data via state
  };

  const openModal = (type, patient) => {
    setModalInfo({ isOpen: true, content: type, patient });
  };

  const closeModal = () => {
    setModalInfo({ isOpen: false, content: "", patient: null });
  };

  const filteredPatients = dummyPatients.filter((patient) =>
    `${patient.name} ${patient.contact} ${patient.uhid}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 rounded-md">
      <h2 className="text-blue-600 font-semibold mb-3">Patient List</h2>

      <div className="flex justify-end mb-3">
        <input
          type="text"
          placeholder="Search Patient Name , mobile, Id"
          className="px-3 py-1 rounded-full border border-gray-300 w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full text-sm">
        <thead className="bg-teal-700 text-white">
          <tr>
            <th className="px-2 py-1">Date</th>
            <th className="px-2 py-1">App. Id</th>
            <th className="px-2 py-1">UHID</th>
            <th className="px-2 py-1">Name</th>
            <th className="px-2 py-1">Contact</th>
            <th className="px-2 py-1">Address</th>
            <th className="px-2 py-1">Consulting Doctor</th>
            <th className="px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-2">
                No matching patients found.
              </td>
            </tr>
          ) : (
            filteredPatients.map((patient, index) => (
              <tr key={index} className="text-center border-b">
                <td className="px-2 py-1">{patient.date}</td>
                <td className="px-2 py-1">{patient.appId}</td>
                <td className="px-2 py-1">{patient.uhid}</td>
                <td className="px-2 py-1">{patient.name}</td>
                <td className="px-2 py-1">{patient.contact}</td>
                <td className="px-2 py-1">{patient.address}</td>
                <td className="px-2 py-1">{patient.doctor}</td>
                <td className="px-2 py-1 space-x-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => openModal("View", patient)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-500 hover:underline"
                    onClick={() => handleReceipt(patient)}
                  >
                    Receipt
                  </button>
                  <button
                    className="text-purple-500 hover:underline"
                    onClick={() => console.log("Cancel clicked")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        content={modalInfo.content}
        patient={modalInfo.patient || {}}
      />
    </div>
  );
};

export default ReceptionPatientList;
