// SidebarContent.jsx
import { useApp } from "../context/AppContext";
import { getTheme, NAV } from "../data/constants";
import { Avatar } from "./Avatar";

export default function SidebarContent({ user, onLogout }) {
  const { dark, activeNav, setActiveNav, tasks, setMobileNav, accent } =
    useApp();
  const T = getTheme(dark);

  function navClick(id) {
    setActiveNav(id);
    setMobileNav(false);
  }

  const pendingCount = tasks.filter((t) => t.status !== "completed").length;

  return (
    <>
      {/* Logo + mobile close */}
      <div
        className={`h-16 flex items-center px-5 border-b ${T.brdCls} gap-3 flex-shrink-0`}
      >
        <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span
          className={`font-bold text-base tracking-tight flex-1 ${T.txtPri}`}
        >
          TaskFlow
        </span>

        {/* Close button — mobile only */}
        <button
          onClick={() => setMobileNav(false)}
          className={`md:hidden w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
            dark
              ? "hover:bg-white/10 text-slate-400"
              : "hover:bg-slate-100 text-slate-500"
          }`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => navClick(n.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeNav === n.id ? "" : T.navIdle
            }`}
            style={
              activeNav === n.id
                ? {
                    background: `${accent}22`,
                    color: accent,
                    border: `1px solid ${accent}40`,
                  }
                : {}
            }
          >
            <span className="flex-shrink-0">{n.icon}</span>
            <span>{n.label}</span>
            {n.id === "tasks" && (
              <span className="ml-auto text-xs bg-violet-500/20 text-violet-300 rounded-full px-2 py-0.5 font-semibold">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* User row + logout */}
      <div className={`p-3 border-t ${T.brdCls} flex-shrink-0`}>
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${dark ? "hover:bg-white/6" : "hover:bg-slate-100"}`}
        >
          <Avatar name={user?.name || "User"} />
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-semibold truncate ${T.txtPri}`}>
              {user?.name || "User"}
            </p>
            <p className={`text-xs truncate ${T.txtMut}`}>
              {user?.email || ""}
            </p>
          </div>
          <span
            className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"
            title="Online"
          />
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className={`w-full mt-1 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-rose-500 hover:bg-rose-500/10`}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Sign out
        </button>
      </div>
    </>
  );
}
