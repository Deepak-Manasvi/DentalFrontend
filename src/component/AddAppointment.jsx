/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const AddAppointment = () => {
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [errors, setErrors] = useState({});
  const [appointmentId, setAppointmentId] = useState("");

  const [isMedicalDropdownOpen, setIsMedicalDropdownOpen] = useState(false);
  const [isAllergyDropdownOpen, setIsAllergyDropdownOpen] = useState(false);

  const [drList, setDrList] = useState([]); // list from API
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentTimeOptions, setAppointmentTimeOptions] = useState([]);

  const role = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    patientType: "",
    appId: "",
    patientName: "",
    gender: "Male",
    mobileNumber: "",
    age: "",
    address: "",
    medicalHistory: [],
    allergies: [],
    weight: "",
    systolic: "",
    diastolic: "",
    spo2: "",
    bloodGroup: "",
    appointmentDate: "",
    doctorName: "",
    transactionId: "",
    status: "",
    paymentMode: "Cash",
    opdAmount: "", // Fixed to 500
  });

  const medicalDropdownRef = useRef();
  const allergyDropdownRef = useRef();

  const medicalHistoryOptions = [
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Arthritis",
    "Liver Disease",
    "Kidney Disease",
    "Cancer",
    "HIV",
    "Depression",
    "Thyroid Disease",
    "Anxiety",
    "Cardiovascular Disease",
    "None",
  ];

  const allergyOptions = [
    "Penicillin",
    "Aspirin & NSAIDs",
    "Local Anesthesia",
    "Opioid",
    "Latex",
    "Metal",
    "Pollen & Dust",
    "None",
  ];

  const drNameOptions = ["Dr MS Dhoni", "Dr Rohit Sharma", "Dr Virat Kohli"];

  // const appointmentTimeOptions = [
  //   "10Am - 11Am",
  //   "11Am - 12Am",
  //   "12Am - 1Pm",
  //   "1Pm - 2Pm",
  //   "4Pm - 5Pm",
  //   "5Pm - 6Pm",
  // ];

  // Get next appointment ID on component mount
  useEffect(() => {
    fetchNextAppointmentId();

    const getDentistsByBranch = async (branchId) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/dentist/branch/${1}`
        );
        console.log(res.data.dentists);
        setDrList(res.data.dentists);
      } catch (err) {
        console.error("Error fetching dentists:", err);
      }
    };
    getDentistsByBranch();
  }, []);

  const handleDoctorChange = (e) => {
    const selectedId = e.target.value;
    const doctor = drList.find((doc) => doc._id === selectedId);
    setSelectedDoctor(doctor);
    setFormData({
      ...formData,
      doctorName: doctor.name,
      opdAmount: doctor.opdAmount,
    });
    setAppointmentTimeOptions(doctor.timeSlots);
  };


  // Fetch next available appointment ID
  const fetchNextAppointmentId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/appointments/appointmentList`
      );

      let nextId = 1; // Default start from 1

      // If appointments exist, get the max ID and increment
      if (
        response.data &&
        response.data.appointmentList &&
        response.data.appointmentList.length > 0
      ) {
        const appointments = response.data.appointmentList;
        const appIds = appointments.map((app) => parseInt(app.appId) || 0);
        nextId = Math.max(...appIds) + 1;
      }

      setAppointmentId(nextId.toString());
      setFormData((prev) => ({ ...prev, appId: nextId.toString() }));
    } catch (error) {
      console.error("Error fetching appointment ID:", error);
      // If error, start from 1
      setAppointmentId("1");
      setFormData((prev) => ({ ...prev, appId: "1" }));
    }
  };

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

  // Generate valid appointment date options (today + next 3 days)
  const getValidDateRange = () => {
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 3);

    return {
      min: minDate,
      max: maxDate.toISOString().split("T")[0],
    };
  };

  const dateRange = getValidDateRange();

  const toggleMedicalDropdown = () =>
    setIsMedicalDropdownOpen(!isMedicalDropdownOpen);
  const toggleAllergyDropdown = () =>
    setIsAllergyDropdownOpen(!isAllergyDropdownOpen);

  const handleMedicalHistorySelect = (condition) => {
    // Check if the condition is already selected
    if (selectedMedicalHistory.includes(condition)) {
      // If selected, remove it
      const updatedMedicalHistory = selectedMedicalHistory.filter(
        (item) => item !== condition
      );
      setSelectedMedicalHistory(updatedMedicalHistory);
      // Update formData
      setFormData({
        ...formData,
        medicalHistory: updatedMedicalHistory,
      });
    } else {
      // If not selected, add it
      const updatedMedicalHistory = [...selectedMedicalHistory, condition];
      setSelectedMedicalHistory(updatedMedicalHistory);
      // Update formData
      setFormData({
        ...formData,
        medicalHistory: updatedMedicalHistory,
      });
    }
  };

  const handleAllergySelect = (allergy) => {
    // Check if the allergy is already selected
    if (selectedAllergies.includes(allergy)) {
      // If selected, remove it
      const updatedAllergies = selectedAllergies.filter(
        (item) => item !== allergy
      );
      setSelectedAllergies(updatedAllergies);
      // Update formData
      setFormData({
        ...formData,
        allergies: updatedAllergies,
      });
    } else {
      // If not selected, add it
      const updatedAllergies = [...selectedAllergies, allergy];
      setSelectedAllergies(updatedAllergies);
      // Update formData
      setFormData({
        ...formData,
        allergies: updatedAllergies,
      });
    }
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
    setFormData((prev) => ({
      ...prev,
      paymentMode: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "patientType",
      "patientName",
      "gender",
      "mobileNumber",
      "age",
      "address",
      "weight",
      "systolic",
      "diastolic",
      "spo2",
      "bloodGroup",
      "appointmentDate",
      "doctorName",
      "status",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "This field is required.";
    });

    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be 10 digits.";
    }

    if (formData.age && (isNaN(formData.age) || Number(formData.age) <= 0)) {
      newErrors.age = "Enter a valid age.";
    }

    if (
      formData.weight &&
      (isNaN(formData.weight) || Number(formData.weight) <= 0)
    ) {
      newErrors.weight = "Enter a valid weight.";
    }

    if (formData.systolic && isNaN(formData.systolic)) {
      newErrors.systolic = "Enter a valid number.";
    }

    if (formData.diastolic && isNaN(formData.diastolic)) {
      newErrors.diastolic = "Enter a valid number.";
    }

    if (
      formData.spo2 &&
      (isNaN(formData.spo2) || formData.spo2 < 0 || formData.spo2 > 100)
    ) {
      newErrors.spo2 = "SPO2 should be between 0 and 100.";
    }

    if (paymentMode !== "Cash" && !formData.transactionId) {
      newErrors.transactionId =
        "Transaction ID is required for non-cash payments.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form after successful submission
  const resetForm = () => {
    setSelectedMedicalHistory([]);
    setSelectedAllergies([]);
    setPaymentMode("Cash");

    // Fetch new appointment ID
    fetchNextAppointmentId();

    setFormData({
      patientType: "",
      patientName: "",
      gender: "Male",
      mobileNumber: "",
      age: "",
      address: "",
      medicalHistory: [],
      allergies: [],
      weight: "",
      systolic: "",
      diastolic: "",
      spo2: "",
      bloodGroup: "",
      appointmentDate: "",
      doctorName: "",
      transactionId: "",
      status: "",
      paymentMode: "Cash",
      opdAmount: "",
    });
  };

  const handleBookAppointment = async () => {
    if (!validateForm()) return;

    const currentTime = getCurrentTime();
    setAppointmentTime(currentTime);

    const finalData = {
      ...formData,
      appointmentTime: appointmentTime || currentTime,
      paymentMode,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/appointments/addAppointment`,
        finalData
      );
      console.log("Appointment booked successfully", response.data);
      alert("Appointment booked successfully!");

      // Reset form instead of navigating
      resetForm();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
    }
  };

  return (
    <div className=" mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
        Patient Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Patient Type <span className="text-red-500">*</span>
          </label>
          <select
            name="patientType"
            value={formData.patientType}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl bg-white"
          >
            <option value="" disabled selected hidden>
              Patient Type
            </option>
            <option value="General Patient">General Patient</option>
            <option value="Emergency Patient">Emergency Patient</option>
            <option value="Regular Patient">Regular Patient</option>
            <option value="Corporate Patient">Corporate Patient</option>
            <option value="Insurance Patient">Insurance Patient</option>
          </select>
          {errors.patientType && (
            <p className="text-red-500 text-sm mt-1">{errors.patientType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Appointment Id<span className="text-red-500">*</span>
          </label>
          <input
            name="appId"
            value={appointmentId}
            type="text"
            required
            className="w-full p-3 border rounded-xl bg-gray-100"
            placeholder="Auto-generated ID"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Patient Name<span className="text-red-500">*</span>
          </label>
          <input
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            type="text"
            className="w-full p-3 border rounded-xl"
            placeholder="Enter Full Name"
          />
          {errors.patientName && (
            <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Gender<span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Mobile Number<span className="text-red-500">*</span>
          </label>
          <input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            type="number"
            placeholder="Enter Mobile Number"
            className="w-full p-3 border rounded-xl"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Age<span className="text-red-500">*</span>
          </label>
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
            placeholder="Enter Age"
            className="w-full p-3 border rounded-xl"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Address<span className="text-red-500">*</span>
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            type="text"
            placeholder="Enter Address"
            className="w-full p-3 border rounded-xl"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6 border-b pb-2">
        Health Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full" ref={medicalDropdownRef}>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Medical History
          </label>
          <div
            className="border rounded-xl p-3 min-h-[48px] bg-white cursor-pointer flex flex-wrap gap-2 items-center"
            onClick={toggleMedicalDropdown}
          >
            {selectedMedicalHistory.length > 0 ? (
              selectedMedicalHistory.map((condition) => (
                <span
                  key={condition}
                  className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full"
                >
                  {condition}
                </span>
              ))
            ) : (
              <span className="text-gray-400">
                Select medical conditions...
              </span>
            )}
          </div>
          {errors.medicalHistory && (
            <p className="text-red-500 text-sm mt-1">{errors.medicalHistory}</p>
          )}
          {isMedicalDropdownOpen && (
            <div className="absolute mt-2 z-10 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {medicalHistoryOptions.map((condition) => (
                <div
                  key={condition}
                  onClick={() => handleMedicalHistorySelect(condition)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedMedicalHistory.includes(condition)
                    ? "bg-blue-50 font-semibold"
                    : ""
                    }`}
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

        <div className="relative w-full" ref={allergyDropdownRef}>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Allergies
          </label>
          <div
            className="border rounded-xl p-3 min-h-[48px] bg-white cursor-pointer flex flex-wrap gap-2 items-center"
            onClick={toggleAllergyDropdown}
          >
            {selectedAllergies.length > 0 ? (
              selectedAllergies.map((allergy) => (
                <span
                  key={allergy}
                  className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded-full"
                >
                  {allergy}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Select allergy types...</span>
            )}
          </div>
          {errors.allergies && (
            <p className="text-red-500 text-sm mt-1">{errors.allergies}</p>
          )}
          {isAllergyDropdownOpen && (
            <div className="absolute mt-2 z-10 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {allergyOptions.map((allergy) => (
                <div
                  key={allergy}
                  onClick={() => handleAllergySelect(allergy)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedAllergies.includes(allergy)
                    ? "bg-red-50 font-semibold"
                    : ""
                    }`}
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
          <label className="block text-sm font-medium text-gray-600">
            Weight<span className="text-red-500">*</span>
          </label>
          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            type="number"
            className="w-full p-3 border rounded-xl"
            placeholder="Enter weight"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Blood Pressure<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <input
              name="systolic"
              value={formData.systolic}
              onChange={handleChange}
              type="number"
              className="w-1/2 p-3 border rounded-xl"
              placeholder="Systolic"
            />
            <input
              name="diastolic"
              value={formData.diastolic}
              onChange={handleChange}
              type="number"
              className="w-1/2 p-3 border rounded-xl"
              placeholder="Diastolic"
            />
          </div>
          {(errors.systolic || errors.diastolic) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.systolic || errors.diastolic}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            SPO2<span className="text-red-500">*</span>
          </label>
          <input
            name="spo2"
            value={formData.spo2}
            type="number"
            onChange={handleChange}
            placeholder="Enter SPO2"
            className="w-full p-3 border rounded-xl"
          />
          {errors.spo2 && (
            <p className="text-red-500 text-sm mt-1">{errors.spo2}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Blood Group<span className="text-red-500">*</span>
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6 border-b pb-2">
        Appointment Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Doctor Name<span className="text-red-500">*</span>
          </label>
          <select
            name="doctorName"
            value={selectedDoctor?._id || ""}
            onChange={handleDoctorChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Doctor</option>
            {drList.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctorName && (
            <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Appointment Date<span className="text-red-500">*</span>
          </label>
          <input
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            type="date"
            min={dateRange.min}
            max={dateRange.max}
            className="w-full p-3 border rounded-xl"
          />
          {errors.appointmentDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.appointmentDate}
            </p>
          )}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-600">
            Appointment Time<span className="text-red-500">*</span>
          </label>
          <select
            name="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Time Slot</option>
            {appointmentTimeOptions.map((timeSlot, index) => (
              <option key={index} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
        </div>



        {/* OPD Amount Display (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            OPD Amount
          </label>
          <input
            type="text"
            value={formData.opdAmount}
            readOnly
            className="w-full p-3 border rounded-xl bg-gray-100"
          />
        </div>
      </div>


      <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6 border-b pb-2">
        Payment Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Payment Mode
          </label>
          <select
            className="w-full p-3 border rounded-xl"
            value={paymentMode}
            name="paymentMode"
            onChange={handlePaymentModeChange}
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
          {errors.paymentMode && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentMode}</p>
          )}
        </div>

        {paymentMode !== "Cash" && (
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Transaction ID
            </label>
            <input
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              type="text"
              placeholder="Enter TransactionId"
              className="w-full p-3 border rounded-xl"
            />
            {errors.transactionId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.transactionId}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Status<span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-between gap-6">
        <button
          className="bg-gray-300 px-6 py-3 rounded-xl hover:bg-gray-400 transition text-lg"
          onClick={resetForm}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition text-lg"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default AddAppointment;
