import React, { useEffect, useState } from "react";
import axios from "axios";

const ReceptionDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/receptionist/dashboardDetails`);
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard details:", error);
      }
    };
    fetchData();
  }, []);
   console.log(data)

  if (!data) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  const {
    upcomingAppointments = [],
    totalAppointments = 0,
    totalPatients = 0,
    todaysCollection = 0,
  } = data;

  return (
    <div className="p-4 space-y-6">
      {/* Buttons Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Book Appointment" },
          { label: "Receipt" },
          { label: "Invoice Generate" },
          { label: "Calendar" },
        ].map((btn, idx) => (
          <button
            key={idx}
            className="bg-blue-500 text-white py-2 px-4 rounded-xl shadow"
            onClick={() => console.log(`${btn.label} Clicked`)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Today Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2.5">
        <button className="bg-indigo-300 text-black py-8 px-6 rounded-xl shadow text-base">
          Today’s Appointments: {totalAppointments}
        </button>
        <button className="bg-indigo-300 text-black py-8 px-6 rounded-xl shadow text-base">
          Today’s Patients: {totalPatients}
        </button>
        <button className="bg-indigo-300 text-black py-8 px-6 rounded-xl shadow text-base">
          Today’s Collection: ₹{todaysCollection}
        </button>
      </div>

      {/* Appointments */}
      <div className="bg-white shadow rounded-xl p-4 w-full">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b p-2">S.No.</th>
                <th className="border-b p-2">Patient</th>
                <th className="border-b p-2">Contact</th>
                <th className="border-b p-2">Doctor</th>
                <th className="border-b p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appt, index) => (
                  <tr key={index}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{appt.patientName}</td>
                    <td className="p-2">{appt.mobileNumber}</td>
                    <td className="p-2">{appt.doctorName}</td>
                    <td className="p-2">{appt.paymentMode}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No upcoming appointments.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
