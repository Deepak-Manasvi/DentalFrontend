import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const { id } = useParams(); // Get patient ID from URL
  const [activeTab, setActiveTab] = useState("overview");
  const [patientData, setPatientData] = useState({});
  const [treatmentData, setTreatmentData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/appointments/getAppointment/${id}`);
        await setPatientData(response.data.appointment);
        console.log(patientData,"patient data")
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

 useEffect(() => {
   const fetchTreatmentData = async () => {
     try {
       const response = await axios.get(
         `${
           import.meta.env.VITE_APP_BASE_URL
         }/saveAllData/getTreatmentById/${id}`
       );

       // Access the correct property from the response
       if (response.data.success && response.data.data) {
         setTreatmentData(response.data.data);
         console.log(response.data.data, "treatment data");
       } else {
         console.error("No treatment data found");
       }
     } catch (error) {
       console.error("Error fetching treatment data:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchTreatmentData();
 }, [id]);

  const renderContent = () => {
    const tabProps = { patientData ,treatmentData};
    

    switch (activeTab) {
      case "overview":
        return <OverviewTab {...tabProps} />;
      case "appointment":
        return <AppointmentTab {...tabProps} />;
      case "treatment":
        return <TreatmentTab {...tabProps} />;
      case "billing":
        return <BillingTab {...tabProps} />;
      case "prescription":
        return <PrescriptionTab {...tabProps} />;
      case "timeline":
        return <TimeLineTab {...tabProps} />;
      case "files":
        return <FilesTab {...tabProps} />;
      default:
        return <div>Select a tab</div>;
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!patientData) return <div className="p-4 text-red-500">Patient not found</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <PatientSidebar patientData={patientData} />

      <div className="flex-1 flex flex-col">
        <div className="bg-teal-500 text-white border">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-white">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
