import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';



const PatientTrends = ({ data = [] }) => {
  const defaultData = [
    { day: 'Mon', patients: 0 },
    { day: 'Tues', patients: 0 },
    { day: 'Wed', patients: 0 },
    { day: 'Thur', patients: 0 },
    { day: 'Fri', patients: 0 },
    { day: 'Sat', patients: 0 },
    { day: 'Sun', patients: 0 },
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
