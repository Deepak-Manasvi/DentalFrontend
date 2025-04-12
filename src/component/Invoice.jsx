import React from "react";

const Invoice = () => {
  return (
    <div className="max-w-6xl mx-auto p-10 border border-gray-400 mt-10 text-base bg-white shadow-md">
      {/* Header */}
      <div className="flex justify-between mb-8">
        {/* Left Info */}
        <div className="space-y-2">
          <p>
            <strong>Date:</strong> ______________________
          </p>
          <p>
            <strong>Invoice No:</strong> _________________
          </p>
          <p>
            <strong>Patient Name:</strong> _______________
          </p>
          <p>
            <strong>UHID:</strong> ______________________
          </p>
        </div>

        {/* Right Info */}
        <div className="text-right space-y-2">
          <p>
            <strong>Doctor Name:</strong>{" "}
            ________________________________________________
          </p>
          <p>
            <strong>Treatment Type:</strong>{" "}
            _____________________________________________
          </p>
        </div>
      </div>

      {/* Invoice Title */}
      <h1 className="text-center text-4xl font-bold text-red-600 underline mb-10">
        Invoice
      </h1>

      {/* Table */}
      <div className="border border-black">
        {/* Table Header */}
        <div className="grid grid-cols-12 font-bold text-center">
          <div className="col-span-1 border-r border-black p-2">#</div>
          <div className="col-span-5 border-r border-black p-2">
            Description of Service
          </div>
          <div className="col-span-2 border-r border-black p-2">Qty</div>
          <div className="col-span-2 border-r border-black p-2">Rate</div>
          <div className="col-span-2 p-2">Amount</div>
        </div>

        {/* Table Rows (Static/Empty Now) */}
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="grid grid-cols-12 h-14 text-center">
            <div className="col-span-1 border-r border-black"></div>
            <div className="col-span-5 border-r border-black"></div>
            <div className="col-span-2 border-r border-black"></div>
            <div className="col-span-2 border-r border-black"></div>
            <div className="col-span-2"></div>
          </div>
        ))}

        {/* Subtotal, Discount, Net Payable */}
        <div className="grid grid-cols-12 border-t border-black text-right font-semibold p-4">
          <div className="col-span-7"></div>
          <div className="col-span-3 space-y-3 text-right">
            <p>Sub Total:</p>
            <p>Discount:</p>
            <p>Net Payable:</p>
          </div>
          <div className="col-span-2 space-y-3 text-right pr-4">
            <p>₹ __________</p>
            <p>₹ __________</p>
            <p>₹ __________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
