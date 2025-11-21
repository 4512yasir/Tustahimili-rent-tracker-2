// import { useState } from "react";
import { Route, Router, useLocation } from "wouter";
import Sidebar from "./sidebar";
import { FaUserCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

// Dummy Pages
const DashboardHome = () => <div className="p-6 text-gray-700">Welcome to your Dashboard</div>;
const TenantsPage = () => <div className="p-6 text-gray-700">Tenants Page</div>;
const RentTrackingPage = () => <div className="p-6 text-gray-700">Rent Tracking Page</div>;
const RepairsPage = () => <div className="p-6 text-gray-700">Repairs Page</div>;
const AnalyticsPage = () => <div className="p-6 text-gray-700">Analytics Page</div>;
const SecurityPage = () => <div className="p-6 text-gray-700">Security Page</div>;

// Breadcrumb mapping
const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Home",
  "/tenants": "Tenants",
  "/rent-tracking": "Rent Tracking",
  "/repairs": "Repairs",
  "/analytics": "Analytics",
  "/security": "Security",
};

type DashboardLayoutProps = {
  role: "admin" | "agent" | "tenant";
};

export default function DashboardLayout({ role }: DashboardLayoutProps) {
  const [location] = useLocation();
  const currentBreadcrumb = breadcrumbMap[location] || "Dashboard";

  const handleToast = () => {
    toast.success("This is a toast notification!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="text-gray-600 font-medium">{currentBreadcrumb}</div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToast}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Show Toast
            </button>
            <span className="hidden md:block text-gray-700 font-medium">Hello, User</span>
            <FaUserCircle className="text-2xl text-gray-500" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Router>
            <Route path="/dashboard" component={DashboardHome} />
            <Route path="/tenants" component={TenantsPage} />
            <Route path="/rent-tracking" component={RentTrackingPage} />
            <Route path="/repairs" component={RepairsPage} />
            <Route path="/analytics" component={AnalyticsPage} />
            <Route path="/security" component={SecurityPage} />
          </Router>
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
