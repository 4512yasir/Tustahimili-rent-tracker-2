import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar, { type Role } from "./sidebar";
import { FaUserCircle } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "../dashboard/AdminDashboard";
import AgentDashboard from "../dashboard/AgentDashboard";
import TenantDashboard from "../dashboard/TenantDashboard";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tenants": "Tenants",
  "/rent-tracking": "Rent Tracking",
  "/repairs": "Repairs",
  "/analytics": "Analytics",
  "/security": "Security",
  "/plots": "Plots",
};

type DashboardLayoutProps = {
  role: Role;
  content?: React.ReactNode;
};

export default function DashboardLayout({ role, content }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Track collapse
  const currentBreadcrumb = breadcrumbMap[location] || "Dashboard";

  const renderDashboard = () => {
    if (content) return content;

    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "agent":
        return <AgentDashboard />;
      case "tenant":
        return <TenantDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role={role} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "256px", // Match sidebar width
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="text-gray-600 font-medium">{currentBreadcrumb}</div>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-gray-700 font-medium">Hello, {role}</span>
            <FaUserCircle className="text-2xl text-gray-500" />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4">{renderDashboard()}</main>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
