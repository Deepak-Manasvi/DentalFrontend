import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import html2pdf from "html2pdf.js";

const ReceiptGenerator = () => {
  const selectedBranch = localStorage.getItem("selectedBranch");
  const receptionistName = localStorage.getItem("receptionistName") || "Receptionist";
  const receiptRef = useRef();

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
    receptionist: receptionistName,
    branchId: selectedBranch,
    totalAmount: "",
    paidAmount: "",
    paymentStatus: "",
    treatmentType: "",
    receiptId: uuidv4().slice(0, 8).toUpperCase(),
    createdAt: new Date().toLocaleString(),
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
          treatmentType: patient.treatmentType || "",
          receptionist: patient.receptionist || receptionistName,
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
      const element = receiptRef.current;
      const opt = {
        margin: 0.5,
        filename: `${formData.receiptId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      const blob = await html2pdf().from(element).set(opt).outputPdf('blob');

      const pdfBlob = new Blob([blob], { type: 'application/pdf' });

      const uploadData = new FormData();
      // uploadData.append("pdf", pdfBlob, "receipt.pdf");
      uploadData.append("uhid", formData.uhid);
      uploadData.append("receiptId", formData.receiptId);
      uploadData.append("totalAmount", formData.totalAmount);
      uploadData.append("paidAmount", formData.paidAmount);
      uploadData.append("paymentMode", formData.paymentMode);
      uploadData.append("paymentStatus", formData.paymentStatus);
      uploadData.append("transactionId", formData.transactionId);

      for (let [key, value] of uploadData.entries()) {
        console.log(`${key}:`, value);
      }

      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/receipts/create`,
        uploadData // FormData
      );

      toast.success("Receipt saved and uploaded successfully!");
    } catch (err) {
      console.error("Failed to save/upload receipt", err);
      toast.error("Something went wrong.");
    }
  };

  const handlePrint = () => {
    const printContent = receiptRef.current;
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write("<html><head><title>Receipt</title>");
    newWindow.document.write("<style>body{font-family:sans-serif;padding:20px;} h2{color:#c00;} .header{text-align:center;font-size:24px;margin-bottom:10px;} .line{border-top:1px solid #aaa;margin:10px 0;} .bold{font-weight:bold;} .footer{text-align:right;margin-top:40px;}</style>");
    newWindow.document.write("</head><body>");
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  const patientOptions = patients.map((p) => ({
    value: p._id,
    label: `${p.patientName} (${p.uhid})`,
  }));

  const amountInWords = (num) => {
    return `${num} Rupees Only`.toUpperCase();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-teal-800">Create Receipt</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Select Patient</label>
        <Select
          options={patientOptions}
          onChange={(selected) => setSelectedPatientId(selected?.value || "")}
          placeholder="Search or select patient..."
          isClearable
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "appId", label: "Appointment ID" },
          { name: "uhid", label: "UHID" },
          { name: "patientName", label: "Patient Name" },
          { name: "mobileNumber", label: "Contact" },
          { name: "address", label: "Address" },
          { name: "doctorName", label: "Doctor" },
          { name: "treatmentType", label: "Treatment Type" },
          { name: "opdAmount", label: "OPD Amount (₹)" },
          { name: "transactionId", label: "Transaction ID" },
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
          className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded"
        >
          Save Receipt
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ml-4"
        >
          Print Receipt
        </button>
      </form>

      {/* Receipt Preview for Printing */}
      <div ref={receiptRef} className="hidden print:block">
        <div className="header">Header</div>
        <div className="line" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p><b>Date:</b> {formData.createdAt}</p>
            <p><b>Receipt No:</b> {formData.receiptId}</p>
            <p><b>Patient Name:</b> {formData.patientName}</p>
            <p><b>UHID:</b> {formData.uhid}</p>
          </div>
          <div>
            <p><b>Doctor Name:</b> {formData.doctorName}</p>
            <p><b>Treatment Type:</b> {formData.treatmentType}</p>
            <p><b>Amount:</b> ₹{formData.paidAmount}</p>
            <p><b>Receipt Mode:</b> {formData.paymentMode}</p>
            <p><b>Transaction Id:</b> {formData.transactionId}</p>
          </div>
        </div>

        <h2 style={{ textAlign: "center", color: "red", margin: "20px 0" }}>Receipt</h2>

        <p>
          Received with sincere thanks from <b>{formData.patientName}</b> towards
          the charges for <b>{formData.treatmentType}</b> a total amount of
          <b> ₹{formData.paidAmount}</b>.
        </p>
        <p>Amount in words: <b>{amountInWords(formData.paidAmount)}</b></p>
        <p>Mode of Payment: {formData.paymentMode}</p>

        <p style={{ fontWeight: "bold", marginTop: "30px", textAlign: "center" }}>
          “We appreciate your trust in our services and look forward to serving you again.”
        </p>

        <div className="footer">
          <p><b>Authorized Signatory:</b></p>
          <p>{formData.receptionist}</p>
          <p>{formData.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptGenerator;
