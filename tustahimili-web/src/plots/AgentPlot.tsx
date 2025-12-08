import { Link } from "wouter";
import { useState } from "react";
import { FiHome, FiUsers, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

type Plot = {
  id: number;
  name: string;
  location: string;
  totalUnits: number;
  occupiedUnits: number;
};

export default function AgentPlots() {
  const [plots] = useState<Plot[]>([
    { id: 1, name: "Sunshine Apartments", location: "Kasarani", totalUnits: 40, occupiedUnits: 32 },
    { id: 2, name: "GreenView Estate", location: "Ruaka", totalUnits: 25, occupiedUnits: 21 },
    { id: 3, name: "Riverside Villas", location: "Ruiru", totalUnits: 30, occupiedUnits: 30 },
  ]);

  const [search, setSearch] = useState("");

  const filteredPlots = plots.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnits = plots.reduce((sum, p) => sum + p.totalUnits, 0);
  const totalOccupied = plots.reduce((sum, p) => sum + p.occupiedUnits, 0);
  const totalVacant = totalUnits - totalOccupied;

  const colors = [
    "from-indigo-500 to-indigo-700",
    "from-green-400 to-green-600",
    "from-yellow-400 to-yellow-600",
  ];

  const getOccupancyColor = (percent: number) =>
    percent < 50 ? "bg-red-400" : percent < 80 ? "bg-yellow-400" : "bg-green-500";

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-700">My Assigned Plots</h1>
          <p className="text-sm text-slate-500">Overview of properties under your management</p>
        </div>
        <input
          type="text"
          placeholder="Search plots..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 sm:mt-0 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-2xl transition">
          <div className="p-3 bg-indigo-100 text-indigo-700 rounded-full">
            <FiHome size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Assigned Plots</p>
            <p className="text-2xl font-bold text-gray-800">{plots.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-2xl transition">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Units</p>
            <p className="text-2xl font-bold text-gray-800">{totalUnits}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-2xl transition">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Occupied Units</p>
            <p className="text-2xl font-bold text-gray-800">{totalOccupied}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-2xl transition">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <FiAlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Vacant Units</p>
            <p className="text-2xl font-bold text-gray-800">{totalVacant}</p>
          </div>
        </div>
      </div>

      {/* Plot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlots.map((plot, idx) => {
          const occupancy = Math.round((plot.occupiedUnits / plot.totalUnits) * 100);
          const color = getOccupancyColor(occupancy);
          const gradient = colors[idx % colors.length];

          return (
            <div
              key={plot.id}
              className={`relative bg-gradient-to-r ${gradient} text-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform p-6 flex flex-col justify-between`}
            >
              {/* Decorative Circles */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-30 bg-white blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-20 bg-white blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-xl font-bold">{plot.name}</h2>
                <p className="text-sm">{plot.location}</p>

                <div className="mt-4 space-y-1 text-white/90">
                  <p>Total Units: <span className="font-semibold">{plot.totalUnits}</span></p>
                  <p>Occupied Units: <span className="font-semibold">{plot.occupiedUnits}</span></p>
                  <p>Vacant Units: <span className="font-semibold">{plot.totalUnits - plot.occupiedUnits}</span></p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold mb-1">Occupancy</p>
                  <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${occupancy}%` }} />
                  </div>
                  <p className="mt-1 text-xs font-semibold">{occupancy}%</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                <Link
                  href={`/plot/${plot.id}`}
                  className="px-4 py-2 bg-white text-gray-800 rounded-xl hover:bg-gray-100 transition flex-1 text-center text-sm font-semibold"
                >
                  View Performance
                </Link>
                <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition flex-1 text-center text-sm">
                  Add Tenant
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition flex-1 text-center text-sm">
                  Send Reminder
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
