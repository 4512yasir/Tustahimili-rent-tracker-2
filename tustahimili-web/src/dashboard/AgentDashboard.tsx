import { FaHome, FaDollarSign, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AgentDashboard() {
  const stats = [
    {
      title: "Assigned Properties",
      value: 12,
      icon: <FaHome className="text-blue-500 text-3xl" />,
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "Pending Rent",
      value: "$3,500",
      icon: <FaDollarSign className="text-green-500 text-3xl" />,
      bg: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "Maintenance Tasks",
      value: 5,
      icon: <FaClipboardList className="text-yellow-500 text-3xl" />,
      bg: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    },
  ];

  const activities = [
    "Collected rent from John Doe",
    "Scheduled repair for Apartment 102",
    "Updated tenant records",
    "Checked tenant inquiries",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-gray-700 font-bold mb-4 text-xl">Recent Activities</h2>
        <ul className="space-y-2 text-gray-600">
          {activities.map((activity, idx) => (
            <motion.li
              key={idx}
              whileHover={{ x: 5, scale: 1.02 }}
              className="p-2 rounded hover:bg-gray-50 transition-all duration-200"
            >
              {activity}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
