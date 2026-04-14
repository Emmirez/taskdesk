// src/AppRoot.jsx
import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import App from "./App";
import LandingPage from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FeaturesPage from "./pages/FeaturePage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";

function ScreenRouter() {
  const { dark, setDark, user, authLoading } = useApp();
  const [screen, setScreen] = useState("landing");

  const toggleDark = () => setDark((d) => !d);
  const goPage = (p) => setScreen(p);
  const goBack = () => setScreen("landing");
  const goLogin = () => setScreen("login");
  const goRegister = () => setScreen("register");

  // Show nothing while checking existing session
  if (authLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${dark ? "bg-[#0e1017]" : "bg-slate-100"}`}
      >
        <svg
          className="w-8 h-8 animate-spin text-violet-500"
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

  // Already logged in — go straight to app
  if (user) return <App />;

  const themeProps = { dark, toggleDark };

  switch (screen) {
    case "landing":
      return (
        <LandingPage
          {...themeProps}
          onGoLogin={goLogin}
          onGoRegister={goRegister}
          onGoPage={goPage}
        />
      );
    case "login":
      return (
        <Login {...themeProps} onGoRegister={goRegister} onGoLanding={goBack} />
      );
    case "register":
      return (
        <Register {...themeProps} onGoLogin={goLogin} onGoLanding={goBack} />
      );
    case "features":
      return (
        <FeaturesPage
          {...themeProps}
          onBack={goBack}
          onGoRegister={goRegister}
        />
      );
    case "pricing":
      return (
        <PricingPage
          {...themeProps}
          onBack={goBack}
          onGoRegister={goRegister}
        />
      );
    case "blog":
      return (
        <BlogPage {...themeProps} onBack={goBack} onGoRegister={goRegister} />
      );
    case "about":
      return (
        <AboutPage {...themeProps} onBack={goBack} onGoRegister={goRegister} />
      );
    default:
      return (
        <LandingPage
          {...themeProps}
          onGoLogin={goLogin}
          onGoRegister={goRegister}
          onGoPage={goPage}
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
