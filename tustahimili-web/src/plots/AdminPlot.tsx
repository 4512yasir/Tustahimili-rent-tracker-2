import { useMemo, useState } from "react";
import { Link } from "wouter";
import AddPlotModal from "./AddplotModal";
import AssignAgentModal from "./AssignAgentModal";

type Plot = {
  id: number;
  name: string;
  location: string;
  totalUnits: number;
  occupiedUnits: number;
  agent: string | null;
  price?: number;
};

type Tenant = {
  id: string;
  name: string;
  phone: string;
  plotId: number;
  paid: boolean;
};

const PLOTS: Plot[] = [
  { id: 1, name: "Green Estate", location: "Nairobi", totalUnits: 20, occupiedUnits: 17, agent: "John Doe", price: 5000 },
  { id: 2, name: "Sunset Homes", location: "Mombasa", totalUnits: 15, occupiedUnits: 12, agent: null, price: 4500 },
  { id: 3, name: "Riverfront Villas", location: "Kisumu", totalUnits: 25, occupiedUnits: 20, agent: "Alice Kim", price: 6000 },
];

const TENANTS: Tenant[] = [
  { id: "t1", name: "John Tenant", phone: "0712000001", plotId: 1, paid: true },
  { id: "t2", name: "Mary Tenant", phone: "0712000002", plotId: 1, paid: false },
  { id: "t3", name: "Ali Tenant", phone: "0712000003", plotId: 2, paid: true },
  { id: "t4", name: "Sarah Tenant", phone: "0712000004", plotId: 3, paid: true },
];

export default function AdminPlots() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [openPlotId, setOpenPlotId] = useState<number | null>(null);

  const plotsWithTenants = useMemo(() => {
    return PLOTS.map(plot => ({
      ...plot,
      tenants: TENANTS.filter(t => t.plotId === plot.id),
    }));
  }, []);

  const totalUnits = useMemo(() => PLOTS.reduce((sum, p) => sum + p.totalUnits, 0), []);
  const occupiedUnits = useMemo(() => PLOTS.reduce((sum, p) => sum + p.occupiedUnits, 0), []);

  const plotCardStyles = [
    "from-indigo-400 to-indigo-600",
    "from-green-400 to-green-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-600",
    "from-purple-400 to-purple-600",
  ];

  const exportCSV = () => {
    const rows = plotsWithTenants.map(p => [
      p.name,
      p.location,
      p.agent ?? "Unassigned",
      p.totalUnits,
      p.occupiedUnits,
      p.tenants.map(t => t.name).join("; "),
    ]);
    const csv = [
      "Plot,Location,Agent,Total Units,Occupied Units,Tenants",
      ...rows.map(r => r.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "plots-report.csv";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-extrabold text-indigo-700">Plot Management Dashboard</h1>
        <div className="flex gap-2 flex-wrap">
          <button onClick={exportCSV} className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white shadow-lg">
            Export CSV
          </button>
          <button onClick={() => setShowAddModal(true)} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white shadow-lg">
            + Add Plot
          </button>
        </div>
      </div>

      {/* PERFORMANCE SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition">
          <h2 className="text-lg font-semibold">Total Plots</h2>
          <p className="text-3xl font-bold">{PLOTS.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition">
          <h2 className="text-lg font-semibold">Total Units</h2>
          <p className="text-3xl font-bold">{totalUnits}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition">
          <h2 className="text-lg font-semibold">Occupied Units</h2>
          <p className="text-3xl font-bold">{occupiedUnits}</p>
        </div>
      </div>

      {/* PLOT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plotsWithTenants.map((plot, index) => {
          const occupancy = Math.round((plot.occupiedUnits / plot.totalUnits) * 100);
          const hasVacancy = plot.occupiedUnits < plot.totalUnits;
          const hasUnpaid = plot.tenants.some(t => !t.paid);
          const gradient = plotCardStyles[index % plotCardStyles.length];

          return (
            <div key={plot.id} className={`relative rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 flex flex-col gap-4 bg-gradient-to-tr ${gradient} text-white`}>
              
              {/* ALERT BADGES */}
              {(hasVacancy || hasUnpaid) && (
                <div className="absolute top-4 right-4 flex flex-col gap-1">
                  {hasVacancy && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Vacancy</span>}
                  {hasUnpaid && <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">Unpaid</span>}
                </div>
              )}

              <h2 className="text-xl font-bold">{plot.name}</h2>
              <p className="text-sm">{plot.location}</p>
              <p className="font-medium">Agent: {plot.agent ?? "Unassigned"}</p>

              {/* OCCUPANCY BAR */}
              <div className="mt-2 bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${occupancy < 50 ? "bg-red-400" : occupancy < 80 ? "bg-yellow-300" : "bg-green-300"}`}
                  style={{ width: `${occupancy}%` }}
                />
              </div>
              <p className="text-xs mt-1 font-semibold">{occupancy}% Occupancy</p>

              {/* TENANTS */}
              {plot.tenants.length > 0 && (
                <div className="mt-3">
                  <button
                    className="text-white underline text-sm"
                    onClick={() => setOpenPlotId(openPlotId === plot.id ? null : plot.id)}
                  >
                    {openPlotId === plot.id ? "Hide Tenants" : `View Tenants (${plot.tenants.length})`}
                  </button>
                  {openPlotId === plot.id && (
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {plot.tenants.map(t => (
                        <div
                          key={t.id}
                          className={`p-3 rounded-lg flex justify-between items-center ${t.paid ? "bg-white bg-opacity-20" : "bg-red-500 bg-opacity-40"}`}
                        >
                          <div>
                            <p className="font-semibold">{t.name}</p>
                            <p className="text-xs">📞 {t.phone}</p>
                          </div>
                          {!t.paid && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Unpaid</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-3">
                <Link
                  href={`/plot/${plot.id}`}
                  className="flex-1 bg-white bg-opacity-30 text-white px-3 py-2 rounded-xl text-center hover:bg-opacity-50 transition"
                >
                  View Performance
                </Link>
                <button
                  onClick={() => { setSelectedPlot(plot); setShowAssignModal(true); }}
                  className="flex-1 bg-green-500 bg-opacity-80 text-white px-3 py-2 rounded-xl hover:bg-opacity-100 transition"
                >
                  Assign Agent
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODALS */}
      {showAddModal && <AddPlotModal onClose={() => setShowAddModal(false)} />}
      {showAssignModal && selectedPlot && <AssignAgentModal plot={selectedPlot} onClose={() => setShowAssignModal(false)} />}
    </div>
  );
}
