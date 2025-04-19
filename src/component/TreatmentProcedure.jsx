import React, { useState } from "react";

const TreatmentProcedure = ({
  id,
  patient,
  finalProcedures,
  setFinalProcedures,
  finalTreatmentRecords,
  setFinalTreatmentRecords,
  setShowTreatment,
  setRecords,
}) => {
  const [procedureList, setProcedureList] = useState([]);
  const [procedureForm, setProcedureForm] = useState({
    procedure: "",
    treatment: "",
    sitting: "",
    cost: "Auto Fetch",
  });
  const [procedureErrors, setProcedureErrors] = useState({});

  const [todayProcedure, setTodayProcedure] = useState({
    date: "",
    toothName: "",
    procedureDone: "",
    materialsUsed: "",
    notes: "",
    nextDate: "",
  });
  const [todayErrors, setTodayErrors] = useState({});

  const [medicineList, setMedicineList] = useState([]);
  const [medicineForm, setMedicineForm] = useState({
    name: "",
    frequency: "",
    beforeFood: "yes",
    afterFood: "No",
    duration: "",
    instructions: "",
  });
  const [medicineErrors, setMedicineErrors] = useState({});

  const [selectedTeeth, setSelectedTeeth] = useState({});

  const validateProcedureForm = () => {
    const errors = {};
    if (!procedureForm.procedure) errors.procedure = "Procedure is required";
    if (!procedureForm.treatment) errors.treatment = "Treatment is required";
    if (!procedureForm.sitting) errors.sitting = "Sitting is required";
    setProcedureErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProcedureSave = () => {
    if (!validateProcedureForm()) return;
    setProcedureList((prev) => [...prev, procedureForm]);
    setProcedureForm({
      procedure: "",
      treatment: "",
      sitting: "",
      cost: "Auto Fetch",
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
      .map((p) => `${p.procedure} - ${p.treatment}`)
      .join(", ");

    const record = {
      date: new Date().toLocaleDateString(),
      toothName: selectedToothNames.join(", "),
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
    if (!medicineForm.beforeFood) errors.beforeFood = "Required";
    if (!medicineForm.afterFood) errors.afterFood = "Required";
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
      afterFood: "No",
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
            onChange={(e) =>
              setProcedureForm({ ...procedureForm, procedure: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Select Procedure</option>
            <option>Cleaning</option>
            <option>Extraction</option>
            <option>Filling</option>
          </select>
          {procedureErrors.procedure && (
            <p className="text-red-500 text-sm">{procedureErrors.procedure}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Treatment</label>
          <select
            value={procedureForm.treatment}
            onChange={(e) =>
              setProcedureForm({ ...procedureForm, treatment: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">Select Treatment</option>
            <option>Root Canal</option>
            <option>Whitening</option>
          </select>
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
          backgroundColor: '#2B7A6F',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#24675F')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2B7A6F')}
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
                    <td
                      className="px-4 py-2 border border-teal-200 text-center text-red-600 font-medium cursor-pointer hover:underline"
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

      {/* Today Procedure */}
      <h3 className="text-2xl font-semibold mb-2 text-gray-600">
        Today Procedure
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {Object.entries(todayProcedure).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-1 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            {key.toLowerCase().includes("date") ? (
              <input
                type="date"
                value={value}
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
            {todayErrors[key] && (
              <p className="text-red-500 text-sm">{todayErrors[key]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleFinalSave}
        className="bg-teal-500 text-white px-6 py-2 rounded mb-6"
      >
        Save Today's Procedure
      </button>

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

      <hr className="my-6" />

      <h3 className="text-2xl font-semibold mb-2 text-gray-600">
        Medicine Prescription
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            value={medicineForm.name}
            onChange={(e) =>
              setMedicineForm({ ...medicineForm, name: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
          />
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
          backgroundColor: '#2B7A6F',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#24675F')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2B7A6F')}
      >
        Add Medicine
      </button>

      {/* Medicine Table */}
     
      {medicineList.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-teal-700">
            Prescribed Medicines
          </h3>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full text-sm text-left border border-teal-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2 border border-teal-200">Name</th>
                  <th className="px-4 py-2 border border-teal-200">
                    Frequency
                  </th>
                  <th className="px-4 py-2 border border-teal-200">
                    Before Food
                  </th>
                  <th className="px-4 py-2 border border-teal-200">
                    After Food
                  </th>
                  <th className="px-4 py-2 border border-teal-200">Duration</th>
                  <th className="px-4 py-2 border border-teal-200">
                    Instructions
                  </th>
                  <th className="px-4 py-2 border border-teal-200">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {medicineList.map((med, index) => (
                  <tr key={index} className="hover:bg-teal-50 transition">
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {med.name}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {med.frequency}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {med.beforeFood}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {med.afterFood}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {med.duration}
                    </td>
                    <td className="px-4 py-2 border border-teal-200 text-center">
                      {med.instructions}
                    </td>
                    <td
                      className="px-4 py-2 border border-teal-200 text-center text-red-600 font-medium cursor-pointer hover:underline"
                      onClick={() => handleDeleteMedicine(index)}
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

      {/* Medicine Section */}
      {/* same structure but with medicineErrors */}

      {/* Save/Back */}
      <div className="flex justify-between mt-16 px-10">
        <button
          onClick={() => setShowTreatment(true)}
          className="bg-gray-500 text-white px-6 py-1  rounded"
        >
          Back
        </button>
        <button className="bg-teal-500 text-white px-6 py-2 rounded">
          Save All
        </button>
      </div>
    </div>
  );
};

export default TreatmentProcedure;
