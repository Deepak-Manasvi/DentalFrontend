import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const AdminAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const handleCheckIn = async (id) => {
    try {
console.log(id)
      // Step 1: Get the appointment details
      const { data } = await axios.get(`http://localhost:5000/api/getbyid/${id}`);
      console.log(data)
      const appointmentData = data?.appointment;
  
      if (!appointmentData) {
        alert("Appointment not found!");
        return;
      }
  
      // Step 2: Delete the appointment
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
  
      // Step 3: Add to patient records
      const patientPayload = {
        name: appointmentData.patientName,
        contact: appointmentData.mobileNumber,
        address: appointmentData.address,
        doctor: appointmentData.doctorName,
        time: appointmentData.appointmentTime,
        opdAmount: appointmentData.opdAmount,
        payAmount: appointmentData.payAmount,
        status: "Checked In",
        // Add any other fields your patient API expects
      };
  
      await axios.post("http://localhost:5000/api/patients/create", appointmentData);
  
      alert("Patient checked in successfully!");
      fetchAppointments(); // Refresh the list
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
      const response = await axios.get("http://localhost:5000/api/appointmentList");
      setAppointments(response.data.appointmentList || []);
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
        await axios.delete(`http://localhost:5000/api/delete/${id}`);
        fetchAppointments(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  const handleEdit = (appointment) => {
    // You can open a modal or redirect to an edit form
    console.log("Edit appointment:", appointment);
    // e.g., navigate(`/edit-appointment/${appointment._id}`);
  };

  const filteredAppointments = appointments.filter((app) =>
    Object.values(app).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="mx-auto overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Appointment List</h2>

      {/* Search Bar */}
      <div className="mb-4 w-[90%] mt-10 flex justify-end">
        <input
          type="text"
          placeholder="Search patients..."
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-max border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr className="text-sm md:text-base">
              {["ID", "Name", "Contact", "Address", "Doctor", "Time", "OPD Amount", "Pay Amount", "Status", "Action"].map(
                (header) => (
                  <th key={header} className="py-2 px-4 text-left">{header}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((app, index) => (
              <tr key={app._id || index} className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{app.patientName || "N/A"}</td>
                <td className="py-2 px-4">{app.mobileNumber || "N/A"}</td>
                <td className="py-2 px-4">{app.address || "N/A"}</td>
                <td className="py-2 px-4">{app.doctorName || "N/A"}</td>
                <td className="py-2 px-4">{app.appointmentTime || "N/A"}</td>
                <td className="py-2 px-4">{app.opdAmount || "N/A"}</td>
                <td className="py-2 px-4">{app.payAmount || app.opdAmount || "N/A"}</td>
                <td className={`py-2 px-4 font-semibold ${app.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                  {app.status || "N/A"}
                </td>
                <td className="py-2 px-4 relative">
                  <button
                    className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => toggleDropdown(app._id || index)}
                  >
                    Actions ▼
                  </button>

                  {dropdownOpen === (app._id || index) && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 mt-2 w-36 bg-white shadow-lg rounded-md border"
                      style={{ transform: "translateY(0%)", right: "0" }}
                    >
                      <ul className="text-left">
                        <li>
                          <button
                            onClick={() => handleEdit(app)}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white"
                          >
                            View
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleCheckIn(app._id)}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white"
                          >
                            Check In
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600"
                          >
                            Delete
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
  );
};

export default AdminAppointmentList;
