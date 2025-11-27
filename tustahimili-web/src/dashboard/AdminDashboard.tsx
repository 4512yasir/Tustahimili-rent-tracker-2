import { FaUsers, FaMoneyBillWave, FaTools, FaChartLine } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaUsers className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Tenants</p>
            <p className="text-2xl font-bold">120</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaMoneyBillWave className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Rent Collected</p>
            <p className="text-2xl font-bold">$15,000</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaTools className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Pending Repairs</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaChartLine className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Monthly Growth</p>
            <p className="text-2xl font-bold">12%</p>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-gray-700 font-bold mb-4">Recent Payments</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="p-2">Tenant</th>
              <th className="p-2">Property</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">John Doe</td>
              <td className="p-2">Apartment 101</td>
              <td className="p-2">$500</td>
              <td className="p-2 text-green-600 font-semibold">Paid</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Jane Smith</td>
              <td className="p-2">Apartment 102</td>
              <td className="p-2">$600</td>
              <td className="p-2 text-red-600 font-semibold">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
