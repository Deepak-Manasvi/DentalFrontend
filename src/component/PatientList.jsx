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
      console.log("Filtered Patients", checkInPatients);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  }

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  return (
    <div className="mx-auto overflow-x-hidden">
      {/* Header and Search Bar - Fixed */}
      <div className="mb-4 mt-4 flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Patient List
        </h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="p-2 border rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table with scrollable body */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-max border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr className="text-sm md:text-base">
              <th className="py-2 px-4 text-left">App ID</th>
              <th className="py-2 px-4 text-left">UHID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Age</th>
              <th className="py-2 px-4 text-left">Weight</th>
              <th className="py-2 px-4 text-left">Medical History</th>
              <th className="py-2 px-4 text-left">Allergies</th>
              <th className="py-2 px-4 text-left">SPO2</th>
              <th className="py-2 px-4 text-left">Blood Group</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable tbody container */}
        <div className="h-screen overflow-y-auto">
          <table className="w-full min-w-max border-collapse">
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
                  <td className="py-2 px-4">
                    {(patient.weight || "N/A") + (patient.weight ? "kg" : "")}
                  </td>
                  <td className="py-2 px-4">
                    {patient.medicalHistory?.join(", ") || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {patient.allergies?.join(", ") || "N/A"}
                  </td>
                  <td className="py-2 px-4">{patient.spo2 || "N/A"}</td>
                  <td className="py-2 px-4">{patient.bloodGroup || "N/A"}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                        onClick={() =>
                          navigate(
                            `/admin/procedure-selection/${patient.appId}`
                          )
                        }
                      >
                        Start Procedure
                      </button>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        onClick={() =>
                          navigate(`/admin/PrescriptionForm/${patient.appId}`)
                        }
                      >
                        Prescription
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
