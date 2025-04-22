import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import html2pdf from "html2pdf.js";

const InvoiceGenerator = () => {
  const invoiceRef = useRef();
  const [receipts, setReceipts] = useState([]);
  const [selectedReceiptId, setSelectedReceiptId] = useState("");
  const [invoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/receipts/getAllInvoice`);
        setReceipts(response.data.receipts);
      } catch (error) {
        toast.error("Failed to fetch receipts");
        console.error(error);
      }
    };
    fetchReceipts();
  }, []);

  useEffect(() => {
    if (selectedReceiptId) {
      const receipt = receipts.find(r => r.receiptId === selectedReceiptId);
      if (receipt) {
        setInvoiceData(receipt);
      }
    }
  }, [selectedReceiptId, receipts]);

  const handlePrint = () => {
    const printContent = invoiceRef.current;
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write("<html><head><title>Invoice</title></head><body>");
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  const handleSavePdf = async () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0.5,
      filename: `${invoiceData.receiptId}_invoice.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    await html2pdf().from(element).set(opt).save();
  };

  const receiptOptions = receipts.map((r) => ({
    value: r.receiptId,
    label: `${r.patientName} (${r.uhid})`,
  }));

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-teal-800">Invoice Generator</h2>

      <Select
        options={receiptOptions}
        onChange={(selected) => setSelectedReceiptId(selected?.value || "")}
        placeholder="Select Patient from Receipts"
        isClearable
      />

      {invoiceData.patientName && (
        <>
          <div className="mt-6 space-y-2">
            <p><strong>Patient:</strong> {invoiceData.patientName}</p>
            <p><strong>UHID:</strong> {invoiceData.uhid}</p>
            <p><strong>Doctor:</strong> {invoiceData.doctorName}</p>
            <p><strong>Treatment:</strong> {invoiceData.treatmentType}</p>
            <p><strong>Total Amount:</strong> ₹{invoiceData.totalAmount}</p>
            <p><strong>Paid:</strong> ₹{invoiceData.paidAmount}</p>
            <p><strong>Status:</strong> {invoiceData.paymentStatus}</p>
          </div>

          <div className="mt-6 flex gap-4">
            <button onClick={handlePrint} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Print Invoice
            </button>
            <button onClick={handleSavePdf} className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded">
              Save as PDF
            </button>
          </div>

          {/* Invoice Preview */}
          <div ref={invoiceRef} className="hidden print:block mt-8">
            <h2 style={{ textAlign: "center", color: "red" }}>Invoice</h2>
            <p>Date: {invoiceData.createdAt}</p>
            <p>Invoice No: {invoiceData.receiptId}</p>
            <p>Patient: {invoiceData.patientName} | UHID: {invoiceData.uhid}</p>
            <p>Treatment: {invoiceData.treatmentType}</p>
            <p>Doctor: {invoiceData.doctorName}</p>
            <p>Total: ₹{invoiceData.totalAmount} | Paid: ₹{invoiceData.paidAmount}</p>
            <p>Payment Mode: {invoiceData.paymentMode}</p>
            <p>Status: {invoiceData.paymentStatus}</p>
            <p style={{ marginTop: "40px", textAlign: "right" }}>Authorized: {invoiceData.receptionist}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceGenerator;
