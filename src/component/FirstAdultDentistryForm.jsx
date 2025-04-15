import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const toothNames = [
  "Upper Right Third Molar",
  "Upper Right Second Molar",
  "Upper Right First Molar",
  "Upper Right Second Premolar",
  "Upper Right First Premolar",
  "Upper Right Canine",
  "Upper Right Lateral Incisor",
  "Upper Right Central Incisor",
  "Upper Left Central Incisor",
  "Upper Left Lateral Incisor",
  "Upper Left Canine",
  "Upper Left First Premolar",
  "Upper Left Second Premolar",
  "Upper Left First Molar",
  "Upper Left Second Molar",
  "Upper Left Third Molar",
  "Lower Left Third Molar",
  "Lower Left Second Molar",
  "Lower Left First Molar",
  "Lower Left Second Premolar",
  "Lower Left First Premolar",
  "Lower Left Canine",
  "Lower Left Lateral Incisor",
  "Lower Left Central Incisor",
  "Lower Right Central Incisor",
  "Lower Right Lateral Incisor",
  "Lower Right Canine",
  "Lower Right First Premolar",
  "Lower Right Second Premolar",
  "Lower Right First Molar",
  "Lower Right Second Molar",
  "Lower Right Third Molar",
];

const teethData = toothNames.map((name, index) => ({
  id: index + 1,
  label: name,
}));

const FirstAdultDentistryForm = ({
  id,
  saved,
  setSaved,
  records,
  setRecords,
  patient,
  selectedTeeth,
  showTreatment,
  setSelectedTeeth,
  formData,
  handleNext,
  setFormData,
}) => {
  const navigate = useNavigate();

  const handleDelete = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (toothId) => {
    setSelectedTeeth((prev) => {
      const updated = { ...prev, [toothId]: !prev[toothId] };
      const selectedNames = teethData
        .filter((tooth) => updated[tooth.id])
        .map((tooth) => tooth.label)
        .join(", ");
      setFormData((form) => ({ ...form, toothName: selectedNames }));
      return updated;
    });
  };

  const handleSave = () => {
    const { toothName, dentalCondition, complaint, examination, advice } =
      formData;

    console.log(formData);

    if (
      !toothName ||
      !dentalCondition ||
      !complaint ||
      !examination ||
      !advice
    ) {
      return;
    }

    setRecords([...records, formData]);
    setFormData({
      toothName: "",
      dentalCondition: "",
      complaint: "",
      examination: "",
      advice: "",
    });
    setSelectedTeeth({});
    setSaved(true);
  };

  return (
    <div className="p-4 ml-10">
      <h2 className="text-2xl font-semibold mb-4">Examination Dashboard</h2>

      {/* Patient Info */}
      <div className="grid grid-cols-4 gap-2 text-xl mb-6">
        <div>
          <strong>UHID:</strong> {patient?.uhid}
        </div>
        <div>
          <strong>Name:</strong> {patient?.patientName}
        </div>
        <div>
          <strong>Contact:</strong> {patient?.mobileNumber}
        </div>
        <div>
          <strong>Age:</strong> {patient?.age}
        </div>
        <div>
          <strong>BP:</strong> {patient?.bp}
        </div>
        <div>
          <strong>Medical History:</strong> {patient?.medicalHistory}
        </div>
        <div>
          <strong>Allergies:</strong> {patient?.allergies}
        </div>
        <div>
          <strong>Weight:</strong> {patient?.weight}
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4">Select Teeth</h2>

      {/* Top 16 Teeth Row */}
      <div className="overflow-x-auto mb-6">
        <div className="grid grid-cols-16 gap-2">
          {teethData.slice(0, 16).map((tooth) => (
            <div
              key={tooth.id}
              className="flex flex-col items-center p-2 rounded shadow-sm"
            >
              <div className=" p-1 rounded">
                <img
                  src={`/adultdentistryTooth/tooth${tooth.id}.png`}
                  alt={tooth.label}
                  className={`w-20 h-20 md:w-24 md:h-24 mb-2 ${selectedTeeth[tooth.id]
                      ? "border-2 border-blue-500 rounded"
                      : ""
                    }`}
                />
              </div>
              <span className="text-xs text-center">{tooth.label}</span>
              <input
                type="checkbox"
                checked={selectedTeeth[tooth.id] || false}
                onChange={() => handleCheckboxChange(tooth.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom 16 Teeth Row */}
      <div className="overflow-x-auto mb-6">
        <div className="grid grid-cols-16 gap-2">
          {teethData.slice(16).map((tooth) => (
            <div
              key={tooth.id}
              className="flex flex-col items-center p-2 rounded shadow-sm"
            >
              <div className=" p-1 rounded">
                <img
                  src={`/adultdentistryTooth/tooth${tooth.id}.png`}
                  alt={tooth.label}
                  className={`w-20 h-20 md:w-24 md:h-24 mb-2 ${selectedTeeth[tooth.id]
                      ? "border-2 border-blue-500 rounded"
                      : ""
                    }`}
                />
              </div>
              <span className="text-xs text-center">{tooth.label}</span>
              <input
                type="checkbox"
                checked={selectedTeeth[tooth.id] || false}
                onChange={() => handleCheckboxChange(tooth.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="mt-6 grid grid-cols-5 gap-4">
        <div>
          <label>Tooth Name*</label>
          <input
            name="toothName"
            value={formData.toothName}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
            readOnly
          />
        </div>
        <div>
          <label>Dental Condition*</label>
          <select
            name="dentalCondition"
            value={formData.dentalCondition}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
          >
            <option value="">Select</option>
            <option value="Cavity">Cavity</option>
            <option value="Gingivitis">Gingivitis</option>
            <option value="Tooth Decay">Tooth Decay</option>
            <option value="Broken Tooth">Broken Tooth</option>
            <option value="Staining">Staining</option>
            <option value="Impacted Tooth">Impacted Tooth</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Chief Complaint*</label>
          <select
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
          >
            <option value="" disabled>Select a Complaint</option>
            <option value="Headache">Headache</option>
            <option value="Cough">Cough</option>
            <option value="Fever">Fever</option>
            <option value="Fatigue">Fatigue</option>
            <option value="Nausea">Nausea</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div>
          <label>Examination*</label>
          <select
            name="examination"
            value={formData.examination}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            required
          >
            <option value="" disabled>Select an Examination</option>
            <option value="Blood Pressure">Blood Pressure</option>
            <option value="ECG">ECG</option>
            <option value="Blood Test">Blood Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="CT Scan">CT Scan</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      {/* Buttons: Save and Back */}
      <div className="mt-4 flex justify-between">
        {!saved ? (
          <>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded shadow"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-900 text-white px-6 py-2 rounded shadow"
            >
              Save
            </button>
          </>
        ) : (
          <div className="ml-auto">
            <button
              onClick={handleSave}
              className="bg-blue-900 text-white px-6 py-2 rounded shadow"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Saved Table */}
      {records.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl mb-4">Saved Records</h3>
          <table className="w-full border text-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Tooth Name</th>
                <th className="border px-4 py-2">Dental Condition</th>
                <th className="border px-4 py-2">Chief Complaint</th>
                <th className="border px-4 py-2">Examination</th>
                <th className="border px-4 py-2">Advice</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{rec.toothName}</td>
                  <td className="border px-4 py-2">{rec.dentalCondition}</td>
                  <td className="border px-4 py-2">{rec.complaint}</td>
                  <td className="border px-4 py-2">{rec.examination}</td>
                  <td className="border px-4 py-2">{rec.advice}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded shadow"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-green-600 text-white px-6 py-2 rounded shadow"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstAdultDentistryForm;
