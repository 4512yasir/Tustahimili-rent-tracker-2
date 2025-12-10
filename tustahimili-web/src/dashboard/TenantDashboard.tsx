import { FaRegMoneyBillAlt, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TenantDashboard() {
  const stats = [
    {
      title: "Current Rent Status",
      value: "Paid",
      icon: <FaRegMoneyBillAlt className="text-green-500 text-3xl" />,
      bg: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "Next Payment Due",
      value: "Dec 5, 2025",
      icon: <FaCalendarAlt className="text-blue-500 text-3xl" />,
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
  ];

  const requests = [
    { title: "Leaky faucet in kitchen", status: "Pending" },
    { title: "AC not cooling", status: "Completed" },
    { title: "Door lock replacement", status: "In Progress" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Rent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-5 flex items-center gap-4 shadow-lg ${stat.bg}`}
          >
            {stat.icon}
            <div>
              <p className="text-gray-500 font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-gray-700 font-bold mb-4 text-xl">Maintenance Requests</h2>
        <ul className="space-y-3">
          {requests.map((req, idx) => (
            <motion.li
              key={idx}
              whileHover={{ x: 5, scale: 1.02 }}
              className="flex justify-between p-3 rounded hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-gray-600">{req.title}</span>
              <span
                className={`font-semibold ${
                  req.status === "Completed"
                    ? "text-green-500"
                    : req.status === "Pending"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              >
                {req.status}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
