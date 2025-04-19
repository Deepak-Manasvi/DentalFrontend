import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'J', revenue: 550 },
  { month: 'F', revenue: 700 },
  { month: 'M', revenue: 650 },
  { month: 'A', revenue: 720 },
  { month: 'M', revenue: 900 },
  { month: 'J', revenue: 720 },
  { month: 'J', revenue: 730 },
  { month: 'A', revenue: 500 },
  { month: 'S', revenue: 350 },
  { month: 'O', revenue: 480 },
  { month: 'N', revenue: 680 },
  { month: 'D', revenue: 520 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4 text-teal-600">Revenue Chart</h3>
      <div className="overflow-hidden">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `₹${value}`}
                label={{
                  value: 'Thousands',
                  angle: -90,
                  position: 'insideLeft',
                }}
                domain={[0, 1000]}
              />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
