import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;

  console.log(patient)

  if (!patient) {
    return <p className="text-center mt-10">No patient data found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow font-sans bg-white text-sm">
      <h1 className="text-center text-2xl font-semibold mb-4">Receipt</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <p><strong>Date:</strong> {patient.date}</p>
          <p><strong>App ID:</strong> {patient.appId || "-"}</p>
          <p><strong>Patient Name:</strong> {patient.patientName}</p>
          <p><strong>UHID:</strong> {patient.uhid}</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <p><strong>Doctor:</strong> {patient.doctorName}</p>
          <p><strong>Receipt Mode:</strong> {"Online"}</p>
          <p><strong>Transaction ID:</strong> {patient.transactionId || "---"}</p>
        </div>
      </div>

      <p className="mb-2">
        Received with sincere thanks from <strong>{patient.patientName}</strong> towards the
        charges for <strong>{patient.treatmentType || "Dental Services"}</strong> a total amount of (
        <strong>₹{patient.amount}</strong>).
      </p>

      <p className="mb-2">
        Amount in words: <strong>{`${patient.amountInWords} Rupee Only-` }</strong>
      </p>

      <p className="mb-4">
        Mode of Payment: <strong>{patient.receiptMode}</strong>
      </p>

      <p className="italic font-medium text-center mt-6">
        “We appreciate your trust in our services and look forward to serving you again.”
      </p>

      <div className="text-right font-semibold mt-6">
        <p>Authorized Signatory:</p>
        <p>{patient.receptionist || "Receptionist"}</p>
        <p>{patient.dateTime}</p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Receipt;
