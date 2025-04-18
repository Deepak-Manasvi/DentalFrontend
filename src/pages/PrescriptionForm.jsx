import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PrescriptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [patientData, setPatientData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/appointments/getAppointmentByAppId/${id}`
      );
      setPatientData(res.data.appointment);
      const dummyData = {
        clinicName: "Smiles Dental Care",
        doctorName: "Dr. XYZ (BDS, MDS)",
        patient: {
          name: "Ankita",
          age: 28,
          gender: "female",
          date: "07-Apr-2025",
        },
        diagnosis: ["Toothache", "Sensitivity"],
        tests: "X-Ray",
        advice: "Avoid cold drinks and sweets.",
        prescriptionItems: [
          {
            name: "Somparaz 40",
            dosage: "1 tsp",
            timing: "Before meal",
          },
          {
            name: "Brevipil 100",
            dosage: "1-1",
            timing: "After meal, twice a day",
          },
        ],
      };
      setPrescriptionData(dummyData);
    };

    fetchData();
  }, [id]);
  console.log(patientData)
 

  // useEffect(() => {
  //   fetchDataForPatient();
  // }, []);

  const handleSave = () => {
    console.log("Saving Prescription:", prescriptionData);
    alert("Prescription saved!");
  };

  if (!prescriptionData) return <div className="p-10 text-xl">Loading...</div>;

  const {
    clinicName,
    doctorName,
    patientName,
    diagnosis,
    tests,
    gender,
    advice,
    age,
    appointmentDate,
    prescriptionItems,
  } = prescriptionData;

  return (
    <div className="max-w-7xl mx-auto p-10 shadow-2xl font-sans bg-white text-lg">
      {/* Header */}
      <div className="pb-6 mb-6">
        {/* <h1 className="text-4xl font-bold text-blue-900">{clinicName}</h1> */}
        <p className="text-2xl text-gray-700 mt-1">{patientData.doctorName}</p>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-4 text-lg mt-6 bg-white p-4 rounded-md border border-gray-300">
          
          <div className="flex gap-2">
            <h1 className="font-semibold">Name:</h1>
            <p>{patientData.patientName}</p>

            </div>
            <div className="flex gap-2">
            <h1 className="font-semibold">Age:</h1>
            <p>{patientData.age}</p>

            </div>
            <div className="flex gap-2">
            <h1 className="font-semibold">Gender:</h1>
            <p>{patientData.gender}</p>

            </div>
            <div className="flex gap-2">
            <h1 className="font-semibold">Date:</h1>
            <p>{patientData.appointmentDate}</p>

            </div>
        </div>
      </div>

      {/* Body Sections */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {diagnosis?.length > 0 && (
            <Section title="Diagnosis">
              <ul className="list-disc pl-6 text-base">
                {diagnosis.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Section>
          )}

          {tests && (
            <Section title="Tests">
              <p className="text-base">{tests}</p>
            </Section>
          )}

          {advice && (
            <Section title="Advice">
              <p className="text-base">{advice}</p>
            </Section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-3 pl-8">
          <h2 className="text-3xl font-bold mb-4">Rx</h2>
          <div className="space-y-6">
            {prescriptionItems?.length > 0 ? (
              prescriptionItems.map((item, index) => (
                <PrescriptionItem key={index} {...item} />
              ))
            ) : (
              <p className="text-gray-600">No prescriptions added.</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-12">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          ⬅ Back
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="border border-gray-300 rounded-md overflow-hidden">
    <h3 className="bg-blue-900 text-white px-4 py-2 text-lg font-semibold">
      {title}
    </h3>
    <div className="p-4 bg-gray-50">{children}</div>
  </div>
);

const PrescriptionItem = ({ name, dosage, timing }) => (
  <div className="border border-gray-300 p-6 rounded-lg bg-white shadow-sm">
    <p className="font-semibold text-xl">{name}</p>
    <p className="text-base mt-1">Dosage: {dosage}</p>
    <p className="text-base">Timing: {timing}</p>
  </div>
);

export default PrescriptionForm;
