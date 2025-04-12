import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./component/Dashbaord";
import AddAppointment from "./component/AddAppointment";
import EditAppointment from "./component/EditAppointment";
import AdminLayout from "./component/AdminLayout";
import AdminAppointmentList from "./component/AdminAppointmentList";
import PatientList from "./component/PatientList";
import ProcedureSelection from "./pages/ProcedureSelection";
import AdultDentistry from "./pages/AdultDentistry";
import PrescriptionForm from "./pages/PrescriptionForm";
import PediatricDentistry from "./pages/PediatricDentistry";
import LoginForm from "./pages/LoginForm";
import ReceptionPatientList from "./component/ReceptionPatientList";
import ViewReceipt from "./component/ViewReceipt";
import Invoice from "./component/Invoice";
import AddBranches from "./component/AddBranches";
import ManageBranches from "./component/ManageBranches";
import AddStaff from "./component/AddStaff";
import ManageStaff from "./component/ManageStaff";

let userRole;
// Function to get the user role
const getUserRole = () => {
  userRole = localStorage.getItem("role");
  return localStorage.getItem("role");
};

// Protected Routes
const AdminRoute = ({ element }) => {
  return getUserRole() === "admin" ? element : <Navigate to="/" />;
};

// Protected Route for Reception Role
const ReceptionRoute = ({ element }) => {
  return getUserRole() === "reception" ? element : <Navigate to="/" />;
};


function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Routes>
        {/* Default Home Route - Redirects Based on Role */}
        <Route
          path="/"
          element={
            getUserRole() === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : getUserRole() === "reception" ? (
              <Navigate to="/reception/dashboard" />
            ) : (
              <LoginForm />
            )
          }
        />
        {/* Public Routes */}
        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<AdminRoute element={<AdminLayout />} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-appointment" element={<AddAppointment />} />
          <Route path="edit-appointment/:appId" element={<EditAppointment />} />
          <Route path="appointment-list" element={<AdminAppointmentList />} />
          <Route path="patient-list" element={<PatientList />} />
          <Route path="procedure-selection/:id"element={<ProcedureSelection />}/>
          <Route path="procedure-adult/:id" element={<AdultDentistry />} />
          <Route path="procedure-pediatric/:id" element={<PediatricDentistry />}/>
          <Route path="PrescriptionForm/:id" element={<PrescriptionForm />} />
          {/* <Route path="treatment" element={<TreatmentPage />} /> */}
          <Route path="add-Branches" element={<AddBranches />} />
          <Route path="manage-branches" element={<ManageBranches />} />
          <Route path="reception-patient" element={<ReceptionPatientList />} />
          <Route path="receipt" element={<Invoice />} />
          <Route path="ViewReceipt" element={<ViewReceipt />} />
          <Route path="add-staff" element={<AddStaff />} />
          <Route path="edit-staff/:staffId" element={<ManageStaff />} />
        </Route>

        <Route
          path="/reception"
          element={<ReceptionRoute element={<AdminLayout />} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-appointment" element={<AddAppointment />} />
          <Route path="appointment-list" element={<AdminAppointmentList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
