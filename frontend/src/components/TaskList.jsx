//  TaskList.jsx  –  flat task list with actions
import { useApp } from "../context/AppContext";
import { getTheme } from "../data/constants";
import { PriorityBadge } from "./PriorityBadge";

export default function TaskList() {
  const { dark, filtered, tasks, setModal, deleteTask, toggleDone } = useApp();
  const T = getTheme(dark);

  const list = filtered.length < tasks.length ? filtered : tasks;

  return (
    <div className={`border rounded-2xl overflow-hidden ${T.cardCls}`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 sm:px-5 py-4 border-b ${T.brdCls}`}
      >
        <div className="flex items-center gap-2">
          <h2 className={`font-bold text-sm ${T.txtPri}`}>All Tasks</h2>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${dark ? "bg-white/8 text-slate-300" : "bg-slate-100 text-slate-600"}`}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => setModal("new")}
          className="text-xs text-violet-500 hover:text-violet-400 transition-colors flex items-center gap-1 font-semibold"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Add task
        </button>
      </div>

      {/* Rows */}
      <div className={`divide-y ${T.divCls}`}>
        {list.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-3xl mb-2">🔍</p>
            <p className={`text-sm font-medium ${T.txtMut}`}>No tasks found</p>
          </div>
        )}

        {list.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 transition-colors group ${T.hoverRow}`}
          >
            {/* Done toggle */}
            <button
              onClick={() => toggleDone(task.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                task.status === "completed"
                  ? "border-emerald-500 bg-emerald-500"
                  : dark
                    ? "border-slate-600 hover:border-emerald-500"
                    : "border-slate-300 hover:border-emerald-500"
              }`}
            >
              {task.status === "completed" && (
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="w-3 h-3"
                >
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </button>

            {/* Title */}
            <span
              className={`flex-1 min-w-0 truncate text-sm ${
                task.status === "completed"
                  ? `line-through ${T.txtMut}`
                  : T.txtPri
              }`}
            >
              {task.title}
            </span>

            {/* Meta + actions (visible on hover) */}
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <PriorityBadge priority={task.priority} dark={dark} />
              <span
                className={`text-xs px-2 py-0.5 rounded-lg hidden sm:block ${
                  dark
                    ? "bg-white/10 text-slate-300"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {task.project}
              </span>
              {task.due && (
                <span
                  className={`text-xs hidden md:flex items-center gap-1 ${T.txtMut}`}
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                  </svg>
                  {task.due.slice(5)}
                </span>
              )}
              {/* Edit */}
              <button
                onClick={() => setModal(task)}
                className={`p-1.5 rounded-lg transition-colors ${
                  dark
                    ? "hover:bg-white/10 text-slate-400 hover:text-white"
                    : "hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                }`}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5z" />
                </svg>
              </button>
              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  dark
                    ? "hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                    : "hover:bg-rose-50 text-slate-400 hover:text-rose-500"
                }`}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
