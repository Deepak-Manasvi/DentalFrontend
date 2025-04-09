import React, { useState, useRef, useEffect } from "react";

const appointments = [
  {
    id: 1,
    name: "Aniket",
    contact: "123-456-7890",
    address: "indore",
    doctor: "Dr. Smith",
    time: "10:00 AM",
    opdAmount: "3000",
    payAmount: "3000",
    status: "Paid",
  },
  {
    id: 2,
    name: "Rahul",
    contact: "987-654-3210",
    address: "bhopal",
    doctor: "Dr. Shrivastav",
    time: "11:30 AM",
    opdAmount: "5000",
    payAmount: "2500",
    status: "Pending",
  },
  {
    id: 3,
    name: "Ajay",
    contact: "0000000000",
    address: "Gwalior",
    doctor: "Dr. Pandey",
    time: "11:30 AM",
    opdAmount: "5000",
    payAmount: "2000",
    status: "Pending",
  },
  {
    id: 4,
    name: "Anshuman",
    contact: "999999999",
    address: "bhopal",
    doctor: "Dr. Shrivastav",
    time: "11:00 AM",
    opdAmount: "5000",
    payAmount: "5000",
    status: "Paid",
  },
  {
    id: 5,
    name: "aakash",
    contact: "3333333333",
    address: "Betul",
    doctor: "Dr.Polomii",
    time: "1:30 pM",
    opdAmount: "5000",
    payAmount: "2500",
    status: "Pending",
  },{
    id: 6,
    name: "Natik",
    contact: "9879996210",
    address: "bhopal",
    doctor: "Dr. Shrivastav",
    time: "2:30 pM",
    opdAmount: "5000",
    payAmount: "2500",
    status: "Pending",
  },
  {
    id: 7,
    name: "Rahul",
    contact: "98065463210",
    address: "Panipat",
    doctor: "Dr.Narendra",
    time: "11:30 AM",
    opdAmount: "5000",
    payAmount: "2500",
    status: "Pending",
  },
  {
    id: 8,
    name: "Ashwarya",
    contact: "9835403210",
    address: "bhopal",
    doctor: "Dr.Aatrye Dutta",
    time: "11:30 AM",
    opdAmount: "5000",
    payAmount: "2500",
    status: "Pending",
  },
  {
    id: 9,
    name: "Ram",
    contact: "9816540210",
    address: "Sagar",
    doctor: "Dr.Tripathi",
    time: "11:30 AM",
    opdAmount: "5000",
    payAmount: "2500",
    status: "Pending",
  }
];

const AdminAppointmentList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Filter appointments based on search input
  const filteredAppointments = appointments.filter((app) =>
    Object.values(app).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="mx-auto overflow-x-hidden ">
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
            {filteredAppointments.map((app) => (
              <tr key={app.id} className="border-b text-sm md:text-base text-gray-700 hover:bg-gray-100">
                <td className="py-2 px-4">{app.id}</td>
                <td className="py-2 px-4">{app.name}</td>
                <td className="py-2 px-4">{app.contact}</td>
                <td className="py-2 px-4">{app.address}</td>
                <td className="py-2 px-4">{app.doctor}</td>
                <td className="py-2 px-4">{app.time}</td>
                <td className="py-2 px-4">{app.opdAmount}</td>
                <td className="py-2 px-4">{app.payAmount}</td>
                <td className={`py-2 px-4 font-semibold ${app.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                  {app.status}
                </td>
                <td className="py-2 px-4 relative">
                  {/* Actions Button */}
                  <button
                    className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => toggleDropdown(app.id)}
                  >
                    Actions ▼
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen === app.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 mt-2 w-36 bg-white shadow-lg rounded-md border"
                      style={{ transform: "translateY(0%)", right: "0" }}
                    >
                      <ul className="text-left">
                        {["Edit", "View", "Check In"].map((action) => (
                          <li key={action}>
                            <button
                              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-500 hover:text-white"
                            >
                              {action}
                            </button>
                          </li>
                        ))}
                        <li>
                          <button className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600">
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
