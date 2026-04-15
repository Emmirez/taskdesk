//  Header.jsx  –  top bar
import { useApp } from "../context/AppContext";
import { getTheme } from "../data/constants";
import Notification from "./Notification";
import Profile from "./Profile";

export default function Header({ user, onLogout }) {
  const {
    dark,
    setDark,
    search,
    setSearch,
    setModal,
    setMobileNav,
    mobileNav,
  } = useApp();
  const T = getTheme(dark);

  return (
    <header
      className={`h-16 flex items-center gap-3 px-4 sm:px-6 border-b ${T.brdCls} ${T.headBg} backdrop-blur-xl flex-shrink-0 relative z-30`}
    >
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileNav(!mobileNav)}
        className={`md:hidden flex-shrink-0 p-2 rounded-xl transition-colors ${
          dark
            ? "hover:bg-white/8 text-slate-300"
            : "hover:bg-slate-100 text-slate-600"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xs">
        <div className="relative">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${T.txtMut}`}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className={`w-full border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 transition-all ${
              dark
                ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:ring-violet-500 focus:border-violet-500"
                : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-violet-500 focus:border-violet-500"
            }`}
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 ml-auto">
        {/* New Task */}
        <button
          onClick={() => setModal("new")}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 px-3 py-2 rounded-xl text-sm font-semibold text-white transition-colors shadow-md shadow-violet-500/25"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:inline">New Task</span>
        </button>

        {/* Dark / Light toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          title={dark ? "Switch to Light mode" : "Switch to Dark mode"}
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors flex-shrink-0 ${
            dark
              ? "hover:bg-white/8 text-amber-300"
              : "hover:bg-slate-100 text-slate-500"
          }`}
        >
          {dark ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <Notification />
        <Profile user={user} onLogout={onLogout} />
      </div>
    </header>
  );
}
