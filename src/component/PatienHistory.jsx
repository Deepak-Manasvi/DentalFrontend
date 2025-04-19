import axios from "axios";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const PatientHistory = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const filteredHistory = useMemo(() => {
    return history.filter((patient) =>
      patient.patientName?.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, history]);

  async function fetchPatientHistory() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/appointments/patientHistory`
      );
      const pastPatients = response.data.historyList || [];
      setHistory(pastPatients);
      console.log("Fetched Patient History:", pastPatients);
    } catch (error) {
      console.error("Error fetching patient history:", error);
    }
  }

  useEffect(() => {
    fetchPatientHistory();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
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
    <div className="mx-auto overflow-x-hidden">
      {/* Header and Search Bar */}
      <div className="mb-4 mt-4 flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Patient History
        </h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="p-2 border rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="relative">
          <div className="max-h-96 overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead className="bg-teal-900 text-white sticky top-0 z-10">
                <tr className="text-sm md:text-base">
                  {tableHeaders.map((header) => (
                    <th key={header} className="py-2 px-4 text-left w-1/10">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((patient, index) => (
                  <tr
                    key={patient._id || index}
                    className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 w-1/10">{patient.appId || "N/A"}</td>
                    <td className="py-2 px-4 w-1/10">{patient.uhid || "N/A"}</td>
                    <td className="py-2 px-4 w-1/10">{patient.patientName || "N/A"}</td>
                    <td className="py-2 px-4 w-1/10">{patient.age || "N/A"}</td>
                    <td className="py-2 px-4 w-1/10">
                      {(patient.weight || "N/A") + (patient.weight ? "kg" : "")}
                    </td>
                    <td className="py-2 px-4 w-1/10">
                      {patient.medicalHistory?.join(", ") || "N/A"}
                    </td>
                    <td className="py-2 px-4 w-1/10">
                      {patient.allergies?.join(", ") || "N/A"}
                    </td>
                    <td className="py-2 px-4 w-1/10">{patient.spo2 || "N/A"}</td>
                    <td className="py-2 px-4 w-1/10">{patient.bloodGroup || "N/A"}</td>
                    <td className="py-2 px-4 w-1/10 relative">
                      <button
                        className="bg-teal-900 text-white px-3 py-1 rounded-md hover:bg-teal-600 focus:outline-none flex items-center gap-1"
                        onClick={() => toggleDropdown(patient._id || index)}
                      >
                        Actions <ChevronDown size={16} />
                      </button>

                      {dropdownOpen === (patient._id || index) && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-10 mt-2 w-40 bg-white shadow-lg rounded-md border"
                          style={{ transform: "translateY(0%)", right: "0" }}
                        >
                          <ul className="text-left">
                            <li>
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/patient-details/${patient.appId}`
                                  )
                                }
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-500 hover:text-white"
                              >
                                View Details
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/prescription-history/${patient.appId}`
                                  )
                                }
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-500 hover:text-white"
                              >
                                View Prescription
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
