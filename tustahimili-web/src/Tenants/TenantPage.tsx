import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaHome, FaPlus } from "react-icons/fa";

/* ---------------- TYPES ---------------- */
export type PaymentStatus = "Paid" | "Partial" | "Unpaid";

export type PaymentHistory = {
  month: string;
  amount: number;
  status: PaymentStatus;
};

export type Tenant = {
  id: number;
  name: string;
  phone: string;
  plot: string;
  agentId: number;
  totalPaid: number;
  arrears: number;
  history: PaymentHistory[];
  active: boolean;
};

/* ---------------- MOCK DATA ---------------- */
const MOCK_TENANTS: Tenant[] = [
  {
    id: 1,
    name: "Ali Mohamed",
    phone: "0712345678",
    plot: "Sunset Court",
    agentId: 2,
    totalPaid: 25000,
    arrears: 0,
    active: true,
    history: [
      { month: "June", amount: 12000, status: "Paid" },
      { month: "July", amount: 13000, status: "Paid" },
    ],
  },
  {
    id: 2,
    name: "Jane Wambui",
    phone: "0722999922",
    plot: "Blue Heights",
    agentId: 3,
    totalPaid: 15000,
    arrears: 7000,
    active: true,
    history: [
      { month: "June", amount: 8000, status: "Partial" },
      { month: "July", amount: 7000, status: "Paid" },
    ],
  },
  {
    id: 3,
    name: "Brian Otieno",
    phone: "0700112233",
    plot: "Sunset Court",
    agentId: 2,
    totalPaid: 24000,
    arrears: 2000,
    active: true,
    history: [
      { month: "June", amount: 12000, status: "Paid" },
      { month: "July", amount: 10000, status: "Partial" },
    ],
  },
];

/* ---------------- UTILS ---------------- */
// Gradient colors per plot for variety
const plotGradients: Record<string, string> = {
  "Sunset Court": "from-pink-500 to-purple-600",
  "Blue Heights": "from-blue-400 to-indigo-600",
  "default": "from-gray-400 to-gray-600",
};

/* ---------------- TENANT CARD ---------------- */
function TenantCard({
  tenant,
  onAddPayment,
  onVacate,
}: {
  tenant: Tenant;
  onAddPayment: (id: number, amt: number) => void;
  onVacate?: (id: number) => void;
}) {
  const [amt, setAmt] = useState("");

  // Use gradient based on plot
  const gradient = plotGradients[tenant.plot] || plotGradients["default"];

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      className={`relative rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-r ${gradient} overflow-hidden`}
    >
      {/* Overlay for texture */}
      <div className="absolute inset-0 opacity-20 bg-white/10 -z-0 rounded-3xl" />

      {/* Top badge */}
      {tenant.arrears > 0 && (
        <span className="absolute right-4 top-4 rounded-full bg-white/30 text-white text-xs px-3 py-1 font-semibold backdrop-blur-sm">
          Owing
        </span>
      )}

      {/* Name & Status */}
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg drop-shadow-md">{tenant.name}</h3>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            tenant.active ? "bg-white/30 text-white" : "bg-gray-700/50 text-gray-200"
          } backdrop-blur-sm`}
        >
          {tenant.active ? "Active" : "Vacated"}
        </span>
      </div>

      {/* Tenant info */}
      <div className="space-y-1 text-sm drop-shadow-md mt-2">
        <p className="flex items-center gap-2">
          <FaPhone /> {tenant.phone}
        </p>
        <p className="flex items-center gap-2">
          <FaHome /> {tenant.plot}
        </p>
        <p>
          Paid: <span className="font-semibold">{tenant.totalPaid.toLocaleString()} KES</span>
        </p>
        <p>
          Arrears: <span className="font-semibold">{tenant.arrears.toLocaleString()} KES</span>
        </p>
      </div>

      {/* Payment history */}
      <div className="border-t border-white/30 pt-2 text-xs space-y-1 drop-shadow-md">
        {tenant.history.map((h, i) => (
          <div key={i} className="flex justify-between">
            <span>{h.month}</span>
            <span>{h.amount.toLocaleString()}</span>
            <span
              className={
                h.status === "Paid" ? "text-green-200" : h.status === "Partial" ? "text-yellow-200" : "text-red-200"
              }
            >
              {h.status}
            </span>
          </div>
        ))}
      </div>

      {/* Payment input & button */}
      {tenant.active && (
        <div className="flex gap-2 pt-3">
          <input
            className="border rounded-lg px-3 py-1 w-full text-black"
            placeholder="KES"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
          />
          <button
            onClick={() => {
              if (!amt) return;
              onAddPayment(tenant.id, Number(amt));
              setAmt("");
            }}
            className="bg-white/80 hover:bg-white rounded-lg text-indigo-700 px-4 font-semibold transition"
          >
            <FaPlus />
          </button>
        </div>
      )}

      {/* Vacate button */}
      {tenant.active && onVacate && (
        <button
          onClick={() => onVacate(tenant.id)}
          className="text-sm underline mt-2 text-white/90 hover:text-white transition"
        >
          Vacate tenant
        </button>
      )}
    </motion.div>
  );
}

/* ---------------- MAIN TENANT PAGE ---------------- */
export default function TenantPage() {
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);

  const [search, setSearch] = useState("");
  const [plotFilter, setPlotFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [arrearsFilter, setArrearsFilter] = useState("all");

  /* ---------------- FILTERS ---------------- */
  const visible = useMemo(() => {
    return tenants
      .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.phone.includes(search))
      .filter((t) => plotFilter === "all" || t.plot === plotFilter)
      .filter((t) => statusFilter === "all" || (statusFilter === "active" ? t.active : !t.active))
      .filter((t) => arrearsFilter === "all" || (arrearsFilter === "owing" ? t.arrears > 0 : t.arrears === 0));
  }, [tenants, search, plotFilter, statusFilter, arrearsFilter]);

  const allPlots = useMemo(() => Array.from(new Set(tenants.map((t) => t.plot))), [tenants]);

  /* ---------------- ACTIONS ---------------- */
  const addPayment = (id: number, amount: number) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id !== id
          ? t
          : {
              ...t,
              totalPaid: t.totalPaid + amount,
              arrears: Math.max(t.arrears - amount, 0),
              history: [
                ...t.history,
                {
                  month: new Date().toLocaleString("default", { month: "short" }),
                  amount,
                  status: t.arrears - amount <= 0 ? "Paid" : "Partial",
                },
              ],
            }
      )
    );
  };

  const vacateTenant = (id: number) =>
    setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, active: false } : t)));

  /* ---------------- UI ---------------- */
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700">Tenant Performance</h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl shadow">
        <input
          className="border px-4 py-2 rounded-xl w-full sm:w-auto"
          placeholder="Search name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-xl"
          value={plotFilter}
          onChange={(e) => setPlotFilter(e.target.value)}
        >
          <option value="all">All Plots</option>
          {allPlots.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded-xl"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="vacated">Vacated</option>
        </select>

        <select
          className="border px-4 py-2 rounded-xl"
          value={arrearsFilter}
          onChange={(e) => setArrearsFilter(e.target.value)}
        >
          <option value="all">All Arrears</option>
          <option value="owing">Owing</option>
          <option value="clean">No Arrears</option>
        </select>
      </div>

      {/* TENANT GRID */}
      <motion.div layout className="grid md:grid-cols-3 gap-6">
        <AnimatePresence>
          {visible.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onAddPayment={addPayment}
              onVacate={vacateTenant}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
