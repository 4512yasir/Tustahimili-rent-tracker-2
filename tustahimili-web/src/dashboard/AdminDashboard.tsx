import { FaUsers, FaMoneyBillWave, FaTools, FaChartLine } from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Tenants", value: 120, icon: <FaUsers className="text-white w-8 h-8" />, gradient: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { title: "Total Rent Collected", value: "$15,000", icon: <FaMoneyBillWave className="text-white w-8 h-8" />, gradient: "bg-gradient-to-r from-green-500 to-green-700" },
    { title: "Pending Repairs", value: 8, icon: <FaTools className="text-white w-8 h-8" />, gradient: "bg-gradient-to-r from-yellow-400 to-yellow-600" },
    { title: "Monthly Growth", value: "12%", icon: <FaChartLine className="text-white w-8 h-8" />, gradient: "bg-gradient-to-r from-purple-500 to-purple-700" },
  ];

  const recentPayments = [
    { tenant: "John Doe", property: "Apartment 101", amount: "$500", status: "Paid" },
    { tenant: "Jane Smith", property: "Apartment 102", amount: "$600", status: "Pending" },
    { tenant: "Ali Khan", property: "Apartment 103", amount: "$450", status: "Paid" },
    { tenant: "Mary Lee", property: "Apartment 104", amount: "$700", status: "Pending" },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`relative overflow-hidden rounded-3xl shadow-lg transform hover:scale-105 transition cursor-pointer ${stat.gradient} text-white`}>
            {/* Decorative Blur */}
            <div className="absolute inset-0 opacity-20 blur-3xl -z-0"></div>

            <div className="relative p-6 flex flex-col justify-between gap-4 z-10">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{stat.title}</div>
                <div className="p-2 bg-white bg-opacity-30 rounded-full">{stat.icon}</div>
              </div>
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="w-full h-2 bg-white bg-opacity-40 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-gray-700 font-bold mb-4 text-xl">Recent Payments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-sm uppercase">
                <th className="p-3">Tenant</th>
                <th className="p-3">Property</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, idx) => (
                <tr key={idx} className="bg-gray-50 hover:bg-gray-100 transition rounded-lg">
                  <td className="p-3 font-medium">{payment.tenant}</td>
                  <td className="p-3">{payment.property}</td>
                  <td className="p-3">{payment.amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${payment.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
