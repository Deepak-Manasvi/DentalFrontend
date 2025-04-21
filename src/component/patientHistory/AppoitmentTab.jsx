import React from "react";

const AppointmentTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Appointments</h2>
      <div className="bg-gray-50 p-4 rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Time</th>
              <th className="text-left py-2">Doctor</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">2025-04-15</td>
              <td className="py-2">10:30 AM</td>
              <td className="py-2">Dr. Smith</td>
              <td className="py-2">Completed</td>
            </tr>
            <tr>
              <td className="py-2">2025-05-02</td>
              <td className="py-2">2:00 PM</td>
              <td className="py-2">Dr. Johnson</td>
              <td className="py-2">Scheduled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTab;
