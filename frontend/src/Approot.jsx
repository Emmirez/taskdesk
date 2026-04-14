// AppRoot.jsx
import { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import App from "./App";
import LandingPage from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import FeaturesPage from "./pages/FeaturePage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";

function getResetToken() {
  const match = window.location.pathname.match(/^\/reset-password\/(.+)$/);
  return match ? match[1] : null;
}

function ScreenRouter() {
  const resetToken = getResetToken();

  // Use dark from AppContext so landing + dashboard share the same state
  const { dark, setDark } = useApp();
  const toggleDark = () => setDark((d) => !d);
  const T = { dark, toggleDark };

  const [screen, setScreen] = useState(resetToken ? "reset" : "landing");
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setChecking(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setUser(d.user);
        else localStorage.removeItem("accessToken");
      })
      .catch(() => localStorage.removeItem("accessToken"))
      .finally(() => setChecking(false));
  }, []);

  function handleLogout() {
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    localStorage.removeItem("accessToken");
    setUser(null);
    setScreen("landing");
  }

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: dark ? "#0e1017" : "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          className="w-8 h-8 animate-spin"
          style={{ color: "#7c3aed" }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  if (screen === "reset") {
    return (
      <ResetPassword
        {...T}
        token={resetToken}
        onGoLogin={() => {
          window.history.replaceState({}, "", "/");
          setScreen("login");
        }}
      />
    );
  }

  if (user) return <App user={user} onLogout={handleLogout} />;

  switch (screen) {
    case "login":
      return (
        <Login
          {...T}
          onLogin={(u) => setUser(u)}
          onGoRegister={() => setScreen("register")}
          onGoLanding={() => setScreen("landing")}
          onGoForgot={() => setScreen("forgot")}
        />
      );
    case "register":
      return (
        <Register
          {...T}
          onRegister={(u) => setUser(u)}
          onGoLogin={() => setScreen("login")}
          onGoLanding={() => setScreen("landing")}
        />
      );
    case "forgot":
      return (
        <ForgotPassword
          {...T}
          onGoLogin={() => setScreen("login")}
          onGoLanding={() => setScreen("landing")}
        />
      );
    case "features":
      return (
        <FeaturesPage
          {...T}
          onBack={() => setScreen("landing")}
          onGoRegister={() => setScreen("register")}
        />
      );
    case "pricing":
      return (
        <PricingPage
          {...T}
          onBack={() => setScreen("landing")}
          onGoRegister={() => setScreen("register")}
        />
      );
    case "blog":
      return (
        <BlogPage
          {...T}
          onBack={() => setScreen("landing")}
          onGoRegister={() => setScreen("register")}
        />
      );
    case "about":
      return (
        <AboutPage
          {...T}
          onBack={() => setScreen("landing")}
          onGoRegister={() => setScreen("register")}
        />
      );
    default:
      return (
        <LandingPage
          {...T}
          onGoLogin={() => setScreen("login")}
          onGoRegister={() => setScreen("register")}
          onGoPage={(p) => setScreen(p)}
        />
      );
  }
}

export default function AppRoot() {
  return (
    <AppProvider>
      <ScreenRouter />
    </AppProvider>
  );
}
