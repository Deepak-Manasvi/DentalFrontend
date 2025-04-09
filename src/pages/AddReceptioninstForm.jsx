// import React, { useState } from "react";
// import axios from "axios";

// const AddReceptionistForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         "http://localhost:5000/api/v1/admin/register",
//         {
//           email,
//           password,
//           role: "receptionist"
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setMessage("Receptionist created successfully!");
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error creating receptionist");
//     }
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-4 text-blue-600 text-center">Add Receptionist</h2>
//       {message && (
//         <p className={`mb-4 text-sm text-center ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
//           {message}
//         </p>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-700 mb-1">Password</label>
//           <input
//             type="password"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Create Receptionist
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddReceptionistForm;
