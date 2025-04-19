const InvoiceForm = ({ data, onBack }) => {
  // ... (Keep your service logic as-is)

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-xl max-w-6xl mx-auto mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 mb-6 p-2.5">
        <div className="space-y-1">
          <p><span className="font-semibold text-black">Date:</span> {data.date}</p>
          <p><span className="font-semibold text-black">Invoice No:</span> {data.invoiceNo}</p>
          <p><span className="font-semibold text-black">Patient Name:</span> {data.name}</p>
        </div>
        <div className="space-y-1 text-right">
          <p><span className="font-semibold text-black">Doctor Name:</span> {data.doctor}</p>
          <p><span className="font-semibold text-black">Treatment Type:</span> {data.treatment}</p>
          <p><span className="font-semibold text-black">UHID:</span> {data.uhid}</p>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-4 border-b pb-2 text-center">Invoice</h2>

      {/* ... Keep your table and calculation logic unchanged */}

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700 w-full sm:w-auto"
          onClick={onBack}
        >
          Back
        </button>
        <button className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-900 w-full sm:w-auto">
          Save
        </button>
        <button className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-gray-800 w-full sm:w-auto">
          Print
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
