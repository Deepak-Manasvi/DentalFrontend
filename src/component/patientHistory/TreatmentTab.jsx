import React, { useState, useEffect } from "react";
import axios from "axios";

const TreatmentTab = ({ patientData }) => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!patientData?.appId) return;

    const fetchTreatments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/treatment/getTreatmentById/${patientData.appId}`
        );
        // assume API returns { success: true, treatments: [...] }
        if (res.data.success) {
          setTreatments(res.data.treatments);
        } else {
          setError("No treatments found.");
        }
      } catch (err) {
        console.error("Error fetching treatments:", err);
        setError("Failed to load treatments.");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, [patientData.appId]);

  if (loading) {
    return <p>Loading treatment plans…</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Treatment Plans</h2>
      <p>Current and past treatment information</p>

      {treatments.length === 0 ? (
        <p className="text-gray-500">No treatments to show.</p>
      ) : (
        <ul className="divide-y">
          {treatments.map((t) => (
            <li key={t._id} className="py-2 flex justify-between">
              <div>
                <p className="font-medium">{t.treatmentName}</p>
                <p className="text-sm text-gray-600">{t.procedureName}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{t.price}</p>
                <p className="text-xs text-gray-500">Branch: {t.branchId || "N/A"}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreatmentTab;
