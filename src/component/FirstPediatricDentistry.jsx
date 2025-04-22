import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const toothNames = [
  "Upper Right Second Molar",
  "Upper Right First Molar",
  "Upper Right Canine (Cuspid)",
  "Upper Right Lateral Incisor",
  "Upper Right Central Incisor",
  "Upper Left Central Incisor",
  "Upper Left Lateral Incisor",
  "Upper Left Canine (Cuspid)",
  "Upper Left First Molar",
  "Upper Left Second Molar",
  "Lower Left Second Molar",
  "Lower Left First Molar",
  "Lower Left Canine (Cuspid)",
  "Lower Left Lateral Incisor",
  "Lower Left Central Incisor",
  "Lower Right Central Incisor",
  "Lower Right Lateral Incisor",
  "Lower Right Canine (Cuspid)",
  "Lower Right First Molar",
  "Lower Right Second Molar",
];

const teethData = toothNames.map((name, index) => ({
  id: index + 1,
  label: name,
}));

const FirstPediatricDentistryForm = ({
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

  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [chiefComplaints, setChiefComplaints] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const handleDelete = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const handleNextClick = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  const handleCheckboxChange = (toothId) => {
    setSelectedTeeth((prev) => {
      const updated = { ...prev, [toothId]: !prev[toothId] };
      const selectedNames = teethData
        .filter((t) => updated[t.id])
        .map((t) => t.label)
        .join(", ");
      setFormData((form) => ({ ...form, toothName: selectedNames }));
      return updated;
    });
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

  useEffect(() => {
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
    const simplifiedRecords = records.map((record) => ({
      toothName: record.toothName,
    }));

    try {
      const response = await axios.post(
        `${BASE_URL}/pediatric/createPediatricTreatment`,
        {
          uhid: patient?._id,
          treatments: simplifiedRecords,
        }
      );

      console.log("Treatment saved:", response.data);
      handleNext(formData.toothName);
      setFormData({
        toothName: "",
        dentalCondition: "",
        complaint: "",
        examination: "",
        advice: "",
      });
    } catch (error) {
      console.error("Error submitting treatment records:", error);
      alert(
        `Error saving treatment data: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-4">Examination Dashboard</h2>

      {/* Patient Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base mb-6">
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
          {patient?.bp && (
            <div>
              BP: {patient.bp.systolic}/{patient.bp.diastolic} mmHg
            </div>
          )}
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

      <h2 className="text-xl font-bold mb-4">Select Teeth</h2>

      {/* Teeth Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 gap-2">
            {teethData.slice(rowIndex * 3, rowIndex * 3 + 3).map((tooth) => (
              <div key={tooth.id} className="flex flex-col items-center p-2">
                <img
                  src={`/pediatricTeeth/tooth${tooth.id}.png`}
                  alt={tooth.label}
                  className="w-12 h-12 mb-1"
                />
                <p className="text-center text-[10px]">{tooth.label}</p>
                <input
                  type="checkbox"
                  checked={selectedTeeth[tooth.id] || false}
                  onChange={() => handleCheckboxChange(tooth.id)}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-5 gap-4">
        <div>
          <label>Tooth Name*</label>
          <input
            name="toothName"
            value={formData.toothName}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
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
            className="border rounded px-2 py-1 w-full"
          />
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
              className="bg-teal-900 text-white px-6 py-2 rounded shadow"
            >
              Save
            </button>
          </>
        ) : (
          <div className="ml-auto">
            <button
              onClick={handleSave}
              className="bg-teal-900 text-white px-6 py-2 rounded shadow"
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
              onClick={handleNextClick}
              className="bg-teal-600 text-white px-6 py-2 rounded shadow"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstPediatricDentistryForm;
