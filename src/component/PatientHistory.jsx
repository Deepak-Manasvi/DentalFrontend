import React, { useState } from "react";
import PatientSidebar from "./patientHistory/PatientSideBar";
import TabNavigation from "./patientHistory/TabNavigation";
import OverviewTab from "./patientHistory/OverViewTab";
import AppointmentTab from "./patientHistory/AppoitmentTab";
import TreatmentTab from "./patientHistory/TreatmentTab";
import BillingTab from "./patientHistory/BillingTab";
import PrescriptionTab from "./patientHistory/PrescriptionTab";
import TimeLineTab from "./patientHistory/TimeLineTab";
import FilesTab from "./patientHistory/FilesTab";

const PatientHistory = () => {
  const [activeTab, setActiveTab] = useState("files");

  // Dummy patient data that would come from API
  const patientData = {
    name: "deepak",
    patientType: "General",
    uhid: "DH_196",
    gender: "Male",
    mobile: "8319955741",
    email: "",
    dob: "1994-05-16",
    age: "30",
    address: "Ashoka Garden",
    aadhaarNumber: "",
    bloodGroup: "A-",
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "appointment":
        return <AppointmentTab />;
      case "treatment":
        return <TreatmentTab />;
      case "billing":
        return <BillingTab />;
      // case "clinical":
      //   return <ClinicalExamineTab />;
      case "prescription":
        return <PrescriptionTab />;
      case "timeline":
        return <TimeLineTab />;
      case "files":
        return <FilesTab />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed left sidebar */}
      <PatientSidebar patientData={patientData} />

      {/* Right side dynamic content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-teal-500 text-white border">
          {/* Top navigation tabs */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Content area that changes based on active tab */}
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
