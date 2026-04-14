//  Kanban.jsx  –  drag-and-drop board
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { getTheme, KANBAN_COLS } from "../data/constants";
import { PriorityBadge } from "../components/PriorityBadge";

//  Single draggable card
function KanbanCard({ task, dark, dragging, onDragStart, onDragEnd }) {
  const { setModal, deleteTask } = useApp();
  const T = getTheme(dark);

  const card = dark
    ? "bg-[#1e2235] border-white/10 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10"
    : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-md";
  const titleCl = dark ? "text-slate-100" : "text-slate-800";
  const mutCl = dark ? "text-slate-400" : "text-slate-500";
  const tagCl = dark
    ? "bg-white/10 text-slate-300"
    : "bg-slate-100 text-slate-600";
  const editBtn = dark
    ? "hover:bg-white/10 text-slate-400 hover:text-white"
    : "hover:bg-slate-100 text-slate-400 hover:text-slate-700";
  const delBtn = dark
    ? "hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
    : "hover:bg-rose-50 text-slate-400 hover:text-rose-500";

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      className={`group relative rounded-xl p-3.5 cursor-grab active:cursor-grabbing transition-all duration-200 border ${card} ${dragging ? "opacity-40 scale-95" : ""}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <p className={`text-sm font-medium leading-snug ${titleCl}`}>
          {task.title}
        </p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => setModal(task)}
            className={`p-1 rounded-md transition-colors ${editBtn}`}
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5z" />
            </svg>
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className={`p-1 rounded-md transition-colors ${delBtn}`}
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
      <div className="flex items-center justify-between flex-wrap gap-1.5">
        <PriorityBadge priority={task.priority} dark={dark} />
        <div className="flex items-center gap-1.5">
          <span className={`text-xs px-1.5 py-0.5 rounded-md ${tagCl}`}>
            {task.project}
          </span>
          {task.due && (
            <span className={`text-xs flex items-center gap-1 ${mutCl}`}>
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
              {task.due.slice(5)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Kanban page
export default function Kanban() {
  const { dark, filtered, setModal, moveTask } = useApp();
  const T = getTheme(dark);

  const [dragId, setDragId] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  function handleDragStart(e, id) {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
  }
  function handleDragEnd() {
    setDragId(null);
    setDragOver(null);
  }
  function handleDrop(colId) {
    if (dragId) moveTask(dragId, colId);
    setDragId(null);
    setDragOver(null);
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className={`text-xl sm:text-2xl font-bold tracking-tight ${T.txtPri}`}
          >
            Kanban Board
          </h1>
          <p className={`text-sm mt-1 ${T.txtMut}`}>
            Drag cards between columns to update their status.
          </p>
        </div>
        <button
          onClick={() => setModal("new")}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 px-3.5 py-2 rounded-xl text-sm font-semibold text-white transition-colors shadow-lg shadow-violet-500/25"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>

      {/* Columns: horizontal scroll on mobile, grid on ≥sm */}
      <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible">
        {KANBAN_COLS.map((col) => {
          const colTasks = filtered.filter((t) => t.status === col.id);
          const isOver = dragOver === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(col.id);
              }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(col.id)}
              className={`flex-shrink-0 w-72 sm:w-auto rounded-2xl border transition-all duration-200 flex flex-col ${T.cardCls} ${isOver ? "drop-active" : ""}`}
            >
              {/* Column header */}
              <div
                className={`px-4 py-3.5 border-b flex items-center justify-between flex-shrink-0 ${T.brdCls}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${col.dot}`}
                  />
                  <span className={`text-sm font-bold ${T.txtPri}`}>
                    {col.label}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${dark ? col.darkCount : col.lightCount}`}
                >
                  {colTasks.length}
                </span>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-2.5 flex-1 min-h-28">
                {colTasks.map((task) => (
                  <KanbanCard
                    key={task.id}
                    task={task}
                    dark={dark}
                    dragging={dragId === task.id}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
                {colTasks.length === 0 && !isOver && (
                  <div
                    className={`flex items-center justify-center py-10 text-xs rounded-xl border-2 border-dashed ${
                      dark
                        ? "text-slate-600 border-white/8"
                        : "text-slate-300 border-slate-200"
                    }`}
                  >
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
