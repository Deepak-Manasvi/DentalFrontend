import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const InvoiceGenerator = () => {
  const selectedBranch = localStorage.getItem("selectedBranch");
  const receptionistName = localStorage.getItem("receptionistName") || "Receptionist";
  const invoiceRef = useRef();

  const [patients, setPatients] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [formData, setFormData] = useState({
    invoiceId: uuidv4().slice(0, 8).toUpperCase(),
    createdAt: new Date().toLocaleString(),
    uhid: "",
    appId: "",
    patientName: "",
    mobileNumber: "",
    address: "",
    doctorName: "",
    treatmentType: "",
    branchId: selectedBranch,
    receptionist: receptionistName,
    services: [],
    discount: 0,
    subtotal:"",
    netPayable:""
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/receipts/getAllReceipts`);
        const filteredReceipts = res.data.filter(receipt => receipt.generateInvoice === true);
        console.log(filteredReceipts)
        setPatients(filteredReceipts);
      } catch (err) {
        console.error("Failed to fetch receipts:", err);
      }
    };

    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/services/getAllTreatment`);
        const treatments = res.data.treatments;

        const formatted = treatments.map(t => ({
          _id: t._id,
          name: `${t.treatmentName} (${t.procedureName})`,
          amount: parseFloat(t.price),
        }));

        setServicesList(formatted);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    fetchPatients();
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(p => p._id === selectedPatientId);
      if (patient) {
        setFormData(prev => ({
          ...prev,
          uhid: patient.appointmentId.uhid,
          appId: patient.appointmentId.appId,
          patientName: patient.patientName,
          mobileNumber: patient.mobileNumber,
          address: patient.address,
          doctorName: patient.doctorName,
          treatmentType: patient.treatmentType,
        }));
      }
    }
  }, [selectedPatientId, patients]);

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];

    if (field === "serviceId") {
      const selectedService = servicesList.find(s => s._id === value);
      if (selectedService) {
        updatedServices[index] = {
          serviceId: selectedService._id,
          description: selectedService.name,
          rate: selectedService.amount,
          quantity: 1,
          amount: selectedService.amount,
        };
      }
    } else if (field === "quantity") {
      const quantity = parseInt(value) || 0;
      updatedServices[index].quantity = quantity;
      updatedServices[index].amount = quantity * updatedServices[index].rate;
    }

    setFormData(prev => ({
      ...prev,
      services: updatedServices,
    }));
  };

  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { description: "", quantity: 1, rate: 0, amount: 0 }],
    }));
  };

  const handleRemoveService = (index) => {
    const updated = [...formData.services];
    updated.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      services: updated,
    }));
  };

  const handleDiscountChange = (e) => {
    const discount = parseInt(e.target.value) || 0;
    setFormData(prev => ({ ...prev, discount }));
  };

  const handleSave = async () => {
  console.log(formData)
  await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/invoices/create`,
    formData
  );
  };

  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=600");
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
          <style>
            body { padding: 2rem; color: #000; background: #fff; font-family: sans-serif; }
            table, th, td { border: 1px solid #000; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          ${printContents}
          <script>
            window.onload = function() {
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
  
    printWindow.document.close();
  };
  
  

  const patientOptions = patients.map(p => ({
    value: p._id,
    label: `${p.patientName} (${p.appointmentId.uhid})`,
  }));

  const subtotal = formData.services.reduce((acc, item) => acc + item.amount, 0);
  const netPayable = subtotal - formData.discount;
  if(subtotal){
    formData.subtotal=subtotal
  }
  if(netPayable){
    formData.netPayable=netPayable
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-teal-800">Generate Invoice</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Select Patient</label>
        <Select
          options={patientOptions}
          onChange={option => setSelectedPatientId(option?.value || "")}
          placeholder="Search or select patient..."
          isClearable
        />
      </div>

      <div ref={invoiceRef} className="p-6 border rounded text-black bg-white">
        <div className="text-center text-2xl font-bold">Header</div>
        <div className="flex justify-between my-4">
          <div>
            <p><b>Date:</b> {formData.createdAt}</p>
            <p><b>Invoice No:</b> {formData.invoiceId}</p>
            <p><b>Patient Name:</b> {formData.patientName}</p>
            <p><b>UHID:</b> {formData.uhid}</p>
          </div>
          <div>
            <p><b>Doctor Name:</b> {formData.doctorName}</p>
            <p><b>Treatment Type:</b> {formData.treatmentType}</p>
          </div>
        </div>

        <h2 className="text-center text-red-600 text-xl font-bold my-4 underline">Invoice</h2>

        <table className="w-full border text-sm mb-4">
          <thead>
            <tr className="border-b">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Description of service</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.services.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                  <select
                    className="w-full px-2 py-1"
                    value={item.serviceId || ""}
                    onChange={e => handleServiceChange(index, "serviceId", e.target.value)}
                  >
                    <option value="">Select Service</option>
                    {servicesList.map(service => (
                      <option key={service._id} value={service._id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    min="1"
                    className="w-full  px-2 py-1"
                    value={item.quantity}
                    onChange={e => handleServiceChange(index, "quantity", e.target.value)}
                  />
                </td>
                <td className="p-2 border">₹{item.rate}</td>
                <td className="p-2 border">₹{item.amount}</td>
                <td className="p-2 border text-center">
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => handleRemoveService(index)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleAddService}
          className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
        >
          + Add Service
        </button>

        <div className="text-right mt-2 space-y-1">
  <div className="flex justify-end items-center gap-2">
    <span className="font-semibold">Sub Total:</span>
    <span>₹{subtotal}</span>
  </div>
  <div className="flex justify-end items-center gap-2">
    <span className="font-semibold">Discount:</span>
    <input
      type="number"
      className="border-b border-gray-400 w-24 text-right focus:outline-none"
      value={formData.discount}
      onChange={handleDiscountChange}
    />
  </div>
  <div className="flex justify-end items-center gap-2">
    <span className="font-semibold">Net Payable:</span>
    <span>₹{netPayable}</span>
  </div>
</div>


        <p className="text-center mt-10 font-semibold">
          “Thank you for choosing our services.”
        </p>
      </div>

      <div className="flex gap-4 mt-6 justify-end">
        <button
          onClick={handleSave}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Save Invoice
        </button>
        <button
          onClick={handlePrint}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
