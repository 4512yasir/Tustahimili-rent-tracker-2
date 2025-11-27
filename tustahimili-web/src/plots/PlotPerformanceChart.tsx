import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function PlotPerformanceCharts() {
  const occupancyData = [
    { month: "Jan", occupied: 26 },
    { month: "Feb", occupied: 28 },
    { month: "Mar", occupied: 30 },
    { month: "Apr", occupied: 32 },
  ];

  const incomeData = [
    { month: "Jan", amount: 120000 },
    { month: "Feb", amount: 130000 },
    { month: "Mar", amount: 135000 },
    { month: "Apr", amount: 140000 },
  ];

  const pieData = [
    { name: "Occupied", value: 32 },
    { name: "Vacant", value: 8 },
  ];

  const colors = ["#2563eb", "#94a3b8"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Occupancy Over Time</h3>
        <LineChart width={330} height={220} data={occupancyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month"/>
          <YAxis/>
          <Tooltip />
          <Line type="monotone" dataKey="occupied" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Income Collection</h3>
        <BarChart width={330} height={220} data={incomeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month"/>
          <YAxis/>
          <Tooltip />
          <Bar dataKey="amount" fill="#2563eb" />
        </BarChart>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Occupancy Breakdown</h3>
        <PieChart width={330} height={230}>
          <Pie
            data={pieData}
            cx={150}
            cy={110}
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

    </div>
  );
}
