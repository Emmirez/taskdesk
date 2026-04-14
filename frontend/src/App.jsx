//  App.jsx  –  root layout
import { useEffect } from "react";
import { useApp } from "./context/AppContext";
import { getTheme } from "./data/constants";
import Header from "./components/Header";
import SidebarContent from "./components/SidebarContent";
import TaskModal from "./components/TaskModal";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

function PageRouter({ user }) {
  const { activeNav } = useApp();
  switch (activeNav) {
    case "dashboard":
      return <Dashboard user={user} />;
    case "tasks":
      return <Kanban />;
    case "projects":
      return <Projects />;
    case "calendar":
      return <Calendar />;
    case "settings":
      return <Settings user={user} />;
    default:
      return <Dashboard user={user} />;
  }
}

export default function App({ user, onLogout }) {
  const { dark, modal, mobileNav, closeAll, fetchTasks, accent } = useApp();
  const T = getTheme(dark);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className={`flex h-screen ${T.appBg} overflow-hidden`}
      style={{
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        "--accent": accent,
        "--accent-20": accent + "33",
        "--accent-40": accent + "66",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        *,:before,:after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ffffff22; border-radius: 99px; }
        .drop-active { background: rgba(139,92,246,0.12) !important; border-color: rgba(139,92,246,0.5) !important; }
        select option { background: #1e2235; color: #fff; }
        .accent-btn { background: var(--accent) !important; }
        .accent-ring { outline: 2px solid var(--accent) !important; }
        .accent-text { color: var(--accent) !important; }
      `}</style>

      {/* Mobile drawer */}
      {mobileNav && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeAll}
          />
          <div
            className={`relative z-50 w-64 h-full flex flex-col shadow-2xl ${T.sideBg}`}
          >
            <SidebarContent user={user} onLogout={onLogout} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex w-56 flex-shrink-0 flex-col border-r ${T.sideBg} ${T.brdCls}`}
      >
        <SidebarContent user={user} onLogout={onLogout} />
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto" onClick={closeAll}>
          <PageRouter user={user} />
        </main>
      </div>

      {/* Task modal */}
      {modal && <TaskModal />}
    </div>
  );
}
