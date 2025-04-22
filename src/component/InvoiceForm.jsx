import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import html2pdf from "html2pdf.js";
import "react-toastify/dist/ReactToastify.css";

const InvoiceGenerator = () => {
  const selectedBranch = localStorage.getItem("selectedBranch");
  const receptionistName = localStorage.getItem("receptionistName") || "Receptionist";
  const invoiceRef = useRef();

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [formData, setFormData] = useState({
    invoiceId: uuidv4().slice(0, 8).toUpperCase(),
    createdAt: new Date().toLocaleString(),
    uhid: "",
    patientName: "",
    mobileNumber: "",
    address: "",
    doctorName: "",
    treatmentType: "",
    branchId: selectedBranch,
    receptionist: receptionistName,
    services: [
      { description: "Root Canel", quantity: 1, rate: 5000, amount: 5000 },
    ],
    discount: 0,
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/receipts/getAllReceipts`);
        // const filtered = res.data.receipts.filter(p => p.branchId === selectedBranch);
        setPatients(res.data);
      } catch (err) {
        console.error("Failed to fetch receipts:", err);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(p => p._id === selectedPatientId);
      if (patient) {
        setFormData(prev => ({
          ...prev,
          uhid: patient.uhid,
          patientName: patient.patientName,
          mobileNumber: patient.mobileNumber,
          address: patient.address,
          doctorName: patient.doctorName,
          treatmentType: patient.treatmentType,
        }));
      }
    }
  }, [selectedPatientId, patients]);

  const handleSave = async () => {
    try {
      const element = invoiceRef.current;
      const opt = {
        margin: 0.5,
        filename: `${formData.invoiceId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      const blob = await html2pdf().from(element).set(opt).outputPdf('blob');
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });

      const uploadData = new FormData();
      uploadData.append("invoiceId", formData.invoiceId);
      uploadData.append("uhid", formData.uhid);
      uploadData.append("patientName", formData.patientName);
      uploadData.append("doctorName", formData.doctorName);
      uploadData.append("treatmentType", formData.treatmentType);
      uploadData.append("createdAt", formData.createdAt);
      uploadData.append("receptionist", formData.receptionist);
      uploadData.append("branchId", formData.branchId);

      await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/invoices/create`, uploadData);
      toast.success("Invoice saved successfully!");
    } catch (err) {
      console.error("Error saving invoice:", err);
      toast.error("Failed to save invoice.");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write("<html><head><title>Invoice</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(invoiceRef.current.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const patientOptions = patients.map(p => ({
    value: p._id,
    label: `${p.patientName} (${p.uhid})`,
  }));

  const subtotal = formData.services.reduce((acc, item) => acc + item.amount, 0);
  const netPayable = subtotal - formData.discount;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-teal-800">Generate Invoice</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Select Patient</label>
        <Select
          options={patientOptions}
          onChange={option => setSelectedPatientId(option?.value || "")}
          placeholder="Search or select patient..."
          isClearable
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleSave}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Save Invoice
        </button>
        <button
          onClick={handlePrint}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Print Invoice
        </button>
      </div>

      {/* Invoice preview */}
      <div ref={invoiceRef} className="p-6 border rounded text-black bg-white">
        <div className="text-center text-2xl font-bold">Header</div>
        <div className="flex justify-between my-4">
          <div>
            <p><b>Date:</b> {formData.createdAt}</p>
            <p><b>Invoice No:</b> {formData.invoiceId}</p>
            <p><b>Patient Name:</b> {formData.patientName}</p>
            <p><b>UHID:</b> {formData.uhid}</p>
          </div>
          <div>
            <p><b>Doctor Name:</b> {formData.doctorName}</p>
            <p><b>Treatment Type:</b> {formData.treatmentType}</p>
          </div>
        </div>

        <h2 className="text-center text-red-600 text-xl font-bold my-4 underline">Invoice</h2>

        <table className="w-full border text-sm mb-4">
          <thead>
            <tr className="border-b">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Description of service</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData.services.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{item.description}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">₹{item.rate}</td>
                <td className="p-2 border">₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <p><b>Sub Total:</b> ₹{subtotal}</p>
          <p><b>Discount:</b> ₹{formData.discount}</p>
          <p><b>Net Payable:</b> ₹{netPayable}</p>
        </div>

        <p className="text-center mt-10 font-semibold">
          “Thank you for choosing our services.”
        </p>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
