import { useState } from "react";
import StatsCard from "../components/StatsCard"; // Make sure StatsCard is correctly exported from this path
import AddPlotModal from "./AddplotModal";
import AssignAgentModal from "./AssignAgentModal";

type Plot = {
  id: number;
  name: string;
  location: string;
  totalUnits: number;
  occupiedUnits: number;
  agent: string | null;
};

export default function AdminPlots() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const plots: Plot[] = [
    {
      id: 1,
      name: "Green Estate",
      location: "Nairobi",
      totalUnits: 20,
      occupiedUnits: 17,
      agent: "John Doe",
    },
    {
      id: 2,
      name: "Sunset Homes",
      location: "Mombasa",
      totalUnits: 15,
      occupiedUnits: 12,
      agent: null,
    },
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">All Plots</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Plot
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Plots" value={plots.length} />
        <StatsCard
          title="Total Units"
          value={plots.reduce((acc, plot) => acc + plot.totalUnits, 0)}
        />
        <StatsCard
          title="Occupied Units"
          value={plots.reduce((acc, plot) => acc + plot.occupiedUnits, 0)}
        />
      </div>

      {/* Table */}
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Plot</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Units</th>
            <th className="p-3 text-left">Agent</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {plots.map((plot) => (
            <tr key={plot.id} className="border-b">
              <td className="p-3">{plot.name}</td>
              <td className="p-3">{plot.location}</td>
              <td className="p-3">
                {plot.occupiedUnits}/{plot.totalUnits}
              </td>
              <td className="p-3">{plot.agent ?? "Unassigned"}</td>
              <td className="p-3">
                <button
                  onClick={() => {
                    setSelectedPlot(plot);
                    setShowAssignModal(true);
                  }}
                  className="bg-gray-800 text-white px-3 py-1 rounded-md"
                >
                  Assign Agent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {showAddModal && <AddPlotModal onClose={() => setShowAddModal(false)} />}
      {showAssignModal && selectedPlot && (
        <AssignAgentModal
          plot={selectedPlot}
          onClose={() => setShowAssignModal(false)}
        />
      )}
    </div>
  );
}
