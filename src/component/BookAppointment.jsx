import { useState } from "react";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    appointmentDate: "",
    doctorName: "",
    timeSlot: "",
    treatmentType: "",
    appointmentNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Details:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 md:p-10 rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Patient Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Patient Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Age", name: "age", type: "number" },
              { label: "Contact", name: "contact", type: "number" },
              { label: "Address", name: "address", type: "textarea" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-gray-600 font-medium">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    className="border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className="border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-gray-600 font-medium">Gender</label>
            <select
              name="gender"
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Appointment Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                className="border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Doctor Name</label>
              <select
                name="doctorName"
                className="border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                onChange={handleChange}
              >
                <option value="">Select Doctor</option>
                <option value="Harshit">Harshit</option>
                <option value="Ajay">Ajay</option>
                <option value="Polomi">Polomi</option>
                <option value="Sourabh">Sourabh</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Time Slot</label>
              <select
                name="timeSlot"
                className="border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                onChange={handleChange}
              >
                <option value="">Select Time Slot</option>
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Treatment Type</label>
              <select
                name="treatmentType"
                className="border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                onChange={handleChange}
              >
                <option value="">Select Treatment</option>
                <option value="General Checkup">General Checkup</option>
                <option value="Dental Cleaning">Dental Cleaning</option>
                <option value="Orthopedic Consultation">Orthopedic Consultation</option>
                <option value="Cardiology Checkup">Cardiology Checkup</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-600 font-medium">Appointment Number</label>
            <input
              type="text"
              placeholder="Auto-generated"
              disabled
              name="appointmentNumber"
              className="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition bg-gray-200"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Save
          </button>
          <button type="button" className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default BookAppointment;
