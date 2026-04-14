// Profile.jsx
import { useState } from "react";
import { useApp }   from "../context/AppContext";
import { getTheme } from "../data/constants";
import { Avatar }   from "./Avatar";

export default function Profile({ user, onLogout }) {
  const { dark, setActiveNav } = useApp();
  const T = getTheme(dark);
  const [open, setOpen] = useState(false);

  const name  = user?.name  || "User";
  const email = user?.email || "";

  const MENU_ITEMS = [
    { label: "Profile",       icon: "👤", danger: false, action: "settings" },
    { label: "Preferences",   icon: "🎨", danger: false, action: "settings" },
    { label: "Team Settings", icon: "👥", danger: false, action: "settings" },
    { label: "Sign out",      icon: "🚪", danger: true,  action: "logout"   },
  ];

  function handleItem(item) {
    setOpen(false);
    if (item.action === "logout") {
      onLogout?.();
    } else if (item.action === "settings") {
      setActiveNav("settings");
    }
  }

  return (
    <div className="relative">
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        className={`flex items-center gap-1.5 p-1 pr-2 rounded-xl transition-colors ${
          dark ? "hover:bg-white/10" : "hover:bg-slate-100"}`}>
        <Avatar name={name} />
        <svg viewBox="0 0 20 20" fill="currentColor"
          className={`w-3.5 h-3.5 transition-transform hidden sm:block ${T.txtMut} ${open ? "rotate-180" : ""}`}>
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      {open && (
        <div onClick={e => e.stopPropagation()}
          className={`absolute right-0 top-12 w-56 rounded-2xl shadow-2xl border z-50 overflow-hidden ${T.dropBg}`}>

          <div className={`px-4 py-3 border-b ${T.brdCls}`}>
            <div className="flex items-center gap-3">
              <Avatar name={name} />
              <div className="min-w-0">
                <p className={`text-sm font-bold truncate ${T.dropHead}`}>{name}</p>
                <p className={`text-xs truncate ${T.dropSub}`}>{email}</p>
              </div>
            </div>
          </div>

          {MENU_ITEMS.map((item, i) => (
            <button key={i} onClick={() => handleItem(item)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors border-b last:border-0 flex items-center gap-2.5 ${T.brdCls} ${
                item.danger ? "text-rose-500 hover:bg-rose-500/10" : T.dropItem}`}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}