// Notification.jsx
import { useState, useMemo } from "react";
import { createPortal }  from "react-dom";
import { useApp }   from "../context/AppContext";
import { getTheme } from "../data/constants";

function buildNotifications(tasks) {
  const today    = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const notifs   = [];

  tasks.forEach(t => {
    const due = t.due ? new Date(t.due) : null;
    if (due) due.setHours(0,0,0,0);

    if (t.status === "completed") {
      notifs.push({ id: `done-${t.id}`,     icon: "✅", msg: `"${t.title}" marked as completed`, time: "Recent",        type: "completed"  });
    } else if (due && due < today) {
      notifs.push({ id: `overdue-${t.id}`,  icon: "🔴", msg: `"${t.title}" is overdue`,          time: `Due ${t.due}`,  type: "overdue"    });
    } else if (due && due.getTime() === today.getTime()) {
      notifs.push({ id: `today-${t.id}`,    icon: "⚠️", msg: `"${t.title}" is due today`,        time: "Due today",     type: "due-today"  });
    } else if (due && due.getTime() === tomorrow.getTime()) {
      notifs.push({ id: `tomorrow-${t.id}`, icon: "📅", msg: `"${t.title}" is due tomorrow`,     time: "Due tomorrow",  type: "due-soon"   });
    }
  });

  const order = { overdue: 0, "due-today": 1, "due-soon": 2, completed: 3 };
  return notifs.sort((a, b) => (order[a.type] ?? 9) - (order[b.type] ?? 9));
}

const typeColor = {
  overdue:    "text-rose-500",
  "due-today":"text-amber-500",
  "due-soon": "text-blue-400",
  completed:  "text-emerald-500",
};

const typeLabel = {
  overdue:    "Overdue",
  "due-today":"Due Today",
  "due-soon": "Due Soon",
  completed:  "Completed",
};

function NotifItem({ n, isRead, onRead, T, dark }) {
  return (
    <div onClick={() => onRead(n.id)}
      className={`px-4 py-3 border-b last:border-0 cursor-pointer transition-colors ${T.brdCls} ${T.dropItem} ${!isRead ? (dark ? "bg-white/3" : "bg-violet-50/60") : ""}`}>
      <div className="flex gap-3 items-start">
        <span className="text-base leading-none mt-0.5 flex-shrink-0">{n.icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold leading-snug ${typeColor[n.type] || T.txtPri}`}>{n.msg}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className={`text-xs ${T.dropSub}`}>{n.time}</p>
            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${typeColor[n.type]}`}
              style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}>
              {typeLabel[n.type]}
            </span>
          </div>
        </div>
        {!isRead && (
          <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: "var(--accent, #7c3aed)" }} />
        )}
      </div>
    </div>
  );
}

export default function Notification() {
  const { dark, tasks } = useApp();
  const T = getTheme(dark);
  const [open,    setOpen]    = useState(false);
  const [drawer,  setDrawer]  = useState(false);
  const [readIds, setReadIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("notif-read") || "[]")); }
    catch { return new Set(); }
  });

  const notifs = useMemo(() => buildNotifications(tasks), [tasks]);
  const unread = notifs.filter(n => !readIds.has(n.id)).length;
  const preview = notifs.slice(0, 5);

  function markRead(id) {
    const next = new Set(readIds); next.add(id);
    setReadIds(next);
    localStorage.setItem("notif-read", JSON.stringify([...next]));
  }

  function markAllRead() {
    const all = new Set(notifs.map(n => n.id));
    setReadIds(all);
    localStorage.setItem("notif-read", JSON.stringify([...all]));
  }

  function openDrawer() {
    setOpen(false);
    setDrawer(true);
  }

  return (
    <>
      {/* Bell button */}
      <div className="relative">
        <button onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
          className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors flex-shrink-0 ${
            dark ? "hover:bg-white/10 text-slate-300 hover:text-white"
                 : "hover:bg-slate-100 text-slate-500 hover:text-slate-800"}`}>
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-2.83-2h5.66A3 3 0 0110 18z"/>
          </svg>
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2"
              style={{ borderColor: dark ? "#0e1017" : "#fff" }} />
          )}
        </button>

        {/* Dropdown preview */}
        {open && (
          <div onClick={e => e.stopPropagation()}
            className={`absolute right-0 top-12 w-80 rounded-2xl shadow-2xl border z-50 overflow-hidden ${T.dropBg}`}>

            <div className={`px-4 py-3 border-b flex items-center justify-between ${T.brdCls}`}>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${T.dropHead}`}>Notifications</span>
                {unread > 0 && (
                  <span className="text-xs bg-rose-500 text-white rounded-full px-1.5 py-0.5 font-bold">{unread}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs font-semibold transition-colors"
                    style={{ color: "var(--accent, #7c3aed)" }}>
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)}
                  className={`w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${
                    dark ? "hover:bg-white/10 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              {notifs.length === 0 ? (
                <div className={`px-4 py-8 text-center text-sm ${T.txtMut}`}>
                  <div className="text-2xl mb-2">🎉</div>
                  All caught up! No pending tasks.
                </div>
              ) : (
                preview.map(n => (
                  <NotifItem key={n.id} n={n} isRead={readIds.has(n.id)} onRead={markRead} T={T} dark={dark} />
                ))
              )}
            </div>

            {notifs.length > 0 && (
              <div className={`px-4 py-2.5 border-t flex items-center justify-between ${T.brdCls}`}>
                <button onClick={openDrawer} className="text-xs font-semibold transition-colors"
                  style={{ color: "var(--accent, #7c3aed)" }}>
                  View all ({notifs.length})
                </button>
                <button onClick={() => { markAllRead(); setOpen(false); }}
                  className={`text-xs font-semibold transition-colors ${dark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}>
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drawer — rendered in document.body via portal to escape overflow-hidden */}
      {drawer && createPortal(
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawer(false)} />

          {/* Drawer panel */}
          <div className={`relative z-10 w-full max-w-sm h-full flex flex-col shadow-2xl ${dark ? "bg-[#111320]" : "bg-white"}`}
            style={{ borderLeft: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0" }}>

            {/* Drawer header */}
            <div className={`px-5 py-4 border-b flex items-center justify-between flex-shrink-0 ${T.brdCls}`}>
              <div className="flex items-center gap-2">
                <span className={`text-base font-bold ${T.txtPri}`}>All Notifications</span>
                {unread > 0 && (
                  <span className="text-xs bg-rose-500 text-white rounded-full px-1.5 py-0.5 font-bold">{unread}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs font-semibold"
                    style={{ color: "var(--accent, #7c3aed)" }}>
                    Mark all read
                  </button>
                )}
                <button onClick={() => setDrawer(false)}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl transition-colors ${
                    dark ? "hover:bg-white/10 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Drawer content */}
            <div className="flex-1 overflow-y-auto">
              {notifs.length === 0 ? (
                <div className={`px-5 py-16 text-center ${T.txtMut}`}>
                  <div className="text-4xl mb-3">🎉</div>
                  <p className="font-semibold text-sm mb-1">All caught up!</p>
                  <p className="text-xs">No overdue or upcoming tasks.</p>
                </div>
              ) : (
                <>
                  {/* Group by type */}
                  {["overdue", "due-today", "due-soon", "completed"].map(type => {
                    const group = notifs.filter(n => n.type === type);
                    if (!group.length) return null;
                    return (
                      <div key={type}>
                        <div className={`px-5 py-2 text-xs font-bold uppercase tracking-wider ${T.txtMut}`}
                          style={{ background: dark ? "rgba(255,255,255,0.02)" : "#f8fafc" }}>
                          {typeLabel[type]}
                        </div>
                        {group.map(n => (
                          <NotifItem key={n.id} n={n} isRead={readIds.has(n.id)} onRead={markRead} T={T} dark={dark} />
                        ))}
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Drawer footer */}
            {notifs.length > 0 && (
              <div className={`px-5 py-4 border-t flex-shrink-0 ${T.brdCls}`}>
                <button onClick={() => { markAllRead(); setDrawer(false); }}
                  className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors ${
                    dark ? "bg-white/8 hover:bg-white/12 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}>
                  Clear all notifications
                </button>
              </div>
            )}
          </div>
        </div>
      , document.body)}
    </>
  );
}