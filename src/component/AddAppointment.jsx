import React, { useState, useRef, useEffect } from "react";

const AddAppointment = () => {
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [isMedicalDropdownOpen, setIsMedicalDropdownOpen] = useState(false);
  const [isAllergyDropdownOpen, setIsAllergyDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    patientType: "",
    patientName: "",
    gender: "",
    mobileNumber: "",
    age: "",
    address: "",
    weight: "",
    systolic: "",
    diastolic: "",
    spo2: "",
    bloodGroup: "",
    appointmentDate: "",
    doctorName: "",
    transactionId: "",
    status: "",
  });

  const medicalDropdownRef = useRef();
  const allergyDropdownRef = useRef();

  const medicalHistoryOptions = [
    "Diabetes", "Hypertension", "Asthma", "Arthritis",
    "Liver Disease", "Kidney Disease", "Cancer", "HIV",
    "Depression", "Thyroid Disease", "Anxiety", "Cardiovascular Disease", "None"
  ];

  const allergyOptions = [
    "Penicillin", "Aspirin & NSAIDs", "Local Anesthesia", "Opioid",
    "Latex", "Metal", "Pollen & Dust", "None"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        medicalDropdownRef.current &&
        !medicalDropdownRef.current.contains(event.target)
      ) {
        setIsMedicalDropdownOpen(false);
      }
      if (
        allergyDropdownRef.current &&
        !allergyDropdownRef.current.contains(event.target)
      ) {
        setIsAllergyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMedicalDropdown = () => setIsMedicalDropdownOpen(!isMedicalDropdownOpen);
  const toggleAllergyDropdown = () => setIsAllergyDropdownOpen(!isAllergyDropdownOpen);

  const handleMedicalHistorySelect = (condition) => {
    setSelectedMedicalHistory((prev) =>
      prev.includes(condition)
        ? prev.filter((item) => item !== condition)
        : [...prev, condition]
    );
  };

  const handleAllergySelect = (allergy) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((item) => item !== allergy)
        : [...prev, allergy]
    );
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleChange = (e) => {
   
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData)
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleBookAppointment = () => {
    const currentTime = getCurrentTime();
    setAppointmentTime(currentTime);

    const finalData = {
      ...formData,
      appointmentTime: currentTime,
      selectedMedicalHistory,
      selectedAllergies,
      paymentMode,
    };

    console.log("Appointment Data:", finalData);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">Patient Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">Patient Type</label>
          <select name="patientType" onChange={handleChange} className="w-full p-3 border rounded-xl bg-white">
            <option value="">Patient Type</option>
            <option>General Patient</option>
            <option>Emergency Patient</option>
            <option>Regular Patient</option>
            <option>Corporate Patient</option>
            <option>Insurance Patient</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Patient Name</label>
          <input name="patientName" onChange={handleChange} type="text" className="w-full p-3 border rounded-xl" placeholder="Enter Full Name" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Gender</label>
          <select name="gender" onChange={handleChange} className="w-full p-3 border rounded-xl">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
          <input name="mobileNumber" onChange={handleChange} type="number" className="w-full p-3 border rounded-xl" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Age</label>
          <input name="age" onChange={handleChange} type="number" className="w-full p-3 border rounded-xl" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Address</label>
          <input name="address" onChange={handleChange} type="text" className="w-full p-3 border rounded-xl" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6 border-b pb-2">Health Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full max-w-md" ref={medicalDropdownRef}>
          <label className="block mb-1 text-sm font-medium text-gray-700">Medical History</label>
          <div
            className="border rounded-xl p-3 min-h-[48px] bg-white cursor-pointer flex flex-wrap gap-2 items-center"
            onClick={toggleMedicalDropdown}
          >
            {selectedMedicalHistory.length > 0 ? (
              selectedMedicalHistory.map((condition) => (
                <span key={condition} className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full">
                  {condition}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Select medical conditions...</span>
            )}
          </div>
          {isMedicalDropdownOpen && (
            <div className="absolute mt-2 z-10 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {medicalHistoryOptions.map((condition) => (
                <div
                  key={condition}
                  onClick={() => handleMedicalHistorySelect(condition)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedMedicalHistory.includes(condition) ? "bg-blue-50 font-semibold" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMedicalHistory.includes(condition)}
                    readOnly
                    className="mr-2"
                  />
                  {condition}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-full max-w-md" ref={allergyDropdownRef}>
          <label className="block mb-1 text-sm font-medium text-gray-700">Allergies</label>
          <div
            className="border rounded-xl p-3 min-h-[48px] bg-white cursor-pointer flex flex-wrap gap-2 items-center"
            onClick={toggleAllergyDropdown}
          >
            {selectedAllergies.length > 0 ? (
              selectedAllergies.map((allergy) => (
                <span key={allergy} className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded-full">
                  {allergy}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Select allergy types...</span>
            )}
          </div>
          {isAllergyDropdownOpen && (
            <div className="absolute mt-2 z-10 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {allergyOptions.map((allergy) => (
                <div
                  key={allergy}
                  onClick={() => handleAllergySelect(allergy)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedAllergies.includes(allergy) ? "bg-red-50 font-semibold" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAllergies.includes(allergy)}
                    readOnly
                    className="mr-2"
                  />
                  {allergy}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Weight</label>
          <input name="weight" onChange={handleChange} type="number" className="w-full p-3 border rounded-xl" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Blood Pressure</label>
          <div className="flex gap-3">
            <input name="systolic" onChange={handleChange} type="number" className="w-1/2 p-3 border rounded-xl" placeholder="Systolic" />
            <input name="diastolic" onChange={handleChange} type="number" className="w-1/2 p-3 border rounded-xl" placeholder="Diastolic" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">SPO2</label>
          <input
            name="spo2"
            type="number"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Blood Group</label>
          <select name="bloodGroup" onChange={handleChange} className="w-full p-3 border rounded-xl">
            <option value="">Select</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
          </select>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6 border-b pb-2">Appointment Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">Appointment Date</label>
          <input name="appointmentDate" onChange={handleChange} type="date" className="w-full p-3 border rounded-xl" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Appointment Time</label>
          <input type="time" className="w-full p-3 border rounded-xl" value={appointmentTime} readOnly />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Doctor Name</label>
          <input name="doctorName" onChange={handleChange} type="text" className="w-full p-3 border rounded-xl" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6 border-b pb-2">Payment Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">OPD Amount</label>
          <input type="text" className="w-full p-3 border rounded-xl bg-gray-100" placeholder="Auto fetch" disabled />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Payment Mode</label>
          <select className="w-full p-3 border rounded-xl" value={paymentMode} onChange={handlePaymentModeChange}>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        {paymentMode !== "Cash" && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Transaction ID</label>
            <input name="transactionId" onChange={handleChange} type="text" className="w-full p-3 border rounded-xl" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-600">Status</label>
          <select name="status" onChange={handleChange} className="w-full p-3 border rounded-xl">
            <option value="">Status</option>
            <option>Paid</option>
            <option>Due</option>
          </select>
        </div>
      </div>

      <div className="mt-10 flex justify-center gap-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition text-lg"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>
        <button className="bg-gray-300 px-6 py-3 rounded-xl hover:bg-gray-400 transition text-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddAppointment;