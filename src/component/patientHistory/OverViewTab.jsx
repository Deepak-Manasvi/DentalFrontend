import React from "react";

const OverviewTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Patient Overview</h2>
      <p>Summary of patient health information and recent activities.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium mb-2">Recent Visits</h3>
          <p>Last visit: April 15, 2025</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium mb-2">Upcoming Appointments</h3>
          <p>Next appointment: May 2, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
