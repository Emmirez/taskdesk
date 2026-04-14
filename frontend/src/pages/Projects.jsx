//  Projects.jsx
import { useApp } from "../context/AppContext";
import { getTheme, PROJECTS } from "../data/constants";

export default function Projects() {
  const { dark, tasks } = useApp();
  const T = getTheme(dark);

  // Merge live task counts into project data
  const projects = PROJECTS.map((p) => ({
    ...p,
    tasks: tasks.filter((t) => t.project === p.name).length,
    done: tasks.filter((t) => t.project === p.name && t.status === "completed")
      .length,
  }));

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className={`text-xl sm:text-2xl font-bold tracking-tight ${T.txtPri}`}
          >
            Projects
          </h1>
          <p className={`text-sm mt-1 ${T.txtMut}`}>
            Track progress across all your active projects.
          </p>
        </div>
        <button className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 px-3.5 py-2 rounded-xl text-sm font-semibold text-white transition-colors shadow-lg shadow-violet-500/25">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:inline">New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => {
          const pct = p.tasks ? Math.round((p.done / p.tasks) * 100) : 0;
          return (
            <div
              key={p.id}
              className={`border rounded-2xl p-5 transition-all hover:shadow-lg ${T.cardCls} ${dark ? "hover:border-white/15 hover:shadow-black/20" : "hover:border-slate-300 hover:shadow-slate-200"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 ${p.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${T.txtPri}`}>
                      {p.name}
                    </h3>
                    <p className={`text-xs ${T.txtMut}`}>Due {p.due}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                    pct === 100
                      ? dark
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-emerald-100 text-emerald-700"
                      : dark
                        ? "bg-white/8 text-slate-300"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {pct === 100 ? "Done ✓" : `${pct}%`}
                </span>
              </div>

              {/* Progress */}
              <div
                className={`h-1.5 rounded-full overflow-hidden mb-3 ${dark ? "bg-white/8" : "bg-slate-200"}`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${p.color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs ${T.txtMut}`}>
                  {p.done} / {p.tasks} tasks
                </span>
                <div className="flex -space-x-1.5">
                  {["A", "B", "C"]
                    .slice(0, Math.min(3, p.tasks || 1))
                    .map((l, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white ${["bg-violet-500", "bg-cyan-500", "bg-rose-500"][i % 3]} ${dark ? "border-[#111320]" : "border-white"}`}
                      >
                        {l}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
