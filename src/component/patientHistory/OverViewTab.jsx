import React from "react";

const OverviewTab = ({ patientData, treatmentData }) => {
  if (!patientData) return null;

  // Flatten all procedureList items from the treatmentData array
  const allProcedures =
    treatmentData?.flatMap((item) => item.procedureList || []) || [];

  return (
    <div className="bg-white p-4 space-y-6 w-full">
      {/* Appointments Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-2">Appointments</h2>
        <div className="border border-gray-200 rounded">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Doctor</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Payment Mode</th>
                <th className="text-left py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">
                  {new Date(patientData.appointmentDate).toLocaleDateString()}
                </td>
                <td className="py-2">
                  {patientData.appointmentTime?.join(", ") || "NA"}
                </td>
                <td className="py-2">
                  {patientData.doctorName?.join(", ") || "NA"}
                </td>
                <td className="py-2">{patientData.status || "NA"}</td>
                <td className="py-2">{patientData.paymentMode || "NA"}</td>
                <td className="py-2">₹{patientData.opdAmount || "NA"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Left Column */}
      <div className="space-y-6">
        {/* Treatment Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-2">Treatment</h2>
          <div className="border border-gray-200 rounded">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Procedure
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Treatment
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Sitting
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {allProcedures.length > 0 ? (
                  allProcedures.map((proc, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 px-4 text-sm">{proc.procedure}</td>
                      <td className="py-2 px-4 text-sm">{proc.treatment}</td>
                      <td className="py-2 px-4 text-sm">{proc.sitting}</td>
                      <td className="py-2 px-4 text-sm">₹{proc.cost}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-gray-200">
                    <td colSpan="4" className="py-2 px-4 text-sm text-center">
                      No treatment data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bill Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-2">Bill</h2>
          <div className="border border-gray-200 rounded">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Date
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Bill Amount
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Paid Amount
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Empty row for demonstration */}
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-4 text-sm"></td>
                  <td className="py-2 px-4 text-sm"></td>
                  <td className="py-2 px-4 text-sm"></td>
                  <td className="py-2 px-4 text-sm"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Exam Section */}
        {/* <div>
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Clinical Examine
          </h2>
          <div className="border border-gray-200 rounded">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Date
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Disease
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Chief Complaint
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Tooth
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    Diagnosis
                  </th>
                  <th className="py-2 px-4 text-left text-sm text-gray-700">
                    On Examination
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-4 text-sm">12-04</td>
                  <td className="py-2 px-4 text-sm">Missing Tooth</td>
                  <td className="py-2 px-4 text-sm">Impacted</td>
                  <td className="py-2 px-4 text-sm">17</td>
                  <td className="py-2 px-4 text-sm">Dental-X</td>
                  <td className="py-2 px-4 text-sm">Oral Hygiene Assessment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OverviewTab;
