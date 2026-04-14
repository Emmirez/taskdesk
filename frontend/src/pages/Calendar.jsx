//  Calendar.jsx  –  monthly calendar with tasks
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { getTheme } from "../data/constants";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDays(year, month) {
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  return { first, total };
}

export default function Calendar() {
  const { dark, tasks } = useApp();
  const T = getTheme(dark);

  const now = new Date();
  const [view, setView] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });
  const { first, total } = getDays(view.year, view.month);

  function prev() {
    setView((v) =>
      v.month === 0
        ? { year: v.year - 1, month: 11 }
        : { ...v, month: v.month - 1 },
    );
  }
  function next() {
    setView((v) =>
      v.month === 11
        ? { year: v.year + 1, month: 0 }
        : { ...v, month: v.month + 1 },
    );
  }

  // Map tasks to their due dates
  const tasksByDate = {};
  tasks.forEach((t) => {
    if (!t.due) return;
    const d = new Date(t.due);
    if (d.getFullYear() === view.year && d.getMonth() === view.month) {
      const day = d.getDate();
      if (!tasksByDate[day]) tasksByDate[day] = [];
      tasksByDate[day].push(t);
    }
  });

  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let i = 1; i <= total; i++) cells.push(i);

  const todayDay =
    now.getFullYear() === view.year && now.getMonth() === view.month
      ? now.getDate()
      : null;

  const PRIO_DOT = {
    high: "bg-rose-500",
    medium: "bg-amber-400",
    low: "bg-emerald-500",
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className={`text-xl sm:text-2xl font-bold tracking-tight ${T.txtPri}`}
          >
            Calendar
          </h1>
          <p className={`text-sm mt-1 ${T.txtMut}`}>View tasks by due date.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className={`w-8 h-8 flex items-center justify-center rounded-xl border transition-colors ${T.cardCls} ${dark ? "hover:bg-white/8 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className={`text-sm font-bold px-3 ${T.txtPri}`}>
            {MONTHS[view.month]} {view.year}
          </span>
          <button
            onClick={next}
            className={`w-8 h-8 flex items-center justify-center rounded-xl border transition-colors ${T.cardCls} ${dark ? "hover:bg-white/8 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={`border rounded-2xl overflow-hidden ${T.cardCls}`}>
        {/* Day headers */}
        <div className="grid grid-cols-7">
          {DAYS.map((d) => (
            <div
              key={d}
              className={`py-3 text-center text-xs font-bold border-b ${T.brdCls} ${T.txtMut}`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const dayTasks = day ? tasksByDate[day] || [] : [];
            const isToday = day === todayDay;
            return (
              <div
                key={i}
                className={`min-h-[80px] sm:min-h-[100px] p-1.5 sm:p-2 border-b border-r ${T.brdCls} ${
                  day ? (dark ? "hover:bg-white/3" : "hover:bg-slate-50") : ""
                } transition-colors`}
              >
                {day && (
                  <>
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mb-1 ${
                        isToday ? "bg-violet-600 text-white" : T.txtMut
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayTasks.slice(0, 2).map((t, ti) => (
                        <div
                          key={ti}
                          className={`flex items-center gap-1 rounded px-1 py-0.5 ${
                            dark ? "bg-white/6" : "bg-slate-100"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${PRIO_DOT[t.priority]}`}
                          />
                          <span
                            className={`text-xs truncate ${T.txtSec}`}
                            style={{ fontSize: "10px" }}
                          >
                            {t.title}
                          </span>
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <p
                          className={`text-xs px-1 ${T.txtMut}`}
                          style={{ fontSize: "10px" }}
                        >
                          +{dayTasks.length - 2} more
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
