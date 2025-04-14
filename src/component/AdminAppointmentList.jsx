import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppointmentDetails from "./AppointmentDetails";
import { Eye, Edit, CheckCircle, Trash2 } from "lucide-react";

const AdminAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAppointment, setShowAppointment] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const handleCheckIn = async (id) => {
    try {
      console.log(id);
      // Step 1: Get the appointment details
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/appointments/updateCheckIn/${id}`
      );
      console.log(data);
      const appointmentData = data?.appointment;

      if (!appointmentData) {
        alert("Appointment not found!");
        return;
      }

      alert("Patient checked in successfully!");
      fetchAppointments();
    } catch (error) {
      console.error("Check-in process failed:", error);
      alert("Check-in failed. Try again.");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/appointments/appointmentList`
      );
      const checkInPatients = response.data.appointmentList.filter(
        (patient) => patient.isPatient === false
      );
      setAppointments(checkInPatients || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/appointments/delete/${id}`
        );
        fetchAppointments(); // Refresh list after deletion
        alert("Deleted Appointment");
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  const handleEdit = (appointment) => {
    console.log("Edit appointment:", appointment);
    navigate(`/admin/edit-appointment/${appointment._id}`);
  };

  const filteredAppointments = appointments.filter((app) =>
    Object.values(app).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const tableHeaders = [
    "ID",
    "Name",
    "Contact",
    "Address",
    "Doctor",
    "Time",
    "OPD Amount",
    "Pay Amount",
    "Status",
    "Action",
  ];

  return (
    <div className="mx-auto overflow-x-hidden">
      <AppointmentDetails
        setShowAppointment={setShowAppointment}
        showAppointment={showAppointment}
        appointmentData={appointmentData}
      />

      <div className="mb-4 mt-4 flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Appointment List
        </h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="relative">
          <div className="max-h-96 overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead className="bg-blue-900 text-white sticky top-0 z-10">
                <tr className="text-sm md:text-base">
                  {tableHeaders.map((header) => (
                    <th key={header} className="py-2 px-4 text-left w-1/10">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((app, index) => (
                  <tr
                    key={app._id || index}
                    className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 w-1/10">{index + 1}</td>
                    <td className="py-2 px-4 w-1/10">
                      {app.patientName || "N/A"}
                    </td>
                    <td className="py-2 px-4 w-1/10">
                      {app.mobileNumber || "N/A"}
                    </td>
                    <td className="py-2 px-4 w-1/10">{app.address || "N/A"}</td>
                    <td className="py-2 px-4 w-1/10">
                      {app.doctorName || "N/A"}
                    </td>
                    <td className="py-2 px-4 w-1/10">
                      {app.appointmentTime || "N/A"}
                    </td>
                    <td className="py-2 px-4 w-1/10">
                      {app.opdAmount || "N/A"}
                    </td>
                    <td className="py-2 px-4 w-1/10">
                      {app.payAmount || app.opdAmount || "N/A"}
                    </td>
                    <td
                      className={`py-2 px-4 w-1/10 font-semibold ${
                        app.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {app.status || "N/A"}
                    </td>
                    <td className="py-2 px-4 w-1/10 relative">
                      <button
                        className="bg-blue-900 text-white px-3 py-1 text-nowrap rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={() => toggleDropdown(app._id || index)}
                      >
                        Actions ▼
                      </button>

                      {dropdownOpen === (app._id || index) && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-10 mt-2 w-40 bg-white shadow-lg rounded-md border"
                          style={{ transform: "translateY(0%)", right: "0" }}
                        >
                          <ul className="text-left">
                            <li>
                              <button
                                onClick={() => handleEdit(app)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white flex items-center gap-2"
                              >
                                <Edit size={16} />
                                <span>Edit</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  setShowAppointment(true);
                                  setAppointmentData(app);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white flex items-center gap-2"
                              >
                                <Eye size={16} />
                                <span>View</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleCheckIn(app._id)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white flex items-center gap-2"
                              >
                                <CheckCircle size={16} />
                                <span>Check In</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete(app._id)}
                                className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 flex items-center gap-2"
                              >
                                <Trash2 size={16} />
                                <span>Delete</span>
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

export default AdminAppointmentList;
