import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  patient,
  formData,
  setFormData,
  selectedTeeth,
  setSelectedTeeth,
  records,
  setRecords,
  saved,
  setSaved,
  handleNext,
}) => {
  const navigate = useNavigate();
  const [chiefComplaints, setChiefComplaints] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/services/getAllChief`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setChiefComplaints(data);
        }
      })
      .catch((err) => console.error("Error fetching chief complaints:", err));

    fetch(`${BASE_URL}/services/getAllExamination`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExaminations(data);
        }
      })
      .catch((err) => console.error("Error fetching examinations:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id) => {
    const updated = { ...selectedTeeth, [id]: !selectedTeeth[id] };
    setSelectedTeeth(updated);
    const selected = teethData
      .filter((tooth) => updated[tooth.id])
      .map((tooth) => tooth.label)
      .join(", ");
    setFormData((f) => ({ ...f, toothName: selected }));
  };

  const handleSave = () => {
    const { toothName, dentalCondition, complaint, examination, advice } =
      formData;
    if (!toothName || !dentalCondition || !complaint || !examination || !advice)
      return;

    setRecords([...records, formData]);

    setSelectedTeeth({});
    setSaved(true);
  };

  const handleDelete = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };
  useEffect(() => {
    // Fetch Chief Complaints
    axios
      .get(`${BASE_URL}/services/getAllChief`)
      .then((res) => {
        console.log("Chief Complaint API Response:", res.data);
        if (Array.isArray(res.data.chiefs)) {
          setChiefComplaints(res.data.chiefs);
        }
      })
      .catch((err) =>
        console.error("Error fetching chief complaints:", err.message)
      );

    // Fetch Examinations
    axios
      .get(`${BASE_URL}/services/getAllExamination`)
      .then((res) => {
        console.log("Examination API Response:", res.data);
        if (Array.isArray(res.data.examinations)) {
          setExaminations(res.data.examinations);
        }
      })
      .catch((err) =>
        console.error("Error fetching examinations:", err.message)
      );
  }, []);

  const handleNextClick = async () => {
    if (records.length === 0) {
      alert("Please save at least one treatment record before proceeding.");
      return;
    }

    // Extract only toothName from each record
    const simplifiedRecords = records.map((record) => ({
      toothName: record.toothName,
    }));

    try {
      const response = await axios.post(
        `${BASE_URL}/treatment/createTreatment`,
        {
          uhid: patient?._id,
          treatments: simplifiedRecords,
        }
      );

      console.log("Treatment saved:", response.data);
      const { toothName } = formData;

      handleNext(toothName);
      setFormData({
        toothName: "",
        dentalCondition: "",
        complaint: "",
        examination: "",
        advice: "",
      });
    } catch (error) {
      console.error("Error submitting treatment records:", error.message);
      alert("Error saving treatment data. Please try again.");
    }
  };

  return (
    <div className="p-4 text-sm font-medium">
      <h2 className="text-xl font-semibold mb-2">Examination Dashboard</h2>

      {/* Patient Info */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div>UHID: {patient?.uhid}</div>
        <div>Name: {patient?.patientName}</div>
        <div>Contact: {patient?.mobileNumber}</div>
        <div>Age: {patient?.age}</div>
        <div>
          {patient?.bp && (
            <div>
              BP: {patient.bp.systolic}/{patient.bp.diastolic} mmHg
            </div>
          )}
        </div>
        <div>Medical History: {patient?.medicalHistory}</div>
        <div>Allergies: {patient?.allergies}</div>
        <div>Weight: {patient?.weight}</div>
      </div>

      {/* Teeth Section */}
      <h3 className="text-lg font-bold mb-2">Select Teeth</h3>
      <div className="grid grid-cols-6 gap-2 mb-6">
        {teethData.map((tooth) => (
          <div key={tooth.id} className="flex flex-col items-center p-1">
            <img
              src={`/adultdentistryTooth/tooth${tooth.id}.png`}
              alt={tooth.label}
              className={`w-14 h-14 object-contain ${
                selectedTeeth[tooth.id] ? "ring-2 ring-teal-500 rounded-md" : ""
              }`}
            />
            <span className="text-[10px] text-center">{tooth.label}</span>
            <input
              type="checkbox"
              checked={selectedTeeth[tooth.id] || false}
              onChange={() => handleCheckboxChange(tooth.id)}
            />
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        <div>
          <label>Tooth Name*</label>
          <input
            name="toothName"
            value={formData.toothName}
            onChange={handleChange}
            readOnly
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label>Dental Condition*</label>
          <select
            name="dentalCondition"
            value={formData.dentalCondition}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Select</option>
            <option value="Cavity">Cavity</option>
            <option value="Gingivitis">Gingivitis</option>
            <option value="Tooth Decay">Tooth Decay</option>
            <option value="Broken Tooth">Broken Tooth</option>
            <option value="Staining">Staining</option>
            <option value="Impacted Tooth">Impacted Tooth</option>
          </select>
        </div>
        <div>
          <label>Chief Complaint*</label>
          <select
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Select</option>
            {chiefComplaints.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Examination*</label>
          <select
            name="examination"
            value={formData.examination}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Select</option>
            {examinations.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Advice*</label>
          <input
            name="advice"
            value={formData.advice}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="bg-teal-900 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Saved Table */}
      {saved && (
        <div>
          <h3 className="text-lg font-bold mb-2">Saved Records</h3>
          <table className="w-full text-sm bg-white">
            <thead className="bg-[#2B7A6F] text-white">
              <tr>
                <th className="px-3 py-2 border border-white">Tooth Name</th>
                <th className="px-3 py-2 border border-white">
                  Dental Condition
                </th>
                <th className="px-3 py-2 border border-white">Complaint</th>
                <th className="px-3 py-2 border border-white">Examination</th>
                <th className="px-3 py-2 border border-white">Advice</th>
                <th className="px-3 py-2 border border-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, index) => (
                <tr key={index} className="border border-[#2B7A6F]">
                  <td className="px-3 py-2 border border-[#2B7A6F] text-center">
                    {rec.toothName}
                  </td>
                  <td className="px-3 py-2 border border-[#2B7A6F] text-center">
                    {rec.dentalCondition}
                  </td>
                  <td className="px-3 py-2 border border-[#2B7A6F] text-center">
                    {rec.complaint}
                  </td>
                  <td className="px-3 py-2 border border-[#2B7A6F] text-center">
                    {rec.examination}
                  </td>
                  <td className="px-3 py-2 border border-[#2B7A6F] text-center">
                    {rec.advice}
                  </td>
                  <td className="px-3 py-2 border border-[#2B7A6F] text-center">
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

          <div className="mt-4 text-right">
            <button
              onClick={handleNextClick}
              className="bg-teal-600 text-white px-6 py-2 rounded"
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
