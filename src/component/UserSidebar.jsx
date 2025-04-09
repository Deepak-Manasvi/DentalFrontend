import { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  const [openSection, setOpenSection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="md:hidden p-3 text-white bg-gray-900 fixed top-2 left-2 z-50 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen bg-gray-900 text-white p-4 transition-transform duration-300 z-40 w-64 md:w-72 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <FaUserCircle className="text-3xl" />
          <span className="text-lg font-semibold">Welcome, Username</span>
        </div>

        {/* Sidebar Menu */}
        <div>
          {/* Appointment Section */}
          <div>
            <div
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700"
              onClick={() => toggleSection("appointment")}
            >
              <span>Appointment</span>
              {openSection === "appointment" ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
            </div>
            {openSection === "appointment" && (
              <div className="ml-4">
                <Link
                  to="/book-appointment"
                  className="block p-2 cursor-pointer hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  Book Appointment
                </Link>
                <Link
                  to="/appointment-list"
                  className="block p-2 cursor-pointer hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  Appointment List
                </Link>
              </div>
            )}
          </div>

          {/* Treatment Section */}
          <div>
            <div
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700"
              onClick={() => toggleSection("treatment")}
            >
              <span>Treatment</span>
              {openSection === "treatment" ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
            </div>
            {openSection === "treatment" && (
              <div className="ml-4">
                <Link
                  to="/prescription"
                  className="block p-2 cursor-pointer hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  Prescription
                </Link>
                <Link
                  to="/visit-timeline"
                  className="block p-2 cursor-pointer hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  Visit Timeline
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
