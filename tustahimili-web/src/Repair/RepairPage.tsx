import { useState, useMemo } from "react";
import { useUser } from "@/context/useUser";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

/* ---------------- TYPES ---------------- */
export type RepairStatus = "Pending" | "In Progress" | "Completed";

export type Repair = {
  id: string;
  tenantName: string;
  plotName: string;
  issue: string;
  assignedAgentId?: number;
  status: RepairStatus;
  createdAt: string;
};

/* ---------------- MOCK DATA ---------------- */
const MOCK_REPAIRS: Repair[] = [
  {
    id: "r1",
    tenantName: "John Doe",
    plotName: "Green Estate",
    issue: "Leaky faucet",
    assignedAgentId: 2,
    status: "Pending",
    createdAt: "2024-12-01",
  },
  {
    id: "r2",
    tenantName: "Mary Jane",
    plotName: "Blue Heights",
    issue: "Broken window",
    assignedAgentId: 3,
    status: "In Progress",
    createdAt: "2024-12-03",
  },
  {
    id: "r3",
    tenantName: "Ali Hassan",
    plotName: "Green Estate",
    issue: "Clogged drain",
    assignedAgentId: 2,
    status: "Completed",
    createdAt: "2024-11-28",
  },
];

/* ---------------- STATUS COLOR & PROGRESS ---------------- */
const statusMap: Record<
  RepairStatus,
  { bg: string; progress: number }
> = {
  Pending: { bg: "bg-yellow-400", progress: 33 },
  "In Progress": { bg: "bg-blue-500", progress: 66 },
  Completed: { bg: "bg-green-500", progress: 100 },
};

/* ---------------- REPAIR CARD ---------------- */
function RepairCard({
  repair,
  onUpdateStatus,
}: {
  repair: Repair;
  onUpdateStatus?: (id: string, status: RepairStatus) => void;
}) {
  const status = statusMap[repair.status];

  return (
    <div className="p-4 rounded-xl border shadow-md flex flex-col justify-between relative bg-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{repair.issue}</h3>
        <span className="text-sm font-medium">{repair.status}</span>
      </div>
      <p className="text-sm text-gray-700 mb-2">
        Tenant: {repair.tenantName} <br />
        Plot: {repair.plotName} <br />
        Created: {repair.createdAt}
      </p>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
        <motion.div
          className={`${status.bg} h-2`}
          initial={{ width: 0 }}
          animate={{ width: `${status.progress}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {onUpdateStatus && repair.status !== "Completed" && (
        <button
          onClick={() =>
            onUpdateStatus(
              repair.id,
              repair.status === "Pending" ? "In Progress" : "Completed"
            )
          }
          className="mt-2 px-3 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
        >
          Update Status
        </button>
      )}
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */
export default function RepairPage() {
  const { user } = useUser();
  const [repairs, setRepairs] = useState<Repair[]>(MOCK_REPAIRS);

  const [newRepair, setNewRepair] = useState<Omit<Repair, "id" | "status" | "createdAt">>({
    tenantName: "",
    plotName: "",
    issue: "",
    assignedAgentId: undefined,
  });

  const [showModal, setShowModal] = useState(false);

  /* ---------------- VISIBLE REPAIRS ---------------- */
  const visibleRepairs = useMemo(() => {
    if (!user) return [];
    if (user.role === "admin") return repairs;
    if (user.role === "agent") return repairs.filter(r => r.assignedAgentId === user.id);
    return repairs.filter(r => r.tenantName === user.name);
  }, [repairs, user]);

  /* ---------------- ACTIONS ---------------- */
  const handleAddRepair = () => {
    if (!newRepair.issue || !newRepair.plotName || !newRepair.tenantName) return;

    const repair: Repair = {
      ...newRepair,
      id: crypto.randomUUID(),
      status: "Pending",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setRepairs(prev => [...prev, repair]);
    setShowModal(false);
    setNewRepair({
      tenantName: "",
      plotName: "",
      issue: "",
      assignedAgentId: undefined,
    });
  };

  const handleUpdateStatus = (id: string, status: RepairStatus) => {
    setRepairs(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  if (!user) return null;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-700">Repair Requests</h1>

      {/* ADD REPAIR BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          <FaPlus /> Add Repair
        </button>
      </div>

      {/* REPAIR GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {visibleRepairs.map(r => (
          <RepairCard
            key={r.id}
            repair={r}
            onUpdateStatus={user.role !== "tenant" ? handleUpdateStatus : undefined}
          />
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-[380px] space-y-3">
            <h3 className="font-bold text-lg">Add Repair</h3>

            {user.role === "tenant" && (
              <input
                className="border p-2 w-full"
                placeholder="Tenant name"
                value={newRepair.tenantName}
                onChange={e => setNewRepair({ ...newRepair, tenantName: e.target.value })}
              />
            )}

            <input
              className="border p-2 w-full"
              placeholder="Plot name"
              value={newRepair.plotName}
              onChange={e => setNewRepair({ ...newRepair, plotName: e.target.value })}
            />

            <input
              className="border p-2 w-full"
              placeholder="Issue description"
              value={newRepair.issue}
              onChange={e => setNewRepair({ ...newRepair, issue: e.target.value })}
            />

            {(user.role === "admin" || user.role === "agent") && (
              <input
                type="number"
                className="border p-2 w-full"
                placeholder="Assign Agent ID"
                value={newRepair.assignedAgentId || ""}
                onChange={e =>
                  setNewRepair({ ...newRepair, assignedAgentId: Number(e.target.value) })
                }
              />
            )}

            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">
                Cancel
              </button>
              <button onClick={handleAddRepair} className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
