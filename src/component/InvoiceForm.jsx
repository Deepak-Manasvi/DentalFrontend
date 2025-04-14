import { useState } from "react";

const InvoiceForm = () => {
  const [services, setServices] = useState([
    { description: "", qty: 1, rate: 0, amount: 0 },
    { description: "", qty: 1, rate: 0, amount: 0 },
    { description: "", qty: 1, rate: 0, amount: 0 },
    { description: "", qty: 1, rate: 0, amount: 0 },
    { description: "", qty: 1, rate: 0, amount: 0 },
  ]);

  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [netPayable, setNetPayable] = useState(0);

  const updateAmount = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    updated[index].amount = updated[index].qty * updated[index].rate;
    setServices(updated);

    const subtotal = updated.reduce((sum, item) => sum + item.amount, 0);
    setSubTotal(subtotal);
    setNetPayable(subtotal - discount);
  };

  const handleDiscountChange = (value) => {
    setDiscount(value);
    setNetPayable(subTotal - value);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-xl max-w-6xl mx-auto mt-6">

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 mb-6 p-2.5">
        <div className="space-y-1">
          <p><span className="font-semibold text-black">Date:</span> AutoFetch</p>
          <p><span className="font-semibold text-black">Invoice No:</span> AutoFetch</p>
          <p><span className="font-semibold text-black">Patient Name:</span> AutoFetch</p>
        </div>
        <div className="space-y-1 text-right">
          <p><span className="font-semibold text-black">Doctor Name:</span> AutoFetch</p>
          <p><span className="font-semibold text-black">Treatment Type:</span> AutoFetch</p>
          <p><span className="font-semibold text-black">UHID:</span> AutoFetch</p>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 border-b pb-2">Invoice </h2>

      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="border px-3 py-2">S.No</th>
              <th className="border px-3 py-2">Description of Service</th>
              <th className="border px-3 py-2">Qty</th>
              <th className="border px-3 py-2">Rate</th>
              <th className="border px-3 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    className="w-full p-1 outline-none"
                    value={item.description}
                    onChange={(e) => updateAmount(index, "description", e.target.value)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    min={1}
                    className="w-full p-1 outline-none text-center"
                    value={item.qty}
                    onChange={(e) => updateAmount(index, "qty", Number(e.target.value))}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    className="w-full p-1 outline-none text-center"
                    value={item.rate}
                    onChange={(e) => updateAmount(index, "rate", Number(e.target.value))}
                  />
                </td>
                <td className="border px-2 py-1">{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
        <div></div>
        <div></div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-inner space-y-3">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-black">Sub Total:</label>
            <input
              type="number"
              value={subTotal.toFixed(2)}
              readOnly
              className="bg-white border text-right px-2 py-1 rounded w-28"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-black">Discount:</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => handleDiscountChange(Number(e.target.value))}
              className="border text-right px-2 py-1 rounded w-28"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-black">Net Payable:</label>
            <input
              type="number"
              value={netPayable.toFixed(2)}
              readOnly
              className="bg-white border text-right px-2 py-1 rounded w-28"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-900 w-full sm:w-auto">
          Save
        </button>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 w-full sm:w-auto">
          Print
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
