import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

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
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userRole={userRole}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-0"
          }`}
      >
        {/* Navbar */}
        <div className="bg-blue-800 text-white flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full z-10 shadow-md">
          {/* Sidebar toggle and current time (on smaller screens) */}
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button
                className="md:hidden p-2 bg-blue-600 rounded text-lg"
                onClick={() => setIsSidebarOpen(true)}
              >
                ☰
              </button>
            )}
            <span className="text-sm md:hidden">{currentTime}</span>
          </div>

          {/* Centered title for large screens */}
          {/* <h1 className="text-xl font-semibold mx-auto hidden md:block">
            Admin Dashboard
          </h1> */}

          {/* Right section: time, welcome, and logout */}
          <div className="flex items-center gap-4 text-right">
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
        <div className="flex-1 p-4 mt-[80px]  overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
