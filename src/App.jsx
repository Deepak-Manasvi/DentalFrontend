/* eslint-disable no-unused-vars */
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
import AddBranches from "./component/AddBranches";
import ManageBranches from "./component/ManageBranches";
import AddStaff from "./component/AddStaff";
import ManageStaff from "./component/ManageStaff";
import AddServices from "./component/AddServices";
import ManageServices from "./component/ManageServices";
import AddDentist from "./component/AddDentist";
import ManageDentist from "./component/ManageDentist";
import Setting from "./component/UserSetting";
import EditBranches from "./component/EditBranches";
import EditDentist from "./component/EditDentist";
import DashboardCard from "./component/Dashboard";
import EditStaff from "./component/EditStaff";
import Receipt from "./component/Receipt";
import InvoiceForm from "./component/InvoiceForm";
import InvoiceList from "./component/InvoiceList";
import ReceptionDashboard from "./component/ReceptionDashboard";

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
  return getUserRole() === "receptionist" ? element : <Navigate to="/" />;
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
            ) : getUserRole() === "receptionist" ? (
              <Navigate to="/receptionist/dashboard" />
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
          <Route path="patient-History" element={<PatientList />} />

          <Route
            path="procedure-selection/:id"
            element={<ProcedureSelection />}
          />
          <Route path="procedure-adult/:id" element={<AdultDentistry />} />
          <Route
            path="procedure-pediatric/:id"
            element={<PediatricDentistry />}
          />
          <Route path="PrescriptionForm/:id" element={<PrescriptionForm />} />
          {/* <Route path="treatment" element={<TreatmentPage />} /> */}
          <Route path="add-branches" element={<AddBranches />} />
          <Route path="manage-branches" element={<ManageBranches />} />
          <Route path="edit-branch/:id" element={<EditBranches />} />
          <Route path="reception-patient" element={<ReceptionPatientList />} />
          <Route path="invoicelist" element={<InvoiceList />} />
          <Route path="ViewReceipt" element={<ViewReceipt />} />
          <Route path="invoiceform" element={<InvoiceForm />} />
          <Route path="add-staff" element={<AddStaff />} />
          <Route path="manage-staff" element={<ManageStaff />} />
          <Route path="edit-staff/:id" element={<EditStaff />} />
          <Route path="add-services" element={<AddServices />} />
          <Route path="manage-services" element={<ManageServices />} />
          <Route path="add-services" element={<AddServices />} />
          <Route path="manage-services" element={<ManageServices />} />
          <Route path="add-dentist" element={<AddDentist />} />
          <Route path="edit-dentist/:id" element={<EditDentist />} />
          <Route path="manage-dentist" element={<ManageDentist />} />
          <Route path="setting" element={<Setting />} />
          <Route path="dashboard-card" element={<DashboardCard />} />
        </Route>

        <Route
          path="/receptionist"
          element={<ReceptionRoute element={<AdminLayout />} />}
        >
          <Route path="dashboard" element={<ReceptionDashboard/>} />
          <Route path="add-appointment" element={<AddAppointment />} />
          <Route path="appointment-list" element={<AdminAppointmentList />} />
          <Route path="patient-list" element={<PatientList />} />
          <Route path="reception-patient" element={<ReceptionPatientList />} />
          <Route path="receipt" element={<Receipt />} />
          <Route path="ViewReceipt" element={<ViewReceipt />} />
          <Route path="invoiceform" element={<InvoiceForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
