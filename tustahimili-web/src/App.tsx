import { Router, Route } from "wouter";
import { Toaster } from "react-hot-toast";

import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import FeaturesPage from "./components/faeturepage";
import RegisterPage from "./components/registerpage";
import LoginPage from "./components/LoginPage";

export default function App() {
  return (
    <>
      {/* 🔥 GLOBAL TOASTER (works for every page) */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "15px",
          },
        }}
      />

      <Router>
        <Route path="/">
          <LandingPage />
        </Route>

        <Route path="/about">
          <AboutPage />
        </Route>

        <Route path="/features">
          <FeaturesPage />
        </Route>

        <Route path="/get-started">
          <RegisterPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>
      </Router>
    </>
  );
}
