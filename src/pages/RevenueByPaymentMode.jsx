import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const dummyData = [
  { date: "2025-04-01", name: "John Doe", contact: "1234567890", doctor: "Dr. Smith", treatment: "Cleaning", amount: 2000, mode: "Cash" },
  { date: "2025-04-02", name: "Jane Smith", contact: "9876543210", doctor: "Dr. Clark", treatment: "Filling", amount: 1500, mode: "UPI" },
  { date: "2025-04-03", name: "Alice", contact: "5554443322", doctor: "Dr. Strange", treatment: "Extraction", amount: 2500, mode: "Card" },
  { date: "2025-04-04", name: "Bob", contact: "2223334444", doctor: "Dr. Brown", treatment: "Root Canal", amount: 3500, mode: "Cash" },
  { date: "2025-04-05", name: "Eva", contact: "6667778888", doctor: "Dr. Banner", treatment: "Whitening", amount: 1800, mode: "UPI" },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const RevenueByPaymentMode = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMode, setSelectedMode] = useState("");

  // Filter data based on selected date range and payment mode
  const filteredData = dummyData.filter((item) => {
    const itemDate = new Date(item.date);
    const matchMode = selectedMode ? item.mode === selectedMode : true;
    const matchStart = startDate ? itemDate >= startDate : true;
    const matchEnd = endDate ? itemDate <= endDate : true;
    return matchMode && matchStart && matchEnd;
  });

  // Count occurrences of each payment mode
  const paymentCounts = ["Cash", "Card", "UPI"].map((mode) => ({
    name: mode,
    value: filteredData.filter((item) => item.mode === mode).length, // Count occurrences of each mode
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-md p-4 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Revenue by Payment Mode</h2>
          <input
            type="text"
            placeholder="Search patients..."
            className="border border-gray-300 rounded-md px-3 py-1 mt-3 sm:mt-0 focus:outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-start gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">From:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="border p-1 rounded-md"
            />
            <label className="text-sm font-medium">To:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
              className="border p-1 rounded-md"
            />
          </div>

          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="border p-1 rounded-md"
          >
            <option value="">Select Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-auto border rounded-md mb-6">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Doctor</th>
                <th className="p-2 border">Treatment</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.contact}</td>
                  <td className="border p-2">{item.doctor}</td>
                  <td className="border p-2">{item.treatment}</td>
                  <td className="border p-2">₹{item.amount}</td>
                  <td className="border p-2 text-green-600 font-medium">Paid</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-3">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-right font-semibold text-lg mb-4">
          Total: ₹{filteredData.reduce((sum, item) => sum + item.amount, 0)}
        </div>

        {/* Pie Chart */}
        <div className="h-[300px] bg-white rounded-md">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={paymentCounts} // Use the paymentCounts array to plot the chart
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name }) => name}  // Show the payment mode (Cash, Card, UPI) as the label
              >
                {paymentCounts.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueByPaymentMode;
