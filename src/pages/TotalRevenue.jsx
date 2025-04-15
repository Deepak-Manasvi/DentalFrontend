import React from "react";

const TotalRevenue = () => {
  const data = [
    { date: "2025-04-10", name: "John", contact: "9876543210", doctor: "Dr. Smith", treatment: "Root Canal", amount: 2000 },
    { date: "2025-04-11", name: "Jane", contact: "9123456789", doctor: "Dr. Miller", treatment: "Cleaning", amount: 800 },
    { date: "2025-04-12", name: "Raj", contact: "9001234567", doctor: "Dr. Gupta", treatment: "Filling", amount: 1200 },
  ];

  const totalAmount = data.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div className="p-6 bg-[#f4f6f8] min-h-screen">
      <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">Total Revenue</h2>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-4 py-2 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition">
          Date Range
        </button>
      </div>

      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-[#0a2472] text-white text-base">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Treatment</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 bg-white">
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-100 transition duration-150"
              >
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.contact}</td>
                <td className="px-4 py-3">{row.doctor}</td>
                <td className="px-4 py-3">{row.treatment}</td>
                <td className="px-4 py-3 font-semibold text-green-700">₹{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <div className="bg-white rounded shadow px-6 py-4 text-right text-xl font-semibold">
          Total Revenue: ₹{totalAmount}
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;
