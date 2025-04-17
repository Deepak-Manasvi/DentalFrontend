import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';



const PatientTrends = ({ data = [] }) => {
  const defaultData = [
    { day: 'Monday', patients: 0 },
    { day: 'Tuesday', patients: 0 },
    { day: 'Wednesday', patients: 0 },
    { day: 'Thursday', patients: 0 },
    { day: 'Friday', patients: 0 },
    { day: 'Saturday', patients: 0 },
    { day: 'Sunday', patients: 0 },
  ];
  const mergedData = defaultData.map((defaultDay) => {
    const match = data.find((d) => d.day === defaultDay.day);
    return {
      ...defaultDay,
      patients: match ? match.count : 0,
    };
  });
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
    <h3 className="font-semibold mb-2 text-center text-lg">Weekly Patient Visits</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={mergedData}
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
