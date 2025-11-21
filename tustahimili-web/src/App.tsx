import React from "react";
import { Router, Route } from "wouter";
import { UserProvider, useUser } from "./context/usecontext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/registerpage";
import DashboardLayout from "./components/DashboardLayout";
import LandingPage from "./components/LandingPage";

// Protected route wrapper
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useUser();
  if (!user) {
    window.location.href = "/login";
    return null;
  }
  return children;
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Route path="/" component={LandingPage} />
        <Route path="/get-started" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route
          path="/dashboard"
          component={() => (
            <ProtectedRoute>
              <DashboardLayout role={useUser().user!.role} />
            </ProtectedRoute>
          )}
        />
      </Router>
    </UserProvider>
  );
}
