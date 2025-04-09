import React, { useState } from "react";

const TreatmentProcedure = ({
    id,
    patient,
    finalProcedures,
    setFinalProcedures,
    finalTreatmentRecords,
    examinationData,
    records,
    setRecords,
    setFinalTreatmentRecords,
    setShowTreatment,
}) => {
    const [procedureList, setProcedureList] = useState([]);
    const [procedureForm, setProcedureForm] = useState({
        procedure: "",
        treatment: "",
        sitting: "",
        cost: "Auto Fetch",
    });

    const [todayProcedure, setTodayProcedure] = useState({
        date: "",
        toothName: "",
        procedureDone: "",
        materialsUsed: "",
        notes: "",
        nextDate: "",
    });

    const [medicineList, setMedicineList] = useState([]);
    const [medicineForm, setMedicineForm] = useState({
        name: "",
        frequency: "",
        beforeFood: "yes",
        afterFood: "No",
        duration: "",
        instructions: "",
    });

    const [formData, setFormData] = useState({
        toothName: "",
        dentalCondition: "",
        complaint: "",
        examination: "",
        advice: "",
    });

    const [selectedTeeth, setSelectedTeeth] = useState({});

    const handleAddToRecords = () => {
        const payload = {
            patientId: id,
            patientInfo: patient,
            selectedTeeth,
            ...formData,
        };

        setRecords((prev) => [...prev, payload]);
        setFormData({
            toothName: "",
            dentalCondition: "",
            complaint: "",
            examination: "",
            advice: "",
        });
        setSelectedTeeth({});
    };

    const handleProcedureSave = () => {
        setProcedureList((prev) => [...prev, procedureForm]);
        setProcedureForm({
            procedure: "",
            treatment: "",
            sitting: "",
            cost: "Auto Fetch",
        });
    };
    
    const handleFinalSave = () => {
        const record = {
            date: new Date().toLocaleDateString(),
            teeth: Object.entries(selectedTeeth)
                .filter(([_, selected]) => selected)
                .map(([id]) => `Tooth ${id}`),
            procedureDone: procedureList.map(
                (p) => `${p.procedure} - ${p.treatment}`
            ),
            materialsUsed: todayProcedure.materialsUsed,
            notes: todayProcedure.notes,
            nextDate: todayProcedure.nextDate,
        };
        setFinalTreatmentRecords([...finalTreatmentRecords, record]);
        setFinalProcedures((prev) => [...prev, todayProcedure]);
        setTodayProcedure({
            date: "",
            toothName: "",
            procedureDone: "",
            materialsUsed: "",
            notes: "",
            nextDate: "",
        });
        setProcedureList([]);
    };

    

    const handleMedicineAdd = () => {
        setMedicineList((prev) => [...prev, medicineForm]);
        setMedicineForm({
            name: "",
            frequency: "",
            beforeFood: "yes",
            afterFood: "No",
            duration: "",
            instructions: "",
        });
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
                        <option>Select Procedure</option>
                        <option>Cleaning</option>
                        <option>Extraction</option>
                        <option>Filling</option>
                    </select>
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
                        <option>Select Treatment</option>
                        <option>Root Canal</option>
                        <option>Whitening</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Sitting Required</label>
                    <input
                        value={procedureForm.sitting}
                        onChange={(e) =>
                            setProcedureForm({ ...procedureForm, sitting: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1">Cost</label>
                    <button className="bg-gray-300 px-4 py-1 rounded w-full cursor-default">
                        Auto Fetch
                    </button>
                </div>
            </div>

            <button
                onClick={handleProcedureSave}
                className="bg-gray-400 px-6 py-1 mb-4 rounded"
            >
                Save
            </button>

            {/* Procedure Table */}
            

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
                        <input
                            value={value}
                            onChange={(e) =>
                                setTodayProcedure({ ...todayProcedure, [key]: e.target.value })
                            }
                            className="border px-2 py-1 rounded w-full"
                            placeholder={key.replace(/([A-Z])/g, " $1")}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={handleFinalSave}
                className="bg-gray-400 px-6 py-1 mb-6 rounded"
            >
                Save
            </button>

            {/* Final Table */}
            {finalProcedures.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-600">
                        Saved Procedures
                    </h3>
                    <table className="w-full text-lg border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1">Date</th>
                                <th className="border px-2 py-1">Tooth Name</th>
                                <th className="border px-2 py-1">Procedure Done</th>
                                <th className="border px-2 py-1">Materials Used</th>
                                <th className="border px-2 py-1">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalProcedures.map((item, index) => (
                                <tr key={index} className="text-center border-t">
                                    <td className="border px-2 py-1">{item.date}</td>
                                    <td className="border px-2 py-1">{item.toothName}</td>
                                    <td className="border px-2 py-1">{item.procedureDone}</td>
                                    <td className="border px-2 py-1">{item.materialsUsed}</td>
                                    <td className="border px-2 py-1">{item.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <hr className="my-6" />

            {/* Medicine Section */}
            <h3 className="text-2xl font-semibold mb-2 text-gray-600">
                Medicine Details
            </h3>
            <div className="grid grid-cols-7 gap-2 mb-4 text-xl">
                <div>
                    <label className="block mb-1">Medicine Name</label>
                    <input
                        value={medicineForm.name}
                        onChange={(e) =>
                            setMedicineForm({ ...medicineForm, name: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1">Frequency</label>
                    <select
                        value={medicineForm.frequency}
                        onChange={(e) =>
                            setMedicineForm({ ...medicineForm, frequency: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                    >
                        <option value="">Select Frequency</option>
                        <option value="BD">BD</option>
                        <option value="OD">OD</option>
                    </select>
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
                        <option>yes</option>
                        <option>no</option>
                    </select>
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
                        <option>Yes</option>
                        <option>No</option>
                    </select>
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
                </div>

                <div>
                    <label className="block mb-1">Instructions</label>
                    <input
                        value={medicineForm.instructions}
                        onChange={(e) =>
                            setMedicineForm({
                                ...medicineForm,
                                instructions: e.target.value,
                            })
                        }
                        className="border px-2 py-1 rounded w-full"
                    />
                </div>

                <div className="flex items-end">
                    <button
                        onClick={handleMedicineAdd}
                        className="bg-gray-400 px-4 py-1 rounded w-full"
                    >
                        Add
                    </button>
                </div>
            </div>

            {medicineList.length > 0 && (
                <table className="w-full text-lg mb-6 border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">Name</th>
                            <th className="border px-2 py-1">Frequency</th>
                            <th className="border px-2 py-1">Before Food</th>
                            <th className="border px-2 py-1">After Food</th>
                            <th className="border px-2 py-1">Duration</th>
                            <th className="border px-2 py-1">Instructions</th>
                            <th className="border px-2 py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicineList.map((med, index) => (
                            <tr key={index} className="text-center">
                                <td className="border px-2 py-1">{med.name}</td>
                                <td className="border px-2 py-1">{med.frequency}</td>
                                <td className="border px-2 py-1">{med.beforeFood}</td>
                                <td className="border px-2 py-1">{med.afterFood}</td>
                                <td className="border px-2 py-1">{med.duration}</td>
                                <td className="border px-2 py-1">{med.instructions}</td>
                                <td
                                    className="border px-2 py-1 text-red-500 cursor-pointer"
                                    onClick={() => handleDeleteMedicine(index)}
                                >
                                    Delete
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="flex justify-between mt-16 px-10">
                <button
                    onClick={() => setShowTreatment(true)}
                    className="bg-gray-500 text-white px-6 py-2 rounded"
                >
                    Back
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded">
                    Save
                </button>
            </div>

        </div>
    );
};

export default TreatmentProcedure;
