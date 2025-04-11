import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const patients = [
//     { App_id: "001", UHID: "U12345", Name: "Ajay Verma", Age: 45, Weight: "70kg", MedicalHistory: "Diabetes, Hypertension", Allergies: "Penicillin", BP: "130/90" },
//     { App_id: "002", UHID: "U67890", Name: "Ram", Age: 38, Weight: "65kg", MedicalHistory: "Asthma", Allergies: "None", BP: "120/80" },
// ];

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate(); // Hook to navigate between pages

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) =>
      patient.patientName?.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, patients]);

  //get all paitent list
  async function fetchPatientDetails() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/appointments/appointmentList`
      );
      const checkInPatients = response.data.appointmentList.filter(
        (patient) => patient.checkIn === true
      );
      setPatients(checkInPatients);
      console.log("Filtered Patients", checkInPatients);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  }

  console.log(patients, "pate");
  useEffect(() => {
    fetchPatientDetails();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Patient List</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border rounded shadow-md focus:outline-none focus:ring focus:ring-blue-300"
          aria-label="Search patients by name"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="border p-2">App ID</th>
              <th className="border p-2">UHID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Weight</th>
              <th className="border p-2">Medical History</th>
              <th className="border p-2">Allergies</th>
              <th className="border p-2">SPO2</th>
              <th className="border p-2">Blood Group</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr
                key={patient._id}
                className="text-center border hover:bg-gray-100 transition"
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
                <td className="border p-2 flex justify-center gap-2 flex-col md:flex-row">
                  <button
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 w-full md:w-auto"
                    onClick={() =>
                      navigate(`/admin/procedure-selection/${patient.appId}`)
                    }
                  >
                    Start Procedure
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 w-full md:w-auto"
                    onClick={() =>
                      navigate(`/admin/PrescriptionForm/${patient.appId}`)
                    }
                  >
                    Prescription
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 w-full md:w-auto">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
