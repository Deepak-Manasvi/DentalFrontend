import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PrescriptionTab = ({ prescriptionData, patientData }) => {
  // For debugging - display raw data
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Check if prescription data exists and has content
  const hasPrescriptions =
    prescriptionData && Object.keys(prescriptionData).length > 0;

  // Function to manually trigger prescription fetch for troubleshooting
  const retryFetchPrescription = async () => {
    try {
      const patientId = patientData?._id || "unknown";
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/prescriptions/getPrescriptionByExaminationById/${patientId}`;

      toast.info(`Attempting to fetch from: ${apiUrl}`);
      console.log("Patient data:", patientData);

      const response = await axios.get(apiUrl);
      console.log("Manual prescription fetch response:", response.data);

      if (response.data.success && response.data.data) {
        toast.success("Successfully fetched prescription data");
        // Update state to show the new data
        window.location.reload(); // Force refresh to update state
      } else {
        toast.warning(
          `API response: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Manual fetch error:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-teal-700">Prescriptions</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDebugInfo(!showDebugInfo)}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
          >
            {showDebugInfo ? "Hide Debug" : "Show Debug"}
          </button>
          <button
            onClick={retryFetchPrescription}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Retry Fetch
          </button>
        </div>
      </div>

      {/* Debug information panel */}
      {showDebugInfo && (
        <div className="p-4 border rounded bg-gray-50 my-4 text-xs font-mono">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <p>
            <strong>Patient ID:</strong> {patientData?._id || "undefined"}
          </p>
          <p>
            <strong>Examination ID (if different):</strong>{" "}
            {patientData?.examinationId || "undefined"}
          </p>
          <p>
            <strong>Data Type:</strong>{" "}
            {prescriptionData ? typeof prescriptionData : "undefined"}
          </p>
          <p>
            <strong>Has Data:</strong> {hasPrescriptions ? "Yes" : "No"}
          </p>
          <div className="mt-2">
            <strong>Raw Response:</strong>
            <pre className="bg-gray-100 p-2 mt-1 overflow-auto max-h-48">
              {JSON.stringify(prescriptionData || {}, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {!hasPrescriptions ? (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">
            No prescription records found for this patient.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            This could be because there are no prescriptions or because the API
            returned a "Not found" response.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Current Medications</h3>
          </div>

          <div className="divide-y">
            {Array.isArray(prescriptionData) ? (
              prescriptionData.map((prescription, index) => (
                <div key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        {prescription.medicationName || "Unnamed Medication"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {prescription.dosage || "No dosage information"} •
                        {prescription.frequency || "No frequency information"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        Prescribed:{" "}
                        {prescription.prescribedDate
                          ? new Date(
                              prescription.prescribedDate
                            ).toLocaleDateString()
                          : "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        By: {prescription.prescribedBy || "Unknown doctor"}
                      </p>
                    </div>
                  </div>

                  {prescription.instructions && (
                    <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                      <span className="font-medium">Instructions:</span>{" "}
                      {prescription.instructions}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">
                      {prescriptionData.medicationName || "Unnamed Medication"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {prescriptionData.dosage || "No dosage information"} •
                      {prescriptionData.frequency || "No frequency information"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      Prescribed:{" "}
                      {prescriptionData.prescribedDate
                        ? new Date(
                            prescriptionData.prescribedDate
                          ).toLocaleDateString()
                        : "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      By: {prescriptionData.prescribedBy || "Unknown doctor"}
                    </p>
                  </div>
                </div>

                {prescriptionData.instructions && (
                  <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                    <span className="font-medium">Instructions:</span>{" "}
                    {prescriptionData.instructions}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionTab;
