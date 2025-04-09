
import React, { useState } from "react";
const FirstPediatricDentistry = () => {

    return (
        <div className="p-8 bg-gray-100 min-h-screen">

            <div className="w-full overflow-x-auto p-4 mt-3">
                <table className="w-full text-left">
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 font-medium">UHID</td>
                            <td className="px-4 py-2 font-medium">Name</td>
                            <td className="px-4 py-2 font-medium">Contact</td>
                            <td className="px-4 py-2 font-medium">Age</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-medium">BP</td>
                            <td className="px-4 py-2 font-medium">Medical History</td>
                            <td className="px-4 py-2 font-medium">Allergies</td>
                            <td className="px-4 py-2 font-medium">Weight</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Teeth Images */}
            <div className="bg-white p-6 rounded-xl shadow-md mt-10">
                <div className="grid grid-cols-5 md:grid-cols-10 gap-4 justify-items-center">
                    {teethData.map((tooth) => (
                        <div
                            key={tooth.id}
                            className={`cursor-pointer p-5 rounded-2xl shadow-lg border-4 transition-transform duration-300 ease-in-out
                  ${selectedTeeth.includes(tooth) ? "bg-blue-100 border-blue-500" : "bg-white border-gray-200 hover:scale-105 hover:border-blue-500"}`}
                            onClick={() => handleToothClick(tooth)}
                        >
                            <img
                                src={tooth.image}
                                alt={tooth.name}
                                className="w-28 h-28 object-contain mx-auto mb-2"
                            />
                            <p className="text-center text-sm font-semibold text-gray-600">{tooth.id}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Tooth Preview */}
            {selectedTeeth.length > 0 && (
                <div className="flex flex-wrap justify-center mb-12 gap-6">
                    {selectedTeeth.map((tooth) => (
                        <div key={tooth.id} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
                            <img src={tooth.image} alt={tooth.name} className="w-32 h-32 object-contain" />
                            <h2 className="text-xl font-bold text-gray-700 mt-4">{tooth.name}</h2>
                            <p className="text-gray-500">Tooth ID: {tooth.id}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Form Section */}
            {/* ... baaki tumhara form waise ka waise chhod diya jaise diya tha ... */}
            <div className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-lg space-y-8 mt-10">
                <div className="flex flex-wrap justify-center gap-10 w-full max-w-6xl">
                    <div className="flex flex-col w-80">
                        <label className="text-gray-700 font-medium mb-2">Teeth Name</label>
                        <input
                            type="text"
                            value={selectedTeeth.map((tooth) => tooth.name).join(", ")}
                            readOnly
                            className="bg-gray-100 rounded-lg px-4 py-3 w-full text-gray-700 text-lg"
                            placeholder="Select teeth"
                        />

                    </div>

                    <div className="flex flex-col w-80">
                        <label className="text-gray-700 font-medium mb-2">Dental Condition</label>
                        <select
                            className="bg-gray-100 rounded-lg px-4 py-3 w-full text-gray-700 text-lg"
                            value={dentalCondition}
                            onChange={(e) => setDentalCondition(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Cavity">Cavity</option>
                            <option value="Infection">Infection</option>
                            <option value="Swelling">Swelling</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-80">
                        <label className="text-gray-700 font-medium mb-2">Chief Complaint</label>
                        <textarea
                            className="bg-gray-100 rounded-lg px-4 py-3 w-full h-20 resize-none text-gray-700 text-lg"
                            placeholder="Text Area"
                            value={chiefComplaint}
                            onChange={(e) => setChiefComplaint(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-10 w-full max-w-5xl">
                    <div className="flex flex-col w-96">
                        <label className="text-gray-700 font-medium mb-2">Examination</label>
                        <textarea
                            className="bg-gray-100 rounded-lg px-4 py-3 w-full h-20 resize-none text-gray-700 text-lg"
                            placeholder="Text Area"
                            value={examination}
                            onChange={(e) => setExamination(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="flex flex-col w-96">
                        <label className="text-gray-700 font-medium mb-2">Advice</label>
                        <textarea
                            className="bg-gray-100 rounded-lg px-4 py-3 w-full h-20 resize-none text-gray-700 text-lg"
                            placeholder="Text Area"
                            value={advice}
                            onChange={(e) => setAdvice(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-6 bg-blue-600 text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-blue-700 transition"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>

            <div className="overflow-x-auto mt-20 px-4">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            {["Teeth Name", "Dental Condition", "Chief Complaint", "Advice", "Examination", "Action"].map((header) => (
                                <th key={header} className="border-b p-4 text-base font-semibold text-gray-700 text-center">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {savedData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-400">No Data Saved</td>
                            </tr>
                        ) : (
                            savedData.map((data, index) => (
                                <tr key={index} className="text-center hover:bg-gray-50 transition-all">
                                    <td className="p-4">{data.teethName}</td>
                                    <td className="p-4">{data.dentalCondition}</td>
                                    <td className="p-4">{data.chiefComplaint}</td>
                                    <td className="p-4">{data.advice}</td>
                                    <td className="p-4">{data.examination}</td>
                                    <td className="p-4">{data.action}
                                        <button onClick={() => handleDelete(index)} className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 text-base transition-all"> {/* ⬅️ px-4 py-2 and text-base */}
                                            Delete
                                        </button>
                                    </td>

                                    <td className="border-b p-4">


                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="flex justify-end mt-6">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-base transition-all"> {/* ⬅️ px-6 py-3 and text-base */}
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
}
export default FirstPediatricDentistry;