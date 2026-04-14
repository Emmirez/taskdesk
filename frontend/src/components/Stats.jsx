//  Stats.jsx  –  summary cards + progress bar
import { useApp } from "../context/AppContext";
import { getTheme } from "../data/constants";

export default function Stats() {
  const { dark, tasks } = useApp();
  const T = getTheme(dark);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "inprogress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const highPrio = tasks.filter(
    (t) => t.priority === "high" && t.status !== "completed",
  ).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const CARDS = [
    {
      label: "Total Tasks",
      value: total,
      icon: "📋",
      from: dark ? "from-violet-600/20" : "from-violet-50",
      brd: dark ? "border-violet-500/25" : "border-violet-200",
      sub: `${total} tasks tracked`,
    },
    {
      label: "Completed",
      value: completed,
      icon: "✅",
      from: dark ? "from-emerald-600/20" : "from-emerald-50",
      brd: dark ? "border-emerald-500/25" : "border-emerald-200",
      sub: `${pct}% completion rate`,
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: "🔄",
      from: dark ? "from-cyan-600/20" : "from-cyan-50",
      brd: dark ? "border-cyan-500/25" : "border-cyan-200",
      sub: "Currently active",
    },
    {
      label: "High Priority",
      value: highPrio,
      icon: "🔥",
      from: dark ? "from-rose-600/20" : "from-rose-50",
      brd: dark ? "border-rose-500/25" : "border-rose-200",
      sub: "Needs attention",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {CARDS.map((s, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-gradient-to-br ${s.from} to-transparent border ${s.brd} rounded-2xl p-4`}
          >
            <p className={`text-xs font-semibold ${T.txtMut}`}>{s.label}</p>
            <p className={`text-3xl font-bold mt-1 tracking-tight ${T.txtPri}`}>
              {s.value}
            </p>
            <p className={`text-xs mt-1 ${T.txtMut}`}>{s.sub}</p>
            <span className="absolute top-3 right-3 text-2xl opacity-60">
              {s.icon}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className={`border rounded-2xl p-4 sm:p-5 ${T.cardCls}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-bold ${T.txtPri}`}>
            Overall Progress
          </span>
          <span className="text-sm font-bold text-violet-500">{pct}%</span>
        </div>
        <div
          className={`h-2.5 rounded-full overflow-hidden ${dark ? "bg-white/8" : "bg-slate-200"}`}
        >
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-5 mt-3">
          {[
            { label: "To Do", count: todo, dot: "bg-slate-400" },
            { label: "In Progress", count: inProgress, dot: "bg-violet-500" },
            { label: "Done", count: completed, dot: "bg-emerald-500" },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 text-xs ${T.txtSec}`}
            >
              <span className={`w-2 h-2 rounded-full ${s.dot}`} />
              {s.label}: <strong>{s.count}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
