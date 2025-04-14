import { useState } from "react";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([
    {
      date: "2025-04-14",
      invoiceNo: "INV001",
      patientName: "Rahul Sharma",
      doctorName: "Dr. Verma",
      treatmentType: "Root Canal",
      uhid: "UHID12345",
      services: [
        { description: "Consultation", qty: 1, rate: 500, amount: 500 },
        { description: "X-Ray", qty: 2, rate: 300, amount: 600 },
      ],
      subTotal: 1100,
      discount: 100,
      netPayable: 1000,
    },
    {
      date: "2025-04-13",
      invoiceNo: "INV002",
      patientName: "Pooja Singh",
      doctorName: "Dr. Mehta",
      treatmentType: "Braces",
      uhid: "UHID67890",
      services: [
        { description: "Initial Consultation", qty: 1, rate: 400, amount: 400 },
      ],
      subTotal: 400,
      discount: 0,
      netPayable: 400,
    },
  ]);

  const handleDelete = (index) => {
    const updatedInvoices = invoices.filter((_, i) => i !== index);
    setInvoices(updatedInvoices);
  };

  const handleEdit = (index) => {
    alert(`Editing invoice: ${invoices[index].invoiceNo}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-xl max-w-7xl mx-auto mt-6">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 sm:mb-6 text-center">Invoice List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-blue-700 text-white text-xs sm:text-sm">
            <tr>
              <th className="border px-2 py-2 sm:px-3">S.No</th>
              <th className="border px-2 py-2 sm:px-3">Date</th>
              <th className="border px-2 py-2 sm:px-3">Invoice No</th>
              <th className="border px-2 py-2 sm:px-3">Patient</th>
              <th className="border px-2 py-2 sm:px-3">Doctor</th>
              <th className="border px-2 py-2 sm:px-3 hidden md:table-cell">Treatment</th>
              <th className="border px-2 py-2 sm:px-3 hidden md:table-cell">UHID</th>
              <th className="border px-2 py-2 sm:px-3">Sub Total</th>
              <th className="border px-2 py-2 sm:px-3">Discount</th>
              <th className="border px-2 py-2 sm:px-3">Net Payable</th>
              <th className="border px-2 py-2 sm:px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index} className="text-center text-xs sm:text-sm">
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{invoice.date}</td>
                <td className="border px-2 py-1">{invoice.invoiceNo}</td>
                <td className="border px-2 py-1">{invoice.patientName}</td>
                <td className="border px-2 py-1">{invoice.doctorName}</td>
                <td className="border px-2 py-1 hidden md:table-cell">{invoice.treatmentType}</td>
                <td className="border px-2 py-1 hidden md:table-cell">{invoice.uhid}</td>
                <td className="border px-2 py-1">₹{invoice.subTotal.toFixed(2)}</td>
                <td className="border px-2 py-1">₹{invoice.discount.toFixed(2)}</td>
                <td className="border px-2 py-1 font-semibold text-green-600">₹{invoice.netPayable.toFixed(2)}</td>
                <td className="border px-2 py-1">
                  <div className="flex flex-col sm:flex-row gap-1 justify-center items-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
