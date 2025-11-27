import { FaRegMoneyBillAlt, FaCalendarAlt } from "react-icons/fa";

export default function TenantDashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Rent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaRegMoneyBillAlt className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Current Rent Status</p>
            <p className="text-2xl font-bold">Paid</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaCalendarAlt className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Next Payment Due</p>
            <p className="text-2xl font-bold">Dec 5, 2025</p>
          </div>
        </div>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-gray-700 font-bold mb-4">Maintenance Requests</h2>
        <ul className="space-y-2 text-gray-600">
          <li>Request #1: Leaky faucet in kitchen – Pending</li>
          <li>Request #2: AC not cooling – Completed</li>
        </ul>
      </div>
    </div>
  );
}
