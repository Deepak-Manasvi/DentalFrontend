// import React from "react";
// import { useNavigate } from "react-router-dom";

// const toothNames = [
//   "Upper Right Second Molar",
//   "Upper Right First Molar",
//   "Upper Right Canine (Cuspid)",
//   "Upper Right Lateral Incisor",
//   "Upper Right Central Incisor",
//   "Upper Left Central Incisor",
//   "Upper Left Lateral Incisor",
//   "Upper Left Canine (Cuspid)",
//   "Upper Left First Molar",
//   "Upper Left Second Molar",
//   "Lower Left Second Molar",
//   "Lower Left First Molar",
//   "Lower Left Canine (Cuspid)",
//   "Lower Left Lateral Incisor",
//   "Lower Left Central Incisor",
//   "Lower Right Central Incisor",
//   "Lower Right Lateral Incisor",
//   "Lower Right Canine (Cuspid)",
//   "Lower Right First Molar",
//   "Lower Right Second Molar",
// ];


// const teethData = toothNames.map((name, index) => ({
//   id: index + 1,
//   label: name,
// }));

// const FirstPediatricDentistryForm = ({
//   saved,
//   setSaved,
//   records,
//   setRecords,
//   patient,
//   selectedTeeth,
//   showTreatment,
//   setSelectedTeeth,
//   formData,
//   handleNext,
//   setFormData,
// }) => {
//   const navigate = useNavigate();

//   const handleDelete = (index) => {
//     const updated = [...records];
//     updated.splice(index, 1);
//     setRecords(updated);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (toothId) => {
//     setSelectedTeeth((prev) => {
//       const updated = { ...prev, [toothId]: !prev[toothId] };
//       const selectedNames = teethData
//         .filter((t) => updated[t.id])
//         .map((t) => t.label)
//         .join(", ");
//       setFormData((form) => ({ ...form, toothName: selectedNames }));
//       return updated;
//     });
//   };

//   const handleSave = () => {
//     const { toothName, dentalCondition, complaint, examination, advice } = formData;
//     if (!toothName || !dentalCondition || !complaint || !examination || !advice) return;

//     setRecords([...records, formData]);
//     setFormData({
//       toothName: "",
//       dentalCondition: "",
//       complaint: "",
//       examination: "",
//       advice: "",
//     });
//     setSelectedTeeth({});
//     setSaved(true);
//   };


//     useEffect(() => {
//       // Fetch Chief Complaints
//       axios
//         .get("http://localhost:3500/api/services/getAllChief")
//         .then((res) => {
//           console.log("Chief Complaint API Response:", res.data);
//           if (Array.isArray(res.data.chiefs)) {
//             setChiefComplaints(res.data.chiefs);
//           }
//         })
//         .catch((err) =>
//           console.error("Error fetching chief complaints:", err.message)
//         );
  
//       // Fetch Examinations
//       axios
//         .get("http://localhost:3500/api/services/getAllExamination")
//         .then((res) => {
//           console.log("Examination API Response:", res.data);
//           if (Array.isArray(res.data.examinations)) {
//             setExaminations(res.data.examinations);
//           }
//         })
//         .catch((err) =>
//           console.error("Error fetching examinations:", err.message)
//         );
//     }, []);
  
//     const handleNextClick = async () => {
//       if (records.length === 0) {
//         alert("Please save at least one treatment record before proceeding.");
//         return;
//       }
  
//       // Extract only toothName from each record
//       const simplifiedRecords = records.map((record) => ({
//         toothName: record.toothName,
//       }));
  
//       try {
//         const response = await axios.post(
//           "http://localhost:3500/api/treatment/createTreatment",
//           {
//             uhid: patient?.uhid,
//             treatments: simplifiedRecords,
//           }
//         );
  
//         console.log("Treatment saved:", response.data);
//         handleNext();
//       } catch (error) {
//         console.error("Error submitting treatment records:", error.message);
//         alert("Error saving treatment data. Please try again.");
//       }
//     };
  

//   return (
//     <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
//       <h2 className="text-2xl font-semibold mb-4">Examination Dashboard</h2>

//       {/* Patient Info */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm md:text-base mb-6"> 
//         <div><strong>UHID:</strong> {patient?.uhid}</div>
//         <div><strong>Name:</strong> {patient?.patientName}</div>
//         <div><strong>Contact:</strong> {patient?.mobileNumber}</div>
//         <div><strong>Age:</strong> {patient?.age}</div>
//         <div><strong>BP:</strong> {patient?.bp}</div>
//         <div><strong>Medical History:</strong> {patient?.medicalHistory}</div>
//         <div><strong>Allergies:</strong> {patient?.allergies}</div>
//         <div><strong>Weight:</strong> {patient?.weight}</div>
//       </div>

//       <h2 className="text-xl font-bold mb-4">Select Teeth</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         {[...Array(6)].map((_, rowIndex) => (
//           <div key={rowIndex} className="grid grid-cols-1 gap-2">
//             {teethData.slice(rowIndex * 3, rowIndex * 3 + 3).map((tooth) => (
//               <div key={tooth.id} className="flex flex-col items-center p-2">
//                 <img
//                   src={`/pediatricTeeth/tooth${tooth.id}.png`}
//                   alt={tooth.label}
//                   className="w-12 h-12 mb-1"
//                 />
//                 <p className="text-center text-[10px]">{tooth.label}</p>
//                 <input
//                   type="checkbox"
//                   checked={selectedTeeth[tooth.id] || false}
//                   onChange={() => handleCheckboxChange(tooth.id)}
//                   className="mt-1"
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* Form Fields */}
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         <div>
//           <label>Tooth Name*</label>
//           <input
//             name="toothName"
//             value={formData.toothName}
//             onChange={handleChange}
//             className="border rounded px-2 py-1 w-full"
//             required
//             readOnly
//           />
//         </div>
//         <div>
//           <label>Dental Condition*</label>
//           <select
//             name="dentalCondition"
//             value={formData.dentalCondition}
//             onChange={handleChange}
//             className="border rounded px-2 py-1 w-full"
//             required
//           >
//             <option value="">Select</option>
//             <option value="Cavity">Cavity</option>
//             <option value="Gingivitis">Gingivitis</option>
//             <option value="Tooth Decay">Tooth Decay</option>
//             <option value="Broken Tooth">Broken Tooth</option>
//             <option value="Staining">Staining</option>
//             <option value="Impacted Tooth">Impacted Tooth</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <div>
//           <label>Chief Complaint*</label>
//           <select
//             name="complaint"
//             value={formData.complaint}
//             onChange={handleChange}
//             className="border rounded px-2 py-1 w-full"
//             required
//           >
//             <option value="" disabled>Select a Complaint</option>
//             <option value="Headache">Headache</option>
//             <option value="Cough">Cough</option>
//             <option value="Fever">Fever</option>
//             <option value="Fatigue">Fatigue</option>
//             <option value="Nausea">Nausea</option>
//           </select>
//         </div>
//         <div>
//           <label>Examination*</label>
//           <select
//             name="examination"
//             value={formData.examination}
//             onChange={handleChange}
//             className="border rounded px-2 py-1 w-full"
//             required
//           >
//             <option value="" disabled>Select an Examination</option>
//             <option value="Blood Pressure">Blood Pressure</option>
//             <option value="ECG">ECG</option>
//             <option value="Blood Test">Blood Test</option>
//             <option value="X-Ray">X-Ray</option>
//             <option value="CT Scan">CT Scan</option>
//           </select>
//         </div>
//         <div>
//           <label>Advice*</label>
//           <input
//             name="advice"
//             value={formData.advice}
//             onChange={handleChange}
//             className="border rounded px-2 py-1 w-full"
//             required
//           />
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
//         {!saved ? (
//           <>
//             <button
//               onClick={() => navigate(-1)}
//               className="bg-gray-500 text-white px-6 py-2 rounded shadow w-full sm:w-auto"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleSave}
//               className="bg-teal-900 text-white px-6 py-2 rounded shadow w-full sm:w-auto"
//             >
//               Save
//             </button>
//           </>
//         ) : (
//           <div className="ml-auto">
//             <button
//               onClick={handleSave}
//               className="bg-teal-900 text-white px-6 py-2 rounded shadow"
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Records Table */}
//       {records.length > 0 && (
//         <div className="mt-8 overflow-x-auto">
//           <h3 className="text-2xl mb-4">Saved Records</h3>
//           <table className="w-full border text-sm md:text-base min-w-[700px]">
//             <thead className="bg-teal-900 text-white">
//               <tr>
//                 <th className="border px-4 py-2 text-center">Tooth Name</th>
//                 <th className="border px-4 py-2 text-center">Dental Condition</th>
//                 <th className="border px-4 py-2 text-center">Chief Complaint</th>
//                 <th className="border px-4 py-2 text-center">Examination</th>
//                 <th className="border px-4 py-2 text-center">Advice</th>
//                 <th className="border px-4 py-2 text-center">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((rec, index) => (
//                 <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                   <td className="border px-4 py-2 text-center">{rec.toothName}</td>
//                   <td className="border px-4 py-2 text-center">{rec.dentalCondition}</td>
//                   <td className="border px-4 py-2 text-center">{rec.complaint}</td>
//                   <td className="border px-4 py-2 text-center">{rec.examination}</td>
//                   <td className="border px-4 py-2 text-center">{rec.advice}</td>
//                   <td className="border px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleDelete(index)}
//                       className="text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="bg-gray-500 text-white px-6 py-2 rounded shadow w-full sm:w-auto"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleNext}
//               className="bg-teal-600 text-white px-6 py-2 rounded shadow w-full sm:w-auto"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FirstPediatricDentistryForm;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
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
  

  useEffect(() => {
    axios
      .get("http://localhost:3500/api/services/getAllChief")
      .then((res) => {
        if (Array.isArray(res.data.chiefs)) {
          setChiefComplaints(res.data.chiefs);
        }
      })
      .catch((err) =>
        console.error("Error fetching chief complaints:", err.message)
      );

    axios
      .get("http://localhost:3500/api/services/getAllExamination")
      .then((res) => {
        if (Array.isArray(res.data.examinations)) {
          setExaminations(res.data.examinations);
        }
      })
      .catch((err) =>
        console.error("Error fetching examinations:", err.message)
      );
  }, []);
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <h2 className="text-2xl font-semibold mb-4">Examination Dashboard</h2>

      {/* Patient Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm md:text-base mb-6"> {/* ✅ Fixed overlap with more cols & gaps */}
        <div><strong>UHID:</strong> {patient?.uhid}</div>
        <div><strong>Name:</strong> {patient?.patientName}</div>
        <div><strong>Contact:</strong> {patient?.mobileNumber}</div>
        <div><strong>Age:</strong> {patient?.age}</div>
        <div><strong>BP:</strong> {patient?.bp}</div>
        <div><strong>Medical History:</strong> {patient?.medicalHistory}</div>
        <div><strong>Allergies:</strong> {patient?.allergies}</div>
        <div><strong>Weight:</strong> {patient?.weight}</div>
      </div>

      <h2 className="text-xl font-bold mb-4">Select Teeth</h2>

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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
            className="border rounded px-2 py-1 w-full"
            required
          >
            <option value="" disabled>Select a Complaint</option>
            <option value="Headache">Headache</option>
            <option value="Cough">Cough</option>
            <option value="Fever">Fever</option>
            <option value="Fatigue">Fatigue</option>
            <option value="Nausea">Nausea</option>
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

      <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
        {!saved ? (
          <>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded shadow w-full sm:w-auto"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className="bg-teal-900 text-white px-6 py-2 rounded shadow w-full sm:w-auto"
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

      {records.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <h3 className="text-2xl mb-4">Saved Records</h3>
          <table className="w-full border text-sm md:text-base min-w-[700px]">
            <thead className="bg-teal-900 text-white">
              <tr>
                <th className="border px-4 py-2 text-center">Tooth Name</th>
                <th className="border px-4 py-2 text-center">
                  Dental Condition
                </th>
                <th className="border px-4 py-2 text-center">
                  Chief Complaint
                </th>
                <th className="border px-4 py-2 text-center">Examination</th>
                <th className="border px-4 py-2 text-center">Advice</th>
                <th className="border px-4 py-2 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border px-4 py-2 text-center">
                    {rec.toothName}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {rec.dentalCondition}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {rec.complaint}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {rec.examination}
                  </td>
                  <td className="border px-4 py-2 text-center">{rec.advice}</td>
                  <td className="border px-4 py-2 text-center">
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

          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded shadow w-full sm:w-auto"
            >
              Back
            </button>
            <button
              onClick={handleNextClick}
              className="bg-teal-600 text-white px-6 py-2 rounded shadow w-full sm:w-auto"
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
