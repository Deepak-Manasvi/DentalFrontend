import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) =>
      patient.patientName?.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, patients]);

  async function fetchPatientDetails() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/appointments/appointmentList`
      );
      const checkInPatients = response.data.appointmentList.filter(
        (patient) => patient.isPatient === true
      );
      setPatients(checkInPatients);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  }

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this patient?")) {
      console.log("Cancelling patient with ID:", id);
      alert("Patient cancelled");
    }
  };

  const tableHeaders = [
    "App ID",
    "UHID",
    "Name",
    "Age",
    "Weight",
    "Medical History",
    "Allergies",
    "SPO2",
    "Blood Group",
    "Action",
  ];

  return (
    <div className="mx-auto overflow-x-auto px-2">
      <div className="mb-4 mt-4 flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center md:text-left">
          Patient List
        </h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="p-2 border rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-900 text-white sticky top-0 z-10">
              <tr className="text-sm md:text-base">
                {tableHeaders.map((header) => (
                  <th key={header} className="py-2 px-4 text-left whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr
                  key={patient._id || index}
                  className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{patient.appId || "N/A"}</td>
                  <td className="py-2 px-4">{patient.uhid || "N/A"}</td>
                  <td className="py-2 px-4">{patient.patientName || "N/A"}</td>
                  <td className="py-2 px-4">{patient.age || "N/A"}</td>
                  <td className="py-2 px-4">{(patient.weight || "N/A") + (patient.weight ? "kg" : "")}</td>
                  <td className="py-2 px-4">{patient.medicalHistory?.join(", ") || "N/A"}</td>
                  <td className="py-2 px-4">{patient.allergies?.join(", ") || "N/A"}</td>
                  <td className="py-2 px-4">{patient.spo2 || "N/A"}</td>
                  <td className="py-2 px-4">{patient.bloodGroup || "N/A"}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/procedure-selection/${patient.appId}`)
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700"
                      >
                        Start Procedure
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/PrescriptionForm/${patient.appId}`)
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700"
                      >
                        Prescription
                      </button>
                      <button
                        onClick={() => handleCancel(patient.appId)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
