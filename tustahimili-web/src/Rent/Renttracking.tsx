import { useMemo, useState } from "react";
import { useUser } from "@/context/useUser";
import { FaDownload } from "react-icons/fa";

/* ================= TYPES ================= */
type Rent = {
  id: string;
  tenantName: string;
  payerId: string;
  plotId: string;
  plotName: string;
  amount: number;
  month: string;
  paidAt: string;
  mpesaRef: string;
  status: "Paid" | "Partial" | "Unpaid";
};

/* ================= MOCK DATA ================= */
const MOCK_RENTS: Rent[] = [
  {
    id: "1",
    tenantName: "John Doe",
    payerId: "tenant-1",
    plotId: "plot-1",
    plotName: "Green Estate",
    amount: 15000,
    month: "2024-11",
    paidAt: "2024-11-02",
    mpesaRef: "QWP123",
    status: "Paid",
  },
  {
    id: "2",
    tenantName: "Mary Jane",
    payerId: "tenant-2",
    plotId: "plot-2",
    plotName: "Blue Heights",
    amount: 18000,
    month: "2024-11",
    paidAt: "2024-11-05",
    mpesaRef: "XYZ987",
    status: "Partial",
  },
  {
    id: "3",
    tenantName: "Brian Otieno",
    payerId: "tenant-3",
    plotId: "plot-1",
    plotName: "Green Estate",
    amount: 12000,
    month: "2024-11",
    paidAt: "2024-11-07",
    mpesaRef: "ABC456",
    status: "Unpaid",
  },
];

/* ================= UTIL ================= */
const statusGradients: Record<Rent["status"], string> = {
  Paid: "from-green-400 to-green-600",
  Partial: "from-yellow-400 to-yellow-600",
  Unpaid: "from-red-400 to-red-600",
};

/* ================= COMPONENT ================= */
export default function RentTracking() {
  const { user } = useUser();

  const [rents, setRents] = useState<Rent[]>(MOCK_RENTS);
  const [showModal, setShowModal] = useState(false);

  const [filterPlot, setFilterPlot] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterTenant, setFilterTenant] = useState("");

  const [newRent, setNewRent] = useState<Omit<Rent, "id" | "paidAt">>({
    tenantName: "",
    payerId: "",
    plotId: "",
    plotName: "",
    amount: 0,
    month: "",
    mpesaRef: "",
    status: "Unpaid",
  });

  /* ================= ROLE FILTER ================= */
  const roleFilteredRents = useMemo(() => {
    if (!user) return [];
    if (user.role === "admin") return rents;
    if (user.role === "agent") return rents.filter(r => r.plotId.startsWith("plot"));
    return rents.filter(r => r.payerId === String(user.id));
  }, [rents, user]);

  /* ================= UI FILTER ================= */
  const visibleRents = useMemo(() => {
    return roleFilteredRents.filter(
      r =>
        (!filterPlot || r.plotName === filterPlot) &&
        (!filterMonth || r.month === filterMonth) &&
        (!filterTenant || r.tenantName === filterTenant)
    );
  }, [roleFilteredRents, filterPlot, filterMonth, filterTenant]);

  /* ================= TOTALS ================= */
  const totalPaid = useMemo(() => visibleRents.reduce((sum, r) => sum + r.amount, 0), [visibleRents]);
  const outstanding = useMemo(() => Math.max(50000 - totalPaid, 0), [totalPaid]);

  /* ================= DROPDOWNS ================= */
  const plotList = useMemo(() => [...new Set(rents.map(r => r.plotName))], [rents]);
  const tenantList = useMemo(() => [...new Set(rents.map(r => r.tenantName))], [rents]);

  /* ================= ADD RENT ================= */
  const handleAddRent = () => {
    if (!newRent.tenantName || !newRent.plotName || !newRent.month || newRent.amount <= 0) return;

    const rent: Rent = {
      ...newRent,
      id: crypto.randomUUID(),
      paidAt: new Date().toISOString().slice(0, 10),
      payerId: newRent.payerId || crypto.randomUUID(),
      plotId: newRent.plotId || crypto.randomUUID(),
    };

    setRents(prev => [...prev, rent]);
    setShowModal(false);
    setNewRent({
      tenantName: "",
      payerId: "",
      plotId: "",
      plotName: "",
      amount: 0,
      month: "",
      mpesaRef: "",
      status: "Unpaid",
    });
  };

  /* ================= RECEIPT ================= */
  const downloadReceipt = (r: Rent) => {
    const text = `
RENT RECEIPT
Tenant: ${r.tenantName}
Plot: ${r.plotName}
Month: ${r.month}
Amount: KES ${r.amount.toLocaleString()}
Date Paid: ${r.paidAt}
Mpesa Ref: ${r.mpesaRef}
Status: ${r.status}`;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `receipt-${r.tenantName}-${r.month}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (!user) return null;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-700">Rent Tracking</h1>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4">
        <select className="border p-2 rounded" value={filterPlot} onChange={e => setFilterPlot(e.target.value)}>
          <option value="">All Plots</option>
          {plotList.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="border p-2 rounded" value={filterTenant} onChange={e => setFilterTenant(e.target.value)}>
          <option value="">All Tenants</option>
          {tenantList.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input type="month" className="border p-2 rounded" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} />
      </div>

      {/* TOTALS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg">
          <p>Total Collected</p>
          <h2 className="text-xl font-bold">KES {totalPaid.toLocaleString()}</h2>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg">
          <p>Outstanding</p>
          <h2 className="text-xl font-bold">KES {outstanding.toLocaleString()}</h2>
        </div>
      </div>

      {/* RENT CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {visibleRents.map(r => (
          <div
            key={r.id}
            className={`relative p-5 rounded-3xl shadow-lg text-white bg-gradient-to-r ${statusGradients[r.status]} transform transition hover:scale-105`}
          >
            <div className="absolute inset-0 bg-white/10 rounded-3xl -z-0" />
            <h3 className="text-lg font-bold drop-shadow-md">{r.tenantName}</h3>
            <p className="drop-shadow-md">{r.plotName}</p>
            <p className="drop-shadow-md">Month: {r.month}</p>
            <p className="drop-shadow-md font-semibold">KES {r.amount.toLocaleString()}</p>
            <p className="drop-shadow-md text-sm">Mpesa Ref: {r.mpesaRef}</p>
            <p className="drop-shadow-md text-sm font-medium">Status: {r.status}</p>
            <button
              onClick={() => downloadReceipt(r)}
              className="absolute top-4 right-4 text-white/90 hover:text-white"
            >
              <FaDownload />
            </button>
          </div>
        ))}

        {visibleRents.length === 0 && (
          <div className="col-span-2 p-5 bg-gray-200 text-gray-600 rounded-xl text-center">
            No records found
          </div>
        )}
      </div>

      {/* ADD PAYMENT BUTTON */}
      {(user.role === "admin" || user.role === "agent") && (
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded shadow-lg">
          Add Payment
        </button>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-2xl w-[380px] space-y-3 shadow-lg">
            <h3 className="font-bold text-lg">Add Payment</h3>
            <input className="border p-2 w-full rounded" placeholder="Tenant name" value={newRent.tenantName} onChange={e => setNewRent({ ...newRent, tenantName: e.target.value })} />
            <input className="border p-2 w-full rounded" placeholder="Plot name" value={newRent.plotName} onChange={e => setNewRent({ ...newRent, plotName: e.target.value })} />
            <input type="number" className="border p-2 w-full rounded" value={newRent.amount} onChange={e => setNewRent({ ...newRent, amount: Number(e.target.value) })} />
            <input type="month" className="border p-2 w-full rounded" value={newRent.month} onChange={e => setNewRent({ ...newRent, month: e.target.value })} />
            <input className="border p-2 w-full rounded" placeholder="Mpesa Ref" value={newRent.mpesaRef} onChange={e => setNewRent({ ...newRent, mpesaRef: e.target.value })} />
            <select className="border p-2 w-full rounded" value={newRent.status} onChange={e => setNewRent({ ...newRent, status: e.target.value as Rent["status"] })}>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </select>
            <div className="flex justify-between mt-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">Cancel</button>
              <button onClick={handleAddRent} className="px-4 py-2 rounded bg-green-600 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
