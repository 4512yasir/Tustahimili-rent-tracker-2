import { useState, type ReactNode } from "react";
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

export type Role = "admin" | "agent" | "tenant";

type SidebarProps = {
  role: Role;
  userName?: string;
  collapsed?: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
};

type MenuItem = {
  name: string;
  path: string;
  icon: ReactNode;
  roles: Role[];
};

const allMenuItems: MenuItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome />, roles: ["admin", "agent", "tenant"] },
  { name: "Plot Management", path: "/plots", icon: <FaHome />, roles: ["admin", "agent"] },
  { name: "Tenants", path: "/tenants", icon: <FaUsers />, roles: ["admin", "agent"] },
  { name: "Rent Tracking", path: "/rent-tracking", icon: <FaDollarSign />, roles: ["admin", "agent", "tenant"] },
  { name: "Repairs", path: "/repairs", icon: <FaTools />, roles: ["admin", "agent", "tenant"] },
  { name: "Analytics", path: "/analytics", icon: <FaChartLine />, roles: ["admin"] },
  { name: "Security", path: "/security", icon: <FaShieldAlt />, roles: ["admin"] },
];

export default function Sidebar({
  role,
  userName,
  collapsed: collapsedProp,
  setCollapsed: setCollapsedProp,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(collapsedProp ?? false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const menuItems = allMenuItems.filter((item) => item.roles.includes(role));

  const toggleCollapse = () => {
    if (setCollapsedProp && typeof collapsedProp === "boolean") {
      setCollapsedProp(!collapsedProp);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-blue-700">Tustahimili</span>
              {userName && <span className="text-sm text-gray-600">Hello, {userName}</span>}
            </div>
          )}
          <button
            className="text-gray-700 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle sidebar"
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
                ${location === item.path
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Collapse button */}
        <div className="absolute bottom-4 w-full flex justify-center">
          {!mobileOpen && (
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={toggleCollapse}
              aria-label="Collapse sidebar"
            >
              {collapsed ? ">" : "<"}
            </button>
          )}
        </div>
      </aside>

      {/* Mobile hamburger button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-gray-700 hover:text-blue-600"
        onClick={() => setMobileOpen(true)}
      >
        <FaBars />
      </button>
    </>
  );
}
