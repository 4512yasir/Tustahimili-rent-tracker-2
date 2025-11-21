import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  FaHome,
  FaUsers,
  FaDollarSign,
  FaTools,
  FaChartLine,
  FaShieldAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

type SidebarProps = {
  role: "admin" | "agent" | "tenant";
};

type MenuItem = {
  name: string;
  path: string;
  icon: JSX.Element;
  roles: ("admin" | "agent" | "tenant")[];
};

const allMenuItems: MenuItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome />, roles: ["admin", "agent", "tenant"] },
  { name: "Tenants", path: "/tenants", icon: <FaUsers />, roles: ["admin", "agent"] },
  { name: "Rent Tracking", path: "/rent-tracking", icon: <FaDollarSign />, roles: ["admin", "agent"] },
  { name: "Repairs", path: "/repairs", icon: <FaTools />, roles: ["admin", "agent"] },
  { name: "Analytics", path: "/analytics", icon: <FaChartLine />, roles: ["admin"] },
  { name: "Security", path: "/security", icon: <FaShieldAlt />, roles: ["admin"] },
];

export default function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [location] = useLocation();

  const menuItems = allMenuItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300
          ${collapsed ? "w-20" : "w-64"} 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header / Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          {!collapsed && <span className="text-lg font-bold text-blue-700">Tustahimili</span>}
          <button
            className="text-gray-700 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded transition-colors
                ${location === item.path ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="absolute bottom-4 w-full flex justify-center">
          <button
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? ">" : "<"}
          </button>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-gray-700 hover:text-blue-600"
        onClick={() => setMobileOpen(true)}
      >
        <FaBars />
      </button>
    </>
  );
}
