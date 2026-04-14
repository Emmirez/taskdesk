//  constants.jsx  –  all shared data & config

export const initialTasks = [
  {
    id: 1,
    title: "Design new onboarding flow",
    priority: "high",
    due: "2026-03-20",
    status: "todo",
    project: "Product",
  },
  {
    id: 2,
    title: "Fix auth bug on mobile",
    priority: "high",
    due: "2026-03-18",
    status: "inprogress",
    project: "Engineering",
  },
  {
    id: 3,
    title: "Write Q1 performance report",
    priority: "medium",
    due: "2026-03-25",
    status: "todo",
    project: "Operations",
  },
  {
    id: 4,
    title: "Update API documentation",
    priority: "low",
    due: "2026-03-30",
    status: "inprogress",
    project: "Engineering",
  },
  {
    id: 5,
    title: "User research interviews",
    priority: "medium",
    due: "2026-03-22",
    status: "todo",
    project: "Product",
  },
  {
    id: 6,
    title: "Deploy staging environment",
    priority: "high",
    due: "2026-03-17",
    status: "completed",
    project: "Engineering",
  },
  {
    id: 7,
    title: "Redesign email templates",
    priority: "low",
    due: "2026-04-01",
    status: "completed",
    project: "Marketing",
  },
  {
    id: 8,
    title: "Competitor analysis report",
    priority: "medium",
    due: "2026-03-28",
    status: "completed",
    project: "Marketing",
  },
];

export const PRIORITY_META = {
  high: {
    label: "High",
    color: "text-rose-500",
    darkBg: "bg-rose-500/15 border-rose-500/40",
    lightBg: "bg-rose-100 border-rose-300 text-rose-600",
  },
  medium: {
    label: "Med",
    color: "text-amber-500",
    darkBg: "bg-amber-500/15 border-amber-500/40",
    lightBg: "bg-amber-100 border-amber-300 text-amber-600",
  },
  low: {
    label: "Low",
    color: "text-emerald-500",
    darkBg: "bg-emerald-500/15 border-emerald-500/40",
    lightBg: "bg-emerald-100 border-emerald-300 text-emerald-600",
  },
};

export const KANBAN_COLS = [
  {
    id: "todo",
    label: "To Do",
    dot: "bg-slate-400",
    darkCount: "bg-slate-700 text-slate-200",
    lightCount: "bg-slate-200 text-slate-700",
  },
  {
    id: "inprogress",
    label: "In Progress",
    dot: "bg-violet-500",
    darkCount: "bg-violet-500/30 text-violet-200",
    lightCount: "bg-violet-100 text-violet-700",
  },
  {
    id: "completed",
    label: "Completed",
    dot: "bg-emerald-500",
    darkCount: "bg-emerald-500/30 text-emerald-200",
    lightCount: "bg-emerald-100 text-emerald-700",
  },
];

export const PROJECTS = [
  {
    id: 1,
    name: "Product",
    color: "bg-violet-500",
    tasks: 3,
    done: 1,
    due: "2026-04-15",
  },
  {
    id: 2,
    name: "Engineering",
    color: "bg-cyan-500",
    tasks: 4,
    done: 2,
    due: "2026-04-01",
  },
  {
    id: 3,
    name: "Marketing",
    color: "bg-rose-500",
    tasks: 2,
    done: 2,
    due: "2026-03-31",
  },
  {
    id: 4,
    name: "Operations",
    color: "bg-amber-500",
    tasks: 1,
    done: 0,
    due: "2026-05-01",
  },
  {
    id: 5,
    name: "Design",
    color: "bg-emerald-500",
    tasks: 0,
    done: 0,
    due: "2026-05-15",
  },
];

export const NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm8-8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
      </svg>
    ),
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

// ── Build theme tokens from dark boolean ──────────────────────────
export function getTheme(dark) {
  const D = dark;
  return {
    D,
    appBg: D ? "bg-[#0e1017]" : "bg-slate-100",
    sideBg: D ? "bg-[#111320]" : "bg-white",
    headBg: D ? "bg-[#0e1017]/95" : "bg-white/95",
    cardCls: D ? "bg-[#111320] border-white/8" : "bg-white border-slate-200",
    brdCls: D ? "border-white/8" : "border-slate-200",
    txtPri: D ? "text-white" : "text-slate-800",
    txtSec: D ? "text-slate-300" : "text-slate-600",
    txtMut: D ? "text-slate-500" : "text-slate-400",
    divCls: D ? "divide-white/6" : "divide-slate-100",
    hoverRow: D ? "hover:bg-white/4" : "hover:bg-slate-50",
    srchCls: D
      ? "bg-white/8 border-white/10 text-white placeholder-slate-500 focus:border-violet-500/50"
      : "bg-slate-100 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-violet-400",
    dropBg: D ? "bg-[#1e2338] border-[#2e3352]" : "bg-white border-slate-200",
    dropItem: D
      ? "text-slate-100 hover:bg-white/10 hover:text-white"
      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
    dropHead: D ? "text-white" : "text-slate-800",
    dropSub: D ? "text-slate-400" : "text-slate-500",
    navActive: "bg-violet-600/20 text-violet-400 border border-violet-500/25",
    navIdle: `border border-transparent ${D ? "text-slate-300 hover:bg-white/6 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`,
    inpCls: `w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
      D
        ? "bg-[#252a40] border-white/15 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
        : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:ring-violet-100"
    }`,
  };
}
