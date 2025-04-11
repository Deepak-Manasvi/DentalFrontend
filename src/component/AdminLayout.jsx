import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const userRole = localStorage.getItem("role")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
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

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} userRole={userRole} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-0"}`}>
        {/* Navbar */}
        <div className="bg-blue-900  text-white flex justify-between items-center p-4 text-xl fixed top-0 left-0 w-full z-10">
          {!isSidebarOpen && (
            <button className="md:hidden p-2 bg-gray-700 rounded" onClick={() => setIsSidebarOpen(true)}>
              ☰
            </button>
          )}
          <span className="flex-1 mx-110">{currentTime.toLocaleString()}</span>
          <span className="text-3xl font-bold mx-auto md:mx-0">Welcome, {userRole}</span>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 mt-[80px] min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
