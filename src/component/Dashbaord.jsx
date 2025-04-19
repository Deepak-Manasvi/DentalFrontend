import React, { useEffect, useState } from 'react';
import Card from './Card';
import RevenueChart from './RevenueChart';
import PatientTrends from './PatientTrends';
import QuickLinks from './QuickLinks';
import { FaUserMd, FaUsers, FaCalendarCheck, FaMoneyBill } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [showRevenue, setShowRevenue] = useState(true);
  const [showTrends, setShowTrends] = useState(true);

  async function fetchDetails() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/admin/dashboardDetails`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  useEffect(() => {
    fetchDetails()
  },[])  
  
  
  if (!data) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  // card data
  const cards = [
    {
      icon: <FaUserMd className="text-2xl text-teal-500" />,
      title: 'Total Doctors',
      count: data.totalDoctors,
      options: data.doctorNames,
    },
    {
      icon: <FaUsers className="text-2xl text-red-500" />,
      title: 'Total Patients',
      count: data.totalPatients,
      options: {
        today: data.todayPatients,
        last7Days: data.last7DaysPatients,
        lastMonth: data.lastMonthPatients,
        last3Months: data.last3MonthsPatients,
      },
    },
    {
      icon: <FaCalendarCheck className="text-2xl text-purple-500" />,
      title: 'Appointments',
      count: data.totalAppointments,
      options: {
        today: data.todayAppointments,
        last7Days: data.last7DaysAppointments,
        lastMonth: data.lastMonthAppointments,
        last3Months: data.last3MonthsAppointments,
      },
    },
    {
      icon: <FaMoneyBill className="text-2xl text-teal-500" />,
      title: 'Total Revenue',
      options: ['700','800','900','1000'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {cards.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </div>

        {/* Toggleable Charts Section */}
        <div className="grid grid-cols-1 mt-20 lg:grid-cols-2 gap-6">

          {/* Revenue Chart Block */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <button
              className="flex items-center justify-between w-full px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600"
              onClick={() => setShowRevenue(!showRevenue)}
            >
              <span>Revenue Chart</span>
              {showRevenue ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {showRevenue && (
              <div className="mt-4">
                <RevenueChart />
              </div>
            )}
          </div>

          {/* Patient Trends Block */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <button
              className="flex items-center justify-between w-full px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600"
              onClick={() => setShowTrends(!showTrends)}
            >
              <span>Patient Trends</span>
              {showTrends ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {showTrends && (
              <div className="mt-4">
                <PatientTrends data={data.dailyPatientCounts}/>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-25">
          <QuickLinks />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
