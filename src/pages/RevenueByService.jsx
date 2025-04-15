import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueByService = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedService, setSelectedService] = useState("");

  const data = [
    { date: "2025-04-10", name: "John", contact: "9876543210", doctor: "Dr. Smith", treatment: "Root Canal", amount: 2000 },
    { date: "2025-04-11", name: "Jane", contact: "9123456789", doctor: "Dr. Miller", treatment: "Cleaning", amount: 800 },
    { date: "2025-04-12", name: "Raj", contact: "9001234567", doctor: "Dr. Gupta", treatment: "Filling", amount: 1200 },
    { date: "2025-04-13", name: "Sara", contact: "9876123450", doctor: "Dr. Gupta", treatment: "Root Canal", amount: 3000 },
  ];

  const services = ["Root Canal", "Cleaning", "Filling", "Whitening", "Tooth Extraction"];

  const filteredData = data.filter((row) => {
    const matchService = selectedService ? row.treatment === selectedService : true;
    const matchDate =
      (!startDate || new Date(row.date) >= startDate) &&
      (!endDate || new Date(row.date) <= endDate);
    return matchService && matchDate;
  });

  const totalAmount = filteredData.reduce((sum, row) => sum + row.amount, 0);

  const chartData = services.map((service) => {
    const total = data
      .filter((row) => row.treatment === service)
      .reduce((sum, row) => sum + row.amount, 0);
    return { name: service, amount: total };
  });

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-4">Revenue by Service</h2>

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
          <label className="block font-medium mb-1">Select Service</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="">All</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Treatment</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{row.date}</td>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.contact}</td>
                <td className="border px-4 py-2">{row.doctor}</td>
                <td className="border px-4 py-2">{row.treatment}</td>
                <td className="border px-4 py-2 font-semibold">₹{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="text-right font-bold text-xl mb-4">Total: ₹{totalAmount}</div>

      {/* Chart */}
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="50%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueByService;
