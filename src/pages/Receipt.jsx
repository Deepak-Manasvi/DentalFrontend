import React from "react";
import { useNavigate } from "react-router-dom";  

const Receipt = () => {
  const navigate = useNavigate(); 

  const handleViewReceipt = () => {
    navigate('/reception/ViewReceipt');   
  };

  return (
    <div className="max-w-5xl mx-auto p-12 border-2 border-gray-300 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-gradient-to-br from-white to-gray-100 mt-16">
      
     
      {/* Header */}
      <div className="flex justify-between text-lg mb-10">
        <div className="space-y-4">
          <p><span className="font-semibold text-gray-700">Date:</span> __________</p>
          <p><span className="font-semibold text-gray-700">Receipt No:</span> __________</p>
          <p><span className="font-semibold text-gray-700">Patient Name:</span> __________</p>
          <p><span className="font-semibold text-gray-700">UHID:</span> __________</p>
        </div>
        <div className="text-right space-y-4">
          <p><span className="font-semibold text-gray-700">Doctor Name:</span> __________</p>
          <p><span className="font-semibold text-gray-700">Treatment Type:</span> __________</p>
          <p><span className="font-semibold text-gray-700">Receipt Mode:</span> Cash / UPI / Card</p>
          <p><span className="font-semibold text-gray-700">Transaction Id:</span> __________</p>
        </div>
      </div>

      {/* Receipt Title */}
      <h2 className="text-center text-4xl font-extrabold text-red-600 underline mb-10 tracking-wider uppercase">
        Receipt
      </h2>

      {/* Body */}
      <div className="text-gray-800 text-xl mb-12 leading-relaxed">
        <p className="mb-8">
          Received with sincere thanks from <span className="font-semibold underline">(Patient Name)</span> towards the charges for <span className="font-semibold underline">(Treatment Name)</span> a total amount of <span className="font-semibold underline">(Amount)</span>.
        </p>
        <p className="mb-6">
          <span className="font-bold">Amount in words:</span> ____________________
        </p>
        <p>
          <span className="font-bold">Mode of Payment:</span> ____________________
        </p>
      </div>

      {/* Appreciation Note */}
      <div className="text-center italic text-gray-700 text-xl mb-16 bg-gray-100 p-5 rounded-2xl shadow-inner">
        “<span className="font-semibold text-gray-800">We appreciate your trust in our services and look forward to serving you again.</span>”
      </div>

      {/* Footer */}
      <div className="flex justify-end text-lg mb-6">
        <div className="text-right space-y-3">
          <p><span className="font-bold">Authorized Signatory:</span></p>
          <div className="border-t-2 border-gray-400 w-48 mx-auto my-4"></div>
          <p className="text-gray-700">Receptionist Name (auto fetch)</p>
          <p className="text-gray-700">Date & Time</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleViewReceipt}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          View Receipt
        </button>
      </div>
    </div>
  );
};

export default Receipt;