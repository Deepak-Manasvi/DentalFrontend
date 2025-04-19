import { useState } from "react";
import { X, Edit, CheckCircle } from "lucide-react";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDelete = (index) => {
    const updatedInvoices = invoices.filter((_, i) => i !== index);
    setInvoices(updatedInvoices);
  };

  const handleEdit = (index) => {
    alert(`Editing invoice: ${invoices[index].invoiceNo}`);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const filteredInvoices = invoices.filter((invoice) =>
    `${invoice.patientName} ${invoice.uhid} ${invoice.invoiceNo}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto px-4 py-6">
      <div className="mb-4 mt-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">Invoice List</h2>
        <input
          type="text"
          placeholder="Search by name, ID or invoice"
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-teal-900 text-white sticky top-0 z-10 text-sm md:text-base">
            <tr>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Invoice No</th>
              <th className="py-2 px-4">Patient</th>
              <th className="py-2 px-4">Doctor</th>
              <th className="py-2 px-4">Treatment</th>
              <th className="py-2 px-4">UHID</th>
              <th className="py-2 px-4">Sub Total</th>
              <th className="py-2 px-4">Discount</th>
              <th className="py-2 px-4">Net Payable</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No matching invoices found.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice, index) => (
                <tr
                  key={index}
                  className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{invoice.date}</td>
                  <td className="py-2 px-4">{invoice.invoiceNo}</td>
                  <td className="py-2 px-4">{invoice.patientName}</td>
                  <td className="py-2 px-4">{invoice.doctorName}</td>
                  <td className="py-2 px-4">{invoice.treatmentType}</td>
                  <td className="py-2 px-4">{invoice.uhid}</td>
                  <td className="py-2 px-4">₹{invoice.subTotal.toFixed(2)}</td>
                  <td className="py-2 px-4">₹{invoice.discount.toFixed(2)}</td>
                  <td className="py-2 px-4 font-semibold text-teal-600">
                    ₹{invoice.netPayable.toFixed(2)}
                  </td>
                  <td className="py-2 px-4">
                    <div className="relative">
                      <button
                        className="bg-teal-900 text-white px-3 py-1 rounded-md hover:bg-teal-600 flex items-center gap-1"
                        onClick={() => toggleDropdown(index)}
                      >
                        Actions
                      </button>

                      {dropdownOpen === index && (
                        <div className="absolute top-full left-0 mt-1 w-40 bg-white z-50 shadow-lg rounded-md border">
                          <ul className="text-left">
                            <div className="flex justify-between items-center border-b p-2">
                              <span className="font-semibold">Actions</span>
                              <button
                                onClick={() => setDropdownOpen(null)}
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            <li>
                              <button
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-500 hover:text-white flex items-center gap-2"
                                onClick={() => handleEdit(index)}
                              >
                                <Edit size={18} /> Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 flex items-center gap-2"
                                onClick={() => handleDelete(index)}
                              >
                                <CheckCircle size={18} /> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;

