import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const UserLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed) */}
      <UserSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Navbar */}
        <div className="bg-green-900 text-white flex justify-between items-center p-6 text-xl fixed top-0 left-0 w-full z-10 ml-72">
          <span className="mx-40">{new Date().toLocaleString()}</span>
          <span className="text-3xl font-bold">Welcome, User</span>
        </div>

        {/* Dynamic Content Area (Adjusted for Navbar height) */}
        <div className="flex-1 p-6 mt-20 ml-72">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
