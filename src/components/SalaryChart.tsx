import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalaryInsight {
  year: number;
  minSalary: number;
  avgSalary: number;
  maxSalary: number;
}

interface SalaryChartProps {
  data: SalaryInsight[];
}

function SalaryChart({ data }: SalaryChartProps) {
  const chartData = data.map((item) => ({
    year: `Year ${item.year}`,
    'Min Salary': Math.round(item.minSalary),
    'Avg Salary': Math.round(item.avgSalary),
    'Max Salary': Math.round(item.maxSalary),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
        <Legend />
        <Line type="monotone" dataKey="Min Salary" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="Avg Salary" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="Max Salary" stroke="#ffc658" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SalaryChart;

