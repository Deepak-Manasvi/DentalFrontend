import React, { forwardRef } from "react";
const amountInWords = (num) => `${num} Rupees Only`.toUpperCase();

const ReceiptTemplate = forwardRef(({ formData }, ref) => (
  <div ref={ref} className="hidden print:block p-6">
    <div className="header text-lg font-bold mb-2">Your Clinic Name</div>
    <div className="line border-b mb-4" />
    <div className="flex justify-between mb-4">
      <div>
        <p><b>Date:</b> {formData.createdAt || formData.appointmentDate}</p>
        <p><b>Receipt No:</b> {formData.receiptNo}</p>
        <p><b>Patient Name:</b> {formData.patientName}</p>
        <p><b>UHID:</b> {formData.uhid}</p>
      </div>
      <div>
        <p><b>Doctor Name:</b> {formData.doctorName}</p>
        <p><b>Treatment Type:</b> {formData.treatment}</p>
        <p><b>Amount:</b> ₹{formData.opdAmount}</p>
        <p><b>Mode:</b> {formData.paymentMode}</p>
        <p><b>Transaction Id:</b> {formData.transactionId}</p>
      </div>
    </div>

    <h2 className="text-center text-red-600 font-semibold text-xl my-4">Receipt</h2>

    <p>
      Received with sincere thanks from <b>{formData.patientName}</b> towards
      the charges for <b>{formData.treatment}</b> a total amount of
      <b> ₹{formData.opdAmount}</b>.
    </p>
    <p>Amount in words: <b>{amountInWords(formData.opdAmount)}</b></p>
    <p>Mode of Payment: {formData.paymentMode}</p>

    <p className="font-bold mt-8 text-center">
      “We appreciate your trust in our services and look forward to serving you again.”
    </p>

    <div className="footer mt-8">
      <p><b>Authorized Signatory:</b></p>
      <p>{formData.receptionist || "Reception Desk"}</p>
      <p>{formData.createdAt || formData.appointmentDate}</p>
    </div>
  </div>
));

export default ReceiptTemplate;
