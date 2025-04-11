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
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
        Patient List
      </h1>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3 p-2 border rounded shadow-md focus:outline-none focus:ring focus:ring-blue-300"
          aria-label="Search patients by name"
        />
      </div>
      <div className="relative overflow-x-auto">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full bg-white border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-blue-900 text-white">
                <th className="p-2">App ID</th>
                <th className="p-2">UHID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Age</th>
                <th className="p-2">Weight</th>
                <th className="p-2">Medical History</th>
                <th className="p-2">Allergies</th>
                <th className="p-2">SPO2</th>
                <th className="p-2">Blood Group</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="text-center hover:bg-gray-100 transition"
                >
                  <td className="border p-2">{patient.appId}</td>
                  <td className="border p-2">{patient.uhid}</td>
                  <td className="border p-2">{patient.patientName}</td>
                  <td className="border p-2">{patient.age}</td>
                  <td className="border p-2">{patient.weight}kg</td>
                  <td className="border p-2">
                    {patient.medicalHistory.join(", ")}
                  </td>
                  <td className="border p-2">{patient.allergies.join(", ")}</td>
                  <td className="border p-2">{patient.spo2}</td>
                  <td className="border p-2">{patient.bloodGroup}</td>
                  <td className="border p-2">
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
