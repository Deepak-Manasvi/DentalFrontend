/* eslint-disable no-unused-vars */
import { IoMdArrowDropdown } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import BusinessForm from "./BusinessForm";
import axios from "axios";


const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const [businessName, setbusinessName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [contact, setcontact] = useState();
  const [licenseNumber, setlicenseNumber] = useState("");
  const [address, setaddress] = useState("");
  const [financialYear, setfinancialYear] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/branch/getAllBranch`
        );
        setBranches(res.data.branches); 
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };

    fetchBranches();
  }, []);

  // Check if this is the first load after login {"businessName":"Test","address":"gbhjk","contact":"5555555555","licenseNumber":"1235678","financialYear":"2025-2026","businessPhoto":{"url":"https://res.cloudinary.com/dbb8jigqx/image/upload/v1744963345/wsblkebmnoaippihwkfj.png","public_id":"wsblkebmnoaippihwkfj"},"_id":"680207105dbf1af9a42cf722","createdAt":"2025-04-18T08:02:24.783Z","updatedAt":"2025-04-18T08:02:24.783Z","__v":0}
  useEffect(() => {
    // Check if user is admin and if this is their first visit to the dashboard
    const isAdmin = userRole === "admin";
    const isFirstVisit = !localStorage.getItem("dashboardVisited");
    if (localStorage.getItem("user")) {
      const panel = JSON.parse(localStorage.getItem("user"));
      setbusinessName(panel.businessName);
      setProfilePhoto(panel.businessPhoto.url);
      setcontact(panel.contact);
      setaddress(panel.address);
      setfinancialYear(panel.financialYear);
      setlicenseNumber(panel.licenseNumber);
    } else {
      setbusinessName(userRole);
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
        address={address}
        licenseNumber={licenseNumber}
        financialYear={financialYear}
        contact={contact}
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
            <div className="w-64">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {/* <option value="" disabled>
                  Select Branch
                </option> */}
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}{" "}
                    
                  </option>
                ))}
              </select>
            </div>
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
        <div className="fixed inset-0 backdrop-blur-md bg-white/20 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full mx-4 animate-fade-in">
            <BusinessForm onClose={() => setShowBusinessForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
