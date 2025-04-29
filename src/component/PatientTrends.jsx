import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const PatientTrends = ({ data = [] }) => {
  // Week filter options
  const weekOptions = [
    { value: "current", label: "Current Week" },
    { value: "last", label: "Last Week" },
    { value: "twoWeeksAgo", label: "Two Weeks Ago" },
    { value: "threeWeeksAgo", label: "Three Weeks Ago" },
  ];

  const [selectedWeek, setSelectedWeek] = useState("current");
  const [filteredData, setFilteredData] = useState([]);

  // Days of the week for our chart
  const defaultDays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Get current date
    const today = new Date();
    const currentDay = today.getDay();

    // Calculate start of the current week (Sunday = 0, Monday = 1, etc)
    // For Monday as first day of week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)
    );

    // Filter data based on selected week
    let startDate;

    switch (selectedWeek) {
      case "current":
        startDate = startOfWeek;
        break;
      case "last":
        startDate = new Date(startOfWeek);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "twoWeeksAgo":
        startDate = new Date(startOfWeek);
        startDate.setDate(startDate.getDate() - 14);
        break;
      case "threeWeeksAgo":
        startDate = new Date(startOfWeek);
        startDate.setDate(startDate.getDate() - 21);
        break;
      default:
        startDate = startOfWeek;
    }

    // End date is 6 days after start date (full week)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    // Filter data to get only records from the selected week
    // Assuming dailyPatientCounts has a date field that we can parse
    let weekData = [];

    // Check if data is already structured by day name
    if (data.length > 0 && data[0].day) {
      // If we're working with simple day-based data without dates
      // We'll just use what we have (can't filter by actual dates)
      weekData = data;
    } else if (Array.isArray(data)) {
      // If data has dates, filter by the selected week date range
      weekData = data.filter((item) => {
        if (!item.date) return false;

        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });

      // Map dates to day names
      weekData = weekData.map((item) => {
        const itemDate = new Date(item.date);
        const dayIndex = itemDate.getDay();
        // Convert day index to name (0 = Sunday, 1 = Monday, etc.)
        const dayName = defaultDays[dayIndex === 0 ? 6 : dayIndex - 1]; // Adjust for Monday as first day

        return {
          day: dayName,
          count: item.count || 0,
        };
      });

      // Group by day and sum counts
      const groupedByDay = weekData.reduce((acc, item) => {
        if (!acc[item.day]) {
          acc[item.day] = { day: item.day, count: 0 };
        }
        acc[item.day].count += item.count;
        return acc;
      }, {});

      weekData = Object.values(groupedByDay);
    }

    // Create the final data with all days, filling in zeros for missing days
    const mergedData = defaultDays.map((day) => {
      const match = weekData.find((d) => d.day === day);
      return {
        day,
        patients: match ? match.count : 0,
      };
    });

    setFilteredData(mergedData);
  }, [selectedWeek, data]);

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Weekly Patient Visits</h3>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
            value={selectedWeek}
            onChange={handleWeekChange}
          >
            {weekOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="patients" fill="#06b6d4" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientTrends;
