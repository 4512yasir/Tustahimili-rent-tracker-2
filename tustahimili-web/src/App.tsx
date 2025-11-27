import { Router, Route } from "wouter";
import { UserProvider } from "@/context/userProvider";
import { useUser } from "@/context/useUser";

import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/registerpage";
import LoginPage from "./components/LoginPage";
import FeaturesPage from "./components/faeturepage";
import AboutPage from "./components/AboutPage";

import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Plot pages
import AdminPlots from "./plots/AdminPlot";
import AgentPlots from "./plots/AgentPlot";
import PlotPerformance from "./plots/PlotPerformance";

// Wrapper so dashboard gets the logged-in user's role
function DashboardWrapper() {
  const { user } = useUser();
  if (!user) return null;

  return <DashboardLayout role={user.role} />;
}

// Wrapper for plots to render inside dashboard layout
function PlotsWrapper() {
  const { user } = useUser();
  if (!user) return null;

  const content = user.role === "admin" ? <AdminPlots /> : <AgentPlots />;

  return <DashboardLayout role={user.role} content={content} />;
}

// Wrapper for plot performance
function PlotPerformanceWrapper({ params }: { params: { id: string } }) {
  const { user } = useUser();
  if (!user) return null;

  return (
    <DashboardLayout
      role={user.role}
      content={<PlotPerformance params={params} />}
    />
  );
}

const dashboardRoutes = [
  "/dashboard",
  "/tenants",
  "/rent-tracking",
  "/repairs",
  "/analytics",
  "/security",
];

export default function App() {
  return (
    <UserProvider>
      <Router>
        {/* Public Routes */}
        <Route path="/" component={LandingPage} />
        <Route path="/get-started" component={RegisterPage} />
        <Route path="/features" component={FeaturesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={LoginPage} />

        {/* Dashboard Routes */}
        {dashboardRoutes.map((path) => (
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

        {/* Plots */}
        <Route
          path="/plots"
          component={() => (
            <ProtectedRoute>
              <PlotsWrapper />
            </ProtectedRoute>
          )}
        />

        {/* Plot performance */}
        <Route
          path="/plot/:id"
          component={({ params }) => (
            <ProtectedRoute>
              <PlotPerformanceWrapper params={params} />
            </ProtectedRoute>
          )}
        />
      </Router>
    </UserProvider>
  );
}
