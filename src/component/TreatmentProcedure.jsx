import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TreatmentProcedure = ({
  id,
  patient,
  finalProcedures,
  setFinalProcedures,
  finalTreatmentRecords,
  setFinalTreatmentRecords,
  setShowTreatment,
  setRecords,
  toothName,
}) => {
  const [procedureList, setProcedureList] = useState([]);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [procedureForm, setProcedureForm] = useState({
    procedure: "",
    treatment: "",
    sitting: "",
    cost: "",
  });
  const [procedureErrors, setProcedureErrors] = useState({});
  const [treatmentOptions, setTreatmentOptions] = useState([]);
  const [toothOptions, setToothOptions] = useState([]);
  const [todayProcedure, setTodayProcedure] = useState({
    date: "",
    toothName: "",
    procedureDone: "",
    materialsUsed: "",
    notes: "",
    nextDate: "",
  });
  const [todayErrors, setTodayErrors] = useState({});
  const navigate = useNavigate();
  const [medicineList, setMedicineList] = useState([]);
  const [medicineForm, setMedicineForm] = useState({
    name: "",
    frequency: "",
    beforeFood: "yes",
    afterFood: "no",
    duration: "",
    instructions: "",
  });
  const [medicineErrors, setMedicineErrors] = useState({});
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTeeth, setSelectedTeeth] = useState({});
  console.log("toothName==>", toothName);

  useEffect(() => {
    setTodayProcedure((prev) => ({
      ...prev,
      toothName: toothName,
    }));
  }, [toothName]);

  const validateProcedureForm = () => {
    const errors = {};
    if (!procedureForm.procedure) errors.procedure = "Procedure is required";
    if (!procedureForm.treatment) errors.treatment = "Treatment is required";
    if (!procedureForm.sitting) errors.sitting = "Sitting is required";
    setProcedureErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const fetchTreatmentData = async () => {
      if (!id) return;

      try {
        const treatmentsResponse = await axios.get(
          `${BASE_URL}/services/getAllTreatment`
        );
        setTreatmentOptions(treatmentsResponse.data.treatments);
      } catch (error) {
        console.error("Error fetching treatment data:", error);
      }
    };

    fetchTreatmentData();
  }, [id]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/services/getAllMedicine`);
        setMedicineOptions(response.data.medicines || []);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        const filtered = medicineOptions.filter((med) =>
          med.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMedicineOptions(filtered);
      } else {
        axios
          .get(`${BASE_URL}/services/getAllMedicine`)
          .then((res) => setMedicineOptions(res.data.medicines || []))
          .catch((err) => console.error("Error fetching medicines:", err));
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleProcedureChange = (e) => {
    const selectedProcedureName = e.target.value;

    const selectedTreatment = treatmentOptions.find(
      (treatment) => treatment.treatmentName === selectedProcedureName
    );

    if (selectedTreatment) {
      setProcedureForm({
        ...procedureForm,
        procedure: selectedTreatment.treatmentName,
        treatment: selectedTreatment.procedureName,
        cost: selectedTreatment.price || "",
      });
    } else {
      setProcedureForm({
        ...procedureForm,
        procedure: selectedProcedureName,
        treatment: "",
        cost: "",
      });
    }
  };

  const handleProcedureSave = () => {
    if (!validateProcedureForm()) return;
    setProcedureList((prev) => [...prev, procedureForm]);
    setProcedureForm({
      procedure: "",
      treatment: "",
      sitting: "",
      cost: "",
    });
    setProcedureErrors({});
  };

  const validateTodayProcedure = () => {
    const errors = {};
    for (const key in todayProcedure) {
      if (!todayProcedure[key]) errors[key] = `${key} is required`;
    }
    setTodayErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinalSave = () => {
    if (!validateTodayProcedure()) return;

    const selectedToothNames = Object.entries(selectedTeeth)
      .filter(([_, selected]) => selected)
      .map(([id]) => `Tooth ${id}`);

    const procedures = procedureList
      .map((p) => `${p.procedure} - ${p.treatment} (Cost: ${p.cost})`)
      .join(", ");

    const record = {
      date: new Date().toLocaleDateString(),
      toothName: selectedToothNames.join(", ") || todayProcedure.toothName,
      procedureDone: procedures,
      materialsUsed: todayProcedure.materialsUsed,
      notes: todayProcedure.notes,
      nextDate: todayProcedure.nextDate,
    };

    setFinalProcedures((prev) => [...prev, record]);
    setFinalTreatmentRecords((prev) => [...prev, record]);

    setTodayProcedure({
      date: "",
      toothName: "",
      procedureDone: "",
      materialsUsed: "",
      notes: "",
      nextDate: "",
    });
    setTodayErrors({});
  };

  const validateMedicineForm = () => {
    const errors = {};
    if (!medicineForm.name) errors.name = "Name is required";
    if (!medicineForm.frequency) errors.frequency = "Frequency is required";
    if (!medicineForm.duration) errors.duration = "Duration is required";
    if (!medicineForm.instructions)
      errors.instructions = "Instructions are required";
    setMedicineErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleMedicineAdd = () => {
    if (!validateMedicineForm()) return;
    setMedicineList((prev) => [...prev, medicineForm]);
    setMedicineForm({
      name: "",
      frequency: "",
      beforeFood: "yes",
      afterFood: "no",
      duration: "",
      instructions: "",
    });
    setMedicineErrors({});
  };

  const handleDeleteProcedure = (index) => {
    setProcedureList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteMedicine = (index) => {
    setMedicineList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalSaveFDATA = async () => {
    try {
      const data = {
        patientId: "12345",                  // Replace with dynamic values
        date: new Date().toISOString(),     // or a selected date
        toothName: "Molar",
        procedureDone: "Filling",
        materialsUsed: "Resin",
        notes: "Patient responded well",
        nextDate: "2025-05-10",
        procedures: ["X-Ray", "Cleaning"],  // Array of procedures
        medicines: ["Ibuprofen"]            // Array of medicines
      };
  
      const response = await axios.post(`${BASE_URL}/api/saveAllData/saveAdultTreatmentProcedure`, data);
  
      if (response.data.success) {
        toast.success("Treatment procedure saved successfully!");
        console.log("Saved:", response.data.data);
      } else {
        toast.error("Failed to save treatment procedure.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Something went wrong while saving.");
    }
  };

  return (
    <div className="p-6 ml-10 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Treatment Procedure
      </h2>

      {/* Procedure Section */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block mb-1">Procedure</label>
          <select
            value={procedureForm.procedure}
            onChange={handleProcedureChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Treatment</option>
            {treatmentOptions.map((treatment) => (
              <option key={treatment._id} value={treatment.treatmentName}>
                {treatment.treatmentName}
              </option>
            ))}
          </select>

          {procedureErrors.procedure && (
            <p className="text-red-500 text-sm">{procedureErrors.procedure}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Treatment</label>
          <input
            value={procedureForm.treatment}
            readOnly
            className="border px-2 py-1 rounded w-full bg-gray-100"
          />
          {procedureErrors.treatment && (
            <p className="text-red-500 text-sm">{procedureErrors.treatment}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Sitting</label>
          <input
            value={procedureForm.sitting}
            onChange={(e) =>
              setProcedureForm({ ...procedureForm, sitting: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
          {procedureErrors.sitting && (
            <p className="text-red-500 text-sm">{procedureErrors.sitting}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Cost</label>
          <input
            value={procedureForm.cost}
            className="border px-2 py-1 rounded w-full bg-gray-100"
            readOnly
          />
        </div>
      </div>

      <button
        onClick={handleProcedureSave}
        className="text-white px-6 py-1 mb-4 rounded"
        style={{
          backgroundColor: "#2B7A6F",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#24675F")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#2B7A6F")
        }
      >
        Save Procedure
      </button>

      {/* Procedure Table */}

      {procedureList.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-teal-700">
            Saved Procedure List
          </h3>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full text-sm text-left border border-teal-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2 border border-teal-200">
                    Procedure
                  </th>
                  <th className="px-4 py-2 border border-teal-200">
                    Treatment
                  </th>
                  <th className="px-4 py-2 border border-teal-200">Sitting</th>
                  <th className="px-4 py-2 border border-teal-200">Cost</th>
                  <th className="px-4 py-2 border border-teal-200">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {procedureList.map((item, index) => (
                  <tr key={index} className="hover:bg-teal-50 transition">
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.procedure}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.treatment}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.sitting}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.cost}
                    </td>
                    <td
                      className="px-4 py-2 border border-teal-200 text-center text-red-600 font-medium cursor-pointer"
                      onClick={() => handleDeleteProcedure(index)}
                    >
                      Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <hr className="my-6" />

      <h3 className="text-2xl font-semibold mb-2 text-gray-600">
        Medicine Prescription
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <label className="block mb-1">Name</label>
          <div className="relative">
            <select
              value={medicineForm.name}
              onChange={(e) =>
                setMedicineForm({ ...medicineForm, name: e.target.value })
              }
              className="appearance-none border px-2 py-1 rounded w-full pr-8"
            >
              <option value="">Select Medicine</option>
              {medicineOptions.map((medicine) => (
                <option key={medicine._id} value={medicine.name}>
                  {medicine.name}
                </option>
              ))}
            </select>
            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {medicineErrors.name && (
            <p className="text-red-500 text-sm">{medicineErrors.name}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Frequency</label>
          <input
            value={medicineForm.frequency}
            onChange={(e) =>
              setMedicineForm({ ...medicineForm, frequency: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
          {medicineErrors.frequency && (
            <p className="text-red-500 text-sm">{medicineErrors.frequency}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Before Food</label>
          <select
            value={medicineForm.beforeFood}
            onChange={(e) =>
              setMedicineForm({ ...medicineForm, beforeFood: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {medicineErrors.beforeFood && (
            <p className="text-red-500 text-sm">{medicineErrors.beforeFood}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">After Food</label>
          <select
            value={medicineForm.afterFood}
            onChange={(e) =>
              setMedicineForm({ ...medicineForm, afterFood: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {medicineErrors.afterFood && (
            <p className="text-red-500 text-sm">{medicineErrors.afterFood}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Duration</label>
          <input
            value={medicineForm.duration}
            onChange={(e) =>
              setMedicineForm({ ...medicineForm, duration: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
          {medicineErrors.duration && (
            <p className="text-red-500 text-sm">{medicineErrors.duration}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Instructions</label>
          <input
            value={medicineForm.instructions}
            onChange={(e) =>
              setMedicineForm({ ...medicineForm, instructions: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
          {medicineErrors.instructions && (
            <p className="text-red-500 text-sm">
              {medicineErrors.instructions}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleMedicineAdd}
        className="text-white px-6 py-1 mb-4 rounded"
        style={{
          backgroundColor: "#2B7A6F",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#24675F")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#2B7A6F")
        }
      >
        Add Medicine
      </button>

      {/* Medicine List in Simple Format */}
      {medicineList.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-teal-700">
            Prescribed Medicines
          </h3>
          <div className="space-y-2">
            {medicineList.map((med, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded border flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{med.name}</p>
                  <p className="text-sm text-gray-600">
                    {med.frequency}, {med.duration} days
                  </p>
                  <p className="text-sm text-gray-600">
                    {med.beforeFood === "yes" && "Before food"}
                    {med.beforeFood === "yes" &&
                      med.afterFood === "yes" &&
                      ", "}
                    {med.afterFood === "yes" && "After food"}
                  </p>
                  {med.instructions && (
                    <p className="text-sm text-gray-600">
                      Instructions: {med.instructions}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteMedicine(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr className="my-6" />
      <h3 className="text-2xl font-semibold mb-2 text-gray-600">
        Today Procedure
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {Object.entries(todayProcedure).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-1 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>

            {key === "toothName" ? (
              <input
                type="text"
                value={value}
                disabled
                className="border px-2 py-1 rounded w-full bg-gray-100 text-gray-700"
              />
            ) : key.toLowerCase().includes("date") ? (
              <input
                type="date"
                value={
                  key.toLowerCase().includes("next")
                    ? value || ""
                    : value || new Date().toISOString().split("T")[0]
                }
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setTodayProcedure({
                    ...todayProcedure,
                    [key]: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <input
                value={value}
                onChange={(e) =>
                  setTodayProcedure({
                    ...todayProcedure,
                    [key]: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded w-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleFinalSave}
          className="bg-teal-500 text-white px-6 py-2 rounded mb-6"
        >
          Save Today's Procedure
        </button>
        <button
          onClick={handleFinalSaveFDATA}
          className="bg-teal-500 text-white px-6 py-2 rounded mb-6"
        >
          Save ALL
        </button>
      </div>
      {/* Final Treatment Records Table */}

      {finalProcedures.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-teal-700">
            Saved Final Procedures
          </h3>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full text-sm text-left border border-teal-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2 border border-teal-200">Date</th>
                  <th className="px-4 py-2 border border-teal-200">
                    Tooth Name
                  </th>
                  <th className="px-4 py-2 border border-teal-200">
                    Procedure Done
                  </th>
                  <th className="px-4 py-2 border border-teal-200">
                    Materials Used
                  </th>
                  <th className="px-4 py-2 border border-teal-200">Notes</th>
                  <th className="px-4 py-2 border border-teal-200">
                    Next Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {finalProcedures.map((item, index) => (
                  <tr key={index} className="hover:bg-teal-50 transition">
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.date}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.toothName}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.procedureDone}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.materialsUsed}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.notes}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {item.nextDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentProcedure;
