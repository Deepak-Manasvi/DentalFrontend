import React, { useEffect, useState } from "react";
import axios from "axios";

const ReceptionDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  
  const handleBookAppointment = () => {
    console.log("Book Appointment Clicked");
  };

  const handleReceipt = () => {
    console.log("Receipt Clicked");
  };

  const handleInvoiceGenerate = () => {
    console.log("Invoice Generate Clicked");
  };

  const handleCalendar = () => {
    console.log("Calendar Clicked");
  };

  const handleTodaysAppointments = () => {
    console.log("Today's Appointments Clicked");
  };

  const handleTodaysPatients = () => {
    console.log("Today's Patients Clicked");
  };

  const handleTodaysCollection = () => {
    console.log("Today's Collection Clicked");
  };

  return (
    <div className="p-4 space-y-6">
      {/* Buttons Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-xl shadow"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-xl shadow"
          onClick={handleReceipt}
        >
          Receipt
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-xl shadow"
          onClick={handleInvoiceGenerate}
        >
          Invoice Generate
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-xl shadow"
          onClick={handleCalendar}
        >
          Calendar
        </button>
      </div>

      {/* Today Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2.5">
        <button
          className="bg-indigo-300 text-black py-8 px-6 rounded-xl shadow text-base"
          onClick={handleTodaysAppointments}
        >
          Today’s Appointments
        </button>
        <button
          className="bg-indigo-300 text-black py-8 px-6 rounded-xl shadow text-base"
          onClick={handleTodaysPatients}
        >
          Today’s Patients
        </button>
        <button
          className="bg-indigo-300 text-black py-8 px-6 rounded-xl shadow text-base"
          onClick={handleTodaysCollection}
        >
          Today’s Collection
        </button>
      </div>

      {/* Appointments and Availability */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white shadow rounded-xl p-4 w-full md:w-3/4">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b p-2">s.no.</th>
                  <th className="border-b p-2">Name</th>
                  <th className="border-b p-2">Contact</th>
                  <th className="border-b p-2">Doctor</th>
                  <th className="border-b p-2">Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Ravi Kumar</td>
                  <td className="p-2">9876543210</td>
                  <td className="p-2">Dr. Prachi</td>
                  <td className="p-2">Paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Availability */}
        <div className="bg-white shadow rounded-xl p-4 w-full md:w-1/5">
          <h2 className="text-base font-semibold mb-4">Doctor Availability</h2>
          <div className="space-y-6 text-sm">
            {doctors.map((doc, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="w-1/2">
                  <p className="font-medium leading-tight flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        doc.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {doc.name}
                  </p>
                  <p className={`${doc.available ? "text-green-600" : "text-red-600"} leading-tight`}>
                    {doc.available ? "Available" : "Unavailable"}
                  </p>
                </div>
                <div className="w-1/2">
                  <table className="border border-gray-300 text-[10px] w-full">
                    <thead>
                      <tr>
                        <th className="border p-[2px]">AM</th>
                        <th className="border p-[2px]">PM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border text-center p-[2px]">{doc.available ? "✔️" : "❌"}</td>
                        <td className="border text-center p-[2px]">{doc.available ? "✔️" : "❌"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {doctors.length === 0 && <p className="text-gray-400">No doctor data found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
