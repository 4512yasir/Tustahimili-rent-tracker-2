import { FaHome, FaDollarSign, FaClipboardList } from "react-icons/fa";

export default function AgentDashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaHome className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Assigned Properties</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaDollarSign className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Pending Rent</p>
            <p className="text-2xl font-bold">$3,500</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <FaClipboardList className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Maintenance Tasks</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-gray-700 font-bold mb-4">Recent Activities</h2>
        <ul className="space-y-2 text-gray-600">
          <li>Collected rent from John Doe</li>
          <li>Scheduled repair for Apartment 102</li>
          <li>Updated tenant records</li>
        </ul>
      </div>
    </div>
  );
}
