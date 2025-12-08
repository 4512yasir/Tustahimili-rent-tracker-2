import { Router, Route } from "wouter";
import { useUser } from "@/context/useUser";
import type { Role } from "./type";

// Public Pages
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/registerpage";
import LoginPage from "./components/LoginPage";
import FeaturesPage from "./components/faeturepage";
import AboutPage from "./components/AboutPage";

// Layout & Auth
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Dashboard Pages
import AdminPlots from "./plots/AdminPlot";
import AgentPlots from "./plots/AgentPlot";
import PlotPerformance from "./plots/PlotPerformance";
import TenantPage from "./Tenants/TenantPage";
import RentTracking from "./Rent/Renttracking";
import RepairPage from "./Repair/RepairPage";

/* ---------------- DASHBOARD WRAPPERS ---------------- */

interface DashboardWrapperProps {
  content?: React.ReactNode;
}



/* ---------------- WRAPPERS ---------------- */

const RepairWrapper: React.FC = () => {
  const { user } = useUser();
  if (!user) return null;
  return <DashboardLayout role={user.role as Role} content={<RepairPage />} />;
};

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ content }) => {
  const { user } = useUser();
  if (!user) return null;
  return <DashboardLayout role={user.role as Role} content={content} />;
};

const PlotsWrapper: React.FC = () => {
  const { user } = useUser();
  if (!user) return null;

  const content = user.role === "admin" ? <AdminPlots /> : <AgentPlots />;
  return <DashboardLayout role={user.role as Role} content={content} />;
};

const TenantsWrapper: React.FC = () => {
  const { user } = useUser();
  if (!user) return null;
  return <DashboardLayout role={user.role as Role} content={<TenantPage />} />;
};

const RentTrackingWrapper: React.FC = () => {
  const { user } = useUser();
  if (!user) return null;
  return <DashboardLayout role={user.role as Role} content={<RentTracking />} />;
};

const PlotPerformanceWrapper: React.FC = () => {
  const { user } = useUser();
  if (!user) return null;
  return <DashboardLayout role={user.role as Role} content={<PlotPerformance role={user.role as Role} />} />;
};

/* ---------------- ROUTES ---------------- */

export default function App() {
  return (
    <Router>
      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/" component={LandingPage} />
      <Route path="/get-started" component={RegisterPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/login" component={LoginPage} />

      {/* ---------- DASHBOARD ROUTES ---------- */}
      <Route
        path="/dashboard"
        component={() => (
          <ProtectedRoute>
            <DashboardWrapper />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/tenants"
        component={() => (
          <ProtectedRoute>
            <TenantsWrapper />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/plots"
        component={() => (
          <ProtectedRoute>
            <PlotsWrapper />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/plot/:id"
        component={() => (
          <ProtectedRoute>
            <PlotPerformanceWrapper />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/rent-tracking"
        component={() => (
          <ProtectedRoute>
            <RentTrackingWrapper />
          </ProtectedRoute>
        )}
      />

       <Route
        path="/repairs"
        component={() => (
          <ProtectedRoute>
            <RepairWrapper />
          </ProtectedRoute>
        )}
      />

      {/* ---------- COMING SOON ---------- */}
      {["/repairs", "/analytics", "/security"].map((path) => (
        <Route
          key={path}
          path={path}
          component={() => (
            <ProtectedRoute>
              <DashboardWrapper />
            </ProtectedRoute>
          )}
        />
      ))}
    </Router>
  );
}
