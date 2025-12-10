import type{ FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

type MonthlyData = {
  month: string;
  income: number;
  expenses: number;
};

type RentDistribution = {
  name: string;
  value: number;
};

interface AnalyticsProps {
  monthlyData?: MonthlyData[];
  rentDistribution?: RentDistribution[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsDashboard: FC<AnalyticsProps> = ({
  monthlyData = [],
  rentDistribution = [],
}) => {
  // Totals
  const totalIncome = monthlyData.reduce((acc, curr) => acc + curr.income, 0);
  const totalExpenses = monthlyData.reduce((acc, curr) => acc + curr.expenses, 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700">Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <p className="text-gray-500">Total Income</p>
          <p className="text-2xl font-bold text-green-600">Ksh {totalIncome}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <p className="text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">Ksh {totalExpenses}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <p className="text-gray-500">Net Profit</p>
          <p className="text-2xl font-bold text-indigo-600">
            Ksh {totalIncome - totalExpenses}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <p className="text-gray-500">Months Tracked</p>
          <p className="text-2xl font-bold text-yellow-600">{monthlyData.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Income & Expenses Line Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Income vs Expenses (Monthly)</h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#00C49F" />
                <Line type="monotone" dataKey="expenses" stroke="#FF8042" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-20">No monthly data available</p>
          )}
        </div>

        {/* Rent Distribution Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Rent Distribution</h2>
          {rentDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={rentDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {rentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-20">No rent distribution data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
