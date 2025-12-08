import { useRoute } from "wouter";
import { useState, useMemo } from "react";
import { FiUsers, FiHome, FiDollarSign, FiAlertCircle } from "react-icons/fi";
import type { Role } from "../type"; // centralized type

interface Tenant {
  id: string;
  name: string;
  phone: string;
  paid: boolean;
}

interface Plot {
  id: number;
  name: string;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRent: number;
  tenants: Tenant[];
}

interface Props {
  role: Role;
}

// Dummy data
const PLOTS: Plot[] = [
  {
    id: 1,
    name: "Sunshine Apartments",
    totalUnits: 40,
    occupiedUnits: 32,
    monthlyRent: 320000,
    tenants: [
      { id: "t1", name: "John Doe", phone: "0712000001", paid: true },
      { id: "t2", name: "Mary Jane", phone: "0712000002", paid: false },
    ],
  },
  {
    id: 2,
    name: "GreenView Estate",
    totalUnits: 25,
    occupiedUnits: 21,
    monthlyRent: 250000,
    tenants: [
      { id: "t3", name: "Ali Hassan", phone: "0712000003", paid: true },
    ],
  },
];

export default function PlotPerformance({ role }: Props) {
  const [, params] = useRoute("/plot/:id");
  const [detailsVisible, setDetailsVisible] = useState(true);

  const plotId = Number(params?.id);
  const plot = useMemo(() => PLOTS.find(p => p.id === plotId), [plotId]);

  if (!plot) return <p className="p-8 text-red-600 font-semibold">Plot not found</p>;

  const vacantUnits = plot.totalUnits - plot.occupiedUnits;
  const unpaidTenants = plot.tenants.filter(t => !t.paid);

  const cardData = [
    {
      title: "Occupancy Rate",
      value: `${Math.round((plot.occupiedUnits / plot.totalUnits) * 100)}%`,
      icon: <FiHome className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-indigo-500 to-indigo-700",
    },
    {
      title: "Active Tenants",
      value: plot.occupiedUnits,
      icon: <FiUsers className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      title: "Outstanding Rent",
      value: `KES ${plot.monthlyRent.toLocaleString()}`,
      icon: <FiDollarSign className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-extrabold text-indigo-700">{plot.name} Performance</h1>
        <button
          onClick={() => history.back()}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
        >
          ← Back
        </button>
      </div>

      {/* Alerts */}
      <div className="flex gap-2 flex-wrap">
        {vacantUnits > 0 && (
          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <FiAlertCircle /> Vacancies
          </div>
        )}
        {unpaidTenants.length > 0 && (
          <div className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <FiAlertCircle /> Unpaid Rent
          </div>
        )}
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cardData.map((card, idx) => (
          <div key={idx} className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer">
            <div className={`absolute inset-0 ${card.gradient} opacity-20 blur-2xl -z-0`} />
            <div className="relative p-6 flex flex-col space-y-4 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-slate-500 font-medium">{card.title}</h2>
                <div className="p-2 bg-white rounded-full shadow">{card.icon}</div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Details */}
      <button
        onClick={() => setDetailsVisible(!detailsVisible)}
        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 transition"
      >
        {detailsVisible ? "Hide Details" : "Show Details"}
      </button>

      {/* Details Section */}
      {detailsVisible && (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition space-y-6">
          {/* Plot Info */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-700">
            <li className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition">
              <span className="font-semibold">Total Units:</span> {plot.totalUnits}
            </li>
            <li className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition">
              <span className="font-semibold">Monthly Rent:</span> KES {plot.monthlyRent.toLocaleString()}
            </li>
            <li className="bg-yellow-50 p-4 rounded-lg hover:bg-yellow-100 transition">
              <span className="font-semibold">Vacant Units:</span> {vacantUnits}
            </li>
          </ul>

          {/* Recent Tenants */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Recent Tenants</h3>
            {plot.tenants.length === 0 ? (
              <p className="italic text-gray-400">No tenants in this plot</p>
            ) : (
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {plot.tenants.map(t => (
                  <div key={t.id} className="border p-3 rounded-lg bg-white shadow-sm flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-gray-500">📞 {t.phone}</p>
                    </div>
                    {!t.paid && (
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Unpaid
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mt-6">
        {role === "admin" && (
          <>
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl hover:scale-105 transform transition">
              Collect Rent
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:scale-105 transform transition">
              Add Tenant
            </button>
          </>
        )}
        <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl hover:scale-105 transform transition">
          Send Reminder
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-xl hover:scale-105 transform transition">
          View Contracts
        </button>
      </div>
    </div>
  );
}
