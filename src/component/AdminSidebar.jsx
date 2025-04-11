import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen, userRole }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div>
        <button
          className="md:hidden p-3 text-white bg-blue-900 fixed top-2 left-2 z-50 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars className="text-xl" />
        </button>

        {/* Overlay (Only for mobile) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>


      {/* Sidebar */}
      <div
        className={`fixed  top-0 left-0 h-full bg-blue-900 text-white text-xl p-4 shadow-lg z-50 transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-gray-500">
          <FaUserCircle className="text-3xl" />
          <span className="text-2xl font-semibold">{userRole} Panel</span>
        </div>

        {/* Sidebar Sections */}
        <div className="mt-6">
          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-blue-700"
            onClick={() => toggleSection("appointment")}
          >
            <span>Appointment</span>
            {openSection === "appointment" ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {openSection === "appointment" && (
            <div className="ml-4">
              <Link to={`/${userRole}/add-appointment`} className="block p-2 hover:bg-blue-700">
                Add Appointment
              </Link>
              <Link to={`/${userRole}/appointment-list`} className="block p-2 hover:bg-blue-700">
                Appointment List
              </Link>
            </div>

          )}

          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-blue-700"
            onClick={() => toggleSection("patients")}
          >
            <span>Patients</span>
            {openSection === "patients" ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {openSection === "patients" && (
            <div className="ml-4">
              <Link to={`/${userRole}/patient-list`} className="block p-2 hover:bg-blue-700">
                Patient List
              </Link>
              <Link to={`/${userRole}/patient-history`} className="block p-2 hover:bg-blue-700">
                Patient History
              </Link>
            </div>
          )}

          <div
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-blue-700"
            onClick={() => toggleSection("services")}
          >
            <span>Services</span>
            {openSection === "services" ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {openSection === "services" && (
            <div className="ml-4">
              <Link to={`/${userRole}/add-services`} className="block p-2 hover:bg-blue-700">
                Add Services
              </Link>
              <Link to={`/${userRole}/manage-services`} className="block p-2 hover:bg-blue-700">
                Manage Services
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
