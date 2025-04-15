import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Monday', patients: 22 },
  { day: 'Tuesday', patients: 30 },
  { day: 'Wed', patients: 18 },
  { day: 'Thursday', patients: 25 },
  { day: 'Friday', patients: 29 },
  { day: 'Saturday', patients: 35 },
  { day: 'Sunday', patients: 15 },
];

const PatientTrends = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <h3 className="font-semibold mb-2 text-center">Weekly Patient Visits</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
