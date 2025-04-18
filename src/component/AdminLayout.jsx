/* eslint-disable no-unused-vars */
import { IoMdArrowDropdown } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import BusinessForm from "./BusinessForm";

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const [businessName, setbusinessName] = useState("")
  const [profilePhoto, setProfilePhoto] = useState(null)
 
  // Check if this is the first load after login
  useEffect(() => {
    // Check if user is admin and if this is their first visit to the dashboard
    const isAdmin = userRole === "admin";
    const isFirstVisit = !localStorage.getItem("dashboardVisited");
    if(localStorage.getItem("user")) {
      const panel = JSON.parse(localStorage.getItem("user"))
      setbusinessName(panel.businessName)
      setProfilePhoto(panel.businessPhoto.url)
    }
    else {
      setbusinessName(userRole)
    }
    if (isAdmin && isFirstVisit) {
      // Set a small delay to ensure dashboard is loaded before showing popup
      const timer = setTimeout(() => {
        setShowBusinessForm(true);
        // Mark that the dashboard has been visited to avoid showing popup again
        localStorage.setItem("dashboardVisited", "true");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [businessName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

  const handleOpenBusinessForm = () => {
    setShowBusinessForm(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userRole={userRole}
        businessName={businessName}
        profilePhoto={profilePhoto}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-58" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <div className="bg-[#2B7A6F] text-white flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full z-10 shadow-md">
          {/* Sidebar toggle and current time (on smaller screens) */}
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button
                className="md:hidden p-2 bg-[#2B7A6F] rounded text-lg"
                onClick={() => setIsSidebarOpen(true)}
              >
                ☰
              </button>
            )}
            {/* <button
              className="flex items-center gap-2 text-xl font-semibold bg-blue-700 hover:bg-blue-600 ml-60 px-4 py-2 rounded transition"
              onClick={handleOpenBusinessForm}
            >
              <span>Business Name</span>
              <IoMdArrowDropdown />
            </button> */}

            <span className="text-sm md:hidden">{currentTime}</span>
          </div>

          {/* Right section: time, welcome, and logout */}
          <div className="flex items-center gap-4 text-right font-bold">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm">{currentTime}</span>
              <span className="text-lg font-semibold">Welcome, {userRole}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-blue-700 transition p-2 rounded-md"
              title="Logout"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 mt-[80px] overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Business Form Modal Popup */}
      {showBusinessForm && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full mx-4 animate-fade-in">
            <BusinessForm onClose={() => setShowBusinessForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
