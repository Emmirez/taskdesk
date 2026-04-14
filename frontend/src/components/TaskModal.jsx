//  TaskModal.jsx  –  create / edit task dialog
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { getTheme } from "../data/constants";

export default function TaskModal() {
  const { dark, modal, setModal, saveTask } = useApp();
  const T = getTheme(dark);

  const existing = modal && modal !== "new" ? modal : null;
  const [form, setForm] = useState(
    existing || {
      title: "",
      priority: "medium",
      due: "",
      project: "Product",
      status: "todo",
    },
  );

  const isEdit = !!existing?.id;

  function handleSave() {
    if (!form.title.trim()) return;
    saveTask(form);
    setModal(null);
  }

  const overlay = dark ? "bg-[#161929]" : "bg-white";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && setModal(null)}
    >
      <div
        className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border ${overlay} ${T.brdCls}`}
      >
        <h3 className={`text-lg font-bold mb-5 ${T.txtPri}`}>
          {isEdit ? "Edit Task" : "New Task"}
        </h3>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className={`text-xs font-semibold mb-1.5 block ${T.txtSec}`}>
              Task Title
            </label>
            <input
              className={T.inpCls}
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`text-xs font-semibold mb-1.5 block ${T.txtSec}`}
              >
                Priority
              </label>
              <select
                className={T.inpCls}
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label
                className={`text-xs font-semibold mb-1.5 block ${T.txtSec}`}
              >
                Status
              </label>
              <select
                className={T.inpCls}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Due + Project */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`text-xs font-semibold mb-1.5 block ${T.txtSec}`}
              >
                Due Date
              </label>
              <input
                type="date"
                className={T.inpCls}
                value={form.due}
                onChange={(e) => setForm({ ...form, due: e.target.value })}
                style={{ colorScheme: dark ? "dark" : "light" }}
              />
            </div>
            <div>
              <label
                className={`text-xs font-semibold mb-1.5 block ${T.txtSec}`}
              >
                Project
              </label>
              <select
                className={T.inpCls}
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
              >
                {[
                  "Product",
                  "Engineering",
                  "Marketing",
                  "Operations",
                  "Design",
                ].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2.5 mt-6">
          <button
            onClick={() => setModal(null)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              dark
                ? "text-slate-300 hover:text-white hover:bg-white/10"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-violet-500/25"
          >
            {isEdit ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
