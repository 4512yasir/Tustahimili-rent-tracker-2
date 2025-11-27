import { useParams } from "wouter";
import { FaMapMarkerAlt, FaUserTie, FaHome, FaChartPie, FaMoneyBillWave } from "react-icons/fa";

export default function PlotDetails() {
  const { id } = useParams(); // plot id from URL

  // Temporary mock data (will be replaced with real API later)
  const plot = {
    id,
    name: "Greenwood Estate Plot A",
    location: "Nairobi, Kenya",
    units: 24,
    occupiedUnits: 18,
    manager: "John Doe",
    revenue: "KES 240,000",
    performance: 82, // %
    vacancyRate: 25, // %
    assignedTo: "Agent Kamau",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Section */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:w-1/3">
          <img
            src={plot.image}
            alt="Plot"
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-blue-700">{plot.name}</h2>

          <div className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt /> {plot.location}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <FaHome className="text-blue-600 text-xl mb-2" />
              <p className="text-sm text-gray-600">Total Units</p>
              <p className="text-xl font-semibold">{plot.units}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <FaHome className="text-green-600 text-xl mb-2" />
              <p className="text-sm text-gray-600">Occupied Units</p>
              <p className="text-xl font-semibold">{plot.occupiedUnits}</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl">
              <FaMoneyBillWave className="text-purple-600 text-xl mb-2" />
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-xl font-semibold">{plot.revenue}</p>
            </div>

            <div className="p-4 bg-orange-50 rounded-xl">
              <FaChartPie className="text-orange-600 text-xl mb-2" />
              <p className="text-sm text-gray-600">Performance</p>
              <p className="text-xl font-semibold">{plot.performance}%</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-xl flex items-center gap-3">
            <FaUserTie className="text-gray-700 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Assigned To</p>
              <p className="text-lg font-semibold">{plot.assignedTo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vacancy Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Occupancy Chart
          </h3>

          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">
              <svg width="160" height="160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#3b82f6"
                  strokeWidth="16"
                  strokeDasharray={`${plot.performance * 4.4} 440`}
                  strokeLinecap="round"
                  fill="none"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {plot.performance}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Snapshot */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Revenue Snapshot
          </h3>

          <div className="text-center space-y-2">
            <p className="text-gray-600">Total Monthly Revenue</p>
            <p className="text-3xl font-bold text-green-600">{plot.revenue}</p>
          </div>

          <div className="mt-6 h-2 bg-green-100 rounded-xl overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${plot.performance}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
