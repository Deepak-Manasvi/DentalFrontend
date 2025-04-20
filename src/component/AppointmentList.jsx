// import React from "react";

// const AppointmentList = () => {
//   // Dummy appointment data
//   const appointments = [
//     { id: 101, patient: "John Doe", date: "23/03/2025", doctor: "Dr. Harshit", treatment: "Dental Checkup", status: "Confirmed", payment: "Paid" },
//     { id: 102, patient: "Emma Watson", date: "23/03/2025", doctor: "Dr. Sourabh", treatment: "Teeth Cleaning", status: "Pending", payment: "Unpaid" },
//     { id: 103, patient: "Michael Brown", date: "24/03/2025", doctor: "Dr. Polumi", treatment: "Fillings", status: "Completed", payment: "Paid" },
//     { id: 104, patient: "Sophia Lee", date: "26/03/2025", doctor: "Dr. Ajay", treatment: "Dental Implant", status: "Cancelled", payment: "Refunded" },
//   ];

//   return (
//     <div className="container mx-auto p-6 flex justify-center">
//       <div className="w-full max-w-[800px]">
//         <h2 className="text-2xl font-bold mb-4 text-center">Appointment List</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-4 border">Appointment ID</th>
//                 <th className="py-2 px-4 border">Patient Name</th>
//                 <th className="py-2 px-4 border">Date</th>
//                 <th className="py-2 px-4 border">Doctor</th>
//                 <th className="py-2 px-4 border">Treatment</th>
//                 <th className="py-2 px-4 border">Status</th>
//                 <th className="py-2 px-4 border">Payment</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appointment) => (
//                 <tr key={appointment.id} className="border hover:bg-gray-100">
//                   <td className="py-2 px-4 border">{appointment.id}</td>
//                   <td className="py-2 px-4 border">{appointment.patient}</td>
//                   <td className="py-2 px-4 border">{appointment.date}</td>
//                   <td className="py-2 px-4 border">{appointment.doctor}</td>
//                   <td className="py-2 px-4 border">{appointment.treatment}</td>
//                   <td className={`py-2 px-4 border font-semibold ${appointment.status === "Cancelled" ? "text-red-600" : "text-teal-600"}`}>
//                     {appointment.status}
//                   </td>
//                   <td className={`py-2 px-4 border font-semibold ${appointment.payment === "Unpaid" ? "text-red-600" : "text-teal-600"}`}>
//                     {appointment.payment}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentList;
