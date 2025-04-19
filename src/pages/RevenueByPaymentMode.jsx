import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const dummyData = [
  { date: "2025-04-01", name: "John Doe", contact: "1234567890", doctor: "Dr. Smith", treatment: "Cleaning", amount: 2000, mode: "Cash" },
  { date: "2025-04-02", name: "Jane Smith", contact: "9876543210", doctor: "Dr. Clark", treatment: "Filling", amount: 1500, mode: "UPI" },
  { date: "2025-04-03", name: "Alice", contact: "5554443322", doctor: "Dr. Strange", treatment: "Extraction", amount: 2500, mode: "Card" },
  { date: "2025-04-04", name: "Bob", contact: "2223334444", doctor: "Dr. Brown", treatment: "Root Canal", amount: 3500, mode: "Cash" },
  { date: "2025-04-05", name: "Eva", contact: "6667778888", doctor: "Dr. Banner", treatment: "Whitening", amount: 1800, mode: "UPI" },
];

const COLORS = ["#3b82f6", "#10b981", "#facc15"]; // Blue, Green, Yellow

const RevenueByPaymentMode = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const filteredData = dummyData.filter((item) => {
    const itemDate = new Date(item.date);
    const matchMode = selectedMode ? item.mode === selectedMode : true;
    const matchStart = startDate ? itemDate >= startDate : true;
    const matchEnd = endDate ? itemDate <= endDate : true;
    return matchMode && matchStart && matchEnd;
  });

  const paymentCounts = ["Cash", "Card", "UPI"].map((mode) => ({
    name: mode,
    value: filteredData.filter((item) => item.mode === mode).length,
  }));

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-4 text-[#2e7b74]">Revenue by Payment Mode</h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border px-4 py-2 rounded"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border px-4 py-2 rounded"
            placeholderText="Select end date"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Payment Mode</label>
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="">All</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-[#2e7b74] text-white">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Treatment</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => {
              const isSelected = selectedRow === idx;
              return (
                <tr
                  key={idx}
                  onClick={() => setSelectedRow(idx)}
                  className={`cursor-pointer transition ${
                    isSelected ? "bg-[#2e7b74] text-white" : "hover:bg-[#e0f5f2] text-[#2e7b74]"
                  }`}
                >
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.contact}</td>
                  <td className="border px-4 py-2">{item.doctor}</td>
                  <td className="border px-4 py-2">{item.treatment}</td>
                  <td className="border px-4 py-2 font-semibold">₹{item.amount}</td>
                  <td className="border px-4 py-2 font-medium">
                    <span className={isSelected ? "text-white" : "text-green-600"}>Paid</span>
                  </td>
                </tr>
              );
            })}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-3 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="text-right font-bold text-xl mb-4 text-[#2e7b74]">
        Total: ₹{filteredData.reduce((sum, item) => sum + item.amount, 0)}
      </div>

      {/* Pie Chart */}
      <div className="w-full h-[300px] mb-6">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={paymentCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name }) => name}
            >
              {paymentCounts.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#2e7b74] text-white px-6 py-2 rounded hover:bg-[#25655f] transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default RevenueByPaymentMode;
