import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const ReceiptGenerator = () => {
  const selectedBranch = localStorage.getItem("selectedBranch");
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [formData, setFormData] = useState({
    appId: "",
    uhid: "",
    patientName: "",
    mobileNumber: "",
    address: "",
    doctorName: "",
    opdAmount: "",
    paymentMode: "",
    transactionId: "",
    receptionist: "",
    branchId: selectedBranch,
    totalAmount: "",
    paidAmount: "",
    paymentStatus: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/appointments/appointmentList`
        );
        const filtered = response.data.appointmentList.filter((p) => p.isPatient);
        setPatients(filtered);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find((p) => p._id === selectedPatientId);
      if (patient) {
        setFormData((prev) => ({
          ...prev,
          appId: patient.appId,
          uhid: patient.uhid,
          patientName: patient.patientName,
          mobileNumber: patient.mobileNumber,
          address: patient.address,
          doctorName: patient.doctorName?.[0] || "",
          opdAmount: patient.opdAmount,
          paymentMode: patient.paymentMode || "",
          transactionId: patient.transactionId || "",
          receptionist: patient.receptionist || "",
          branchId: selectedBranch,
        }));
      }
    }
  }, [selectedPatientId, patients, selectedBranch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/receipts/create`,
        formData
      );
      alert("Receipt saved successfully!");
    } catch (err) {
      console.error("Failed to save receipt", err);
      alert("Something went wrong.");
    }
  };

  const patientOptions = patients.map((p) => ({
    value: p._id,
    label: `${p.patientName} (${p.uhid})`,
  }));

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-teal-800">Create Receipt</h2>

      {/* Patient Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Select Patient</label>
        <Select
          options={patientOptions}
          onChange={(selected) => setSelectedPatientId(selected?.value || "")}
          placeholder="Search or select patient..."
          isClearable
        />
      </div>

      {/* Receipt Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "appId", label: "Appointment ID" },
          { name: "uhid", label: "UHID" },
          { name: "patientName", label: "Patient Name" },
          { name: "mobileNumber", label: "Contact" },
          { name: "address", label: "Address" },
          { name: "doctorName", label: "Doctor" },
          { name: "opdAmount", label: "OPD Amount (₹)" },
          { name: "transactionId", label: "Transaction ID" },
          { name: "receptionist", label: "Receptionist" },
          { name: "totalAmount", label: "Total Amount (₹)" },
          { name: "paidAmount", label: "Paid Amount (₹)" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        ))}

        {/* Payment Mode */}
        <div>
          <label className="block text-gray-700 mb-1">Payment Mode</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select mode</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        {/* Payment Status */}
        <div>
          <label className="block text-gray-700 mb-1">Payment Status</label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partially Paid">Partially Paid</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded mt-4"
        >
          Save Receipt
        </button>
      </form>
    </div>
  );
};

export default ReceiptGenerator;
