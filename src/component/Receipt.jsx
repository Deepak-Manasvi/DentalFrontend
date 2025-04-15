import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef();
  const patient = location.state?.patient;

  if (!patient) {
    return <p className="text-center mt-10">No patient data found.</p>;
  }

  const handlePrint = () => {
    const receiptContent = document.getElementById("receipt-to-print").innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: sans-serif;
              padding: 20px;
            }
            h1 {
              text-align: center;
            }
            .receipt {
              border: 1px solid #ccc;
              padding: 20px;
              max-width: 600px;
              margin: auto;
            }
            @media print {
              @page { margin: 0; }
              body { margin: 1.6cm; }
            }
          </style>
        </head>
        <body>
          <div class="receipt">${receiptContent}</div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleSave = async () => {
    try {
      const canvas = await html2canvas(receiptRef.current);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      const blob = pdf.output("blob");
      const formData = new FormData();
      formData.append("pdf", blob, "receipt.pdf");
      formData.append("patientData", JSON.stringify(patient));

      const response = await axios.post("http://localhost:5000/api/receipt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Receipt saved:", response.data);
      alert("Receipt and PDF saved successfully!");
    } catch (error) {
      console.error("Error saving receipt:", error);
      alert("Failed to save receipt.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-sans text-sm">
      {/* Printable Section */}
      <div id="receipt-to-print" ref={receiptRef} className="border rounded shadow bg-white p-6">
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
            <p><strong>Receipt Mode:</strong> Online</p>
            <p><strong>Transaction ID:</strong> {patient.transactionId || "---"}</p>
          </div>
        </div>

        <p className="mb-2">
          Received with sincere thanks from <strong>{patient.patientName}</strong> towards the
          charges for <strong>{patient.treatmentType || "Dental Services"}</strong> a total amount of (
          <strong>₹{patient.amount}</strong>).
        </p>

        <p className="mb-2">
          Amount in words: <strong>{patient.amountInWords} Rupee Only-</strong>
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
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-6 space-x-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
          Save Receipt
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Receipt;
