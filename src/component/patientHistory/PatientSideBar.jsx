import React from "react";

// Helper component for patient info rows
const InfoRow = ({ label, value }) => {
  return (
    <div className="flex flex-col mb-2">
      <span className="text-sm text-gray-500">{label} :</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
};

const PatientSidebar = ({ patientData }) => {
  return (
    <div className="w-75 bg-white border-r  shadow-md flex-shrink-0">
          <div className="p-4 border-b">
              <button className="bg-teal-600 px-4 py-1 rounded-md">← Back</button>
        <h1 className="text-2xl font-bold text-gray-800">{patientData.name}</h1>
      </div>

      <div className="p-4">
        <h2 className="font-semibold mb-4 text-gray-700 border-b pb-2">
          Basic Info
        </h2>

        <div className="space-y-1 whitespace-nowrap">
          <InfoRow label="Patient Type" value={patientData.patientType} />
          <InfoRow label="UHID" value={patientData.uhid} />
          <InfoRow label="Gender" value={patientData.gender} />
          <InfoRow label="Mobile" value={patientData.mobile} />
          <InfoRow label="Email" value={patientData.email || "-"} />
          <InfoRow label="DOB" value={patientData.dob} />
          <InfoRow label="Age" value={patientData.age} />
          <InfoRow label="Address" value={patientData.address} />
          <InfoRow
            label="Aadhaar Number"
            value={patientData.aadhaarNumber || "-"}
          />
          <InfoRow label="Blood Group" value={patientData.bloodGroup} />
        </div>
      </div>
    </div>
  );
};

export default PatientSidebar;
