// AppContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const AppContext = createContext(null);

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("accessToken");
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
  if (options.body) config.body = JSON.stringify(options.body);
  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export function AppProvider({ children }) {
  const [dark,   setDarkRaw]   = useState(() => localStorage.getItem("dark")   !== "false");
  const [accent, setAccentRaw] = useState(() => localStorage.getItem("accent") || "#7c3aed");

  function setDark(val) {
    const v = typeof val === "function" ? val(dark) : val;
    localStorage.setItem("dark", v);
    setDarkRaw(v);
  }

  function setAccent(val) {
    localStorage.setItem("accent", val);
    document.documentElement.style.setProperty("--accent", val);
    setAccentRaw(val);
  }

  // Apply accent on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
  }, []);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [tasks,     setTasks]     = useState([]);
  const [modal,     setModal]     = useState(null);
  const [search,    setSearch]    = useState("");
  const [tasksLoading, setTasksLoading] = useState(false);

  // Load tasks from API
  async function fetchTasks() {
    setTasksLoading(true);
    try {
      const data = await apiFetch("/tasks");
      // Normalize _id to id for frontend compatibility
      setTasks(data.tasks.map(t => ({ ...t, id: t._id })));
    } catch {
      setTasks([]);
    } finally {
      setTasksLoading(false);
    }
  }

  // Task actions
  async function saveTask(form) {
    try {
      if (form.id && form.id !== undefined) {
        const data = await apiFetch(`/tasks/${form.id}`, { method: "PUT", body: form });
        setTasks(p => p.map(t => t.id === form.id ? { ...data.task, id: data.task._id } : t));
      } else {
        const data = await apiFetch("/tasks", { method: "POST", body: form });
        setTasks(p => [{ ...data.task, id: data.task._id }, ...p]);
      }
    } catch (err) {
      console.error("Save task error:", err.message);
    }
  }

  async function deleteTask(id) {
    try {
      await apiFetch(`/tasks/${id}`, { method: "DELETE" });
      setTasks(p => p.filter(t => t.id !== id));
    } catch (err) {
      console.error("Delete task error:", err.message);
    }
  }

  async function toggleDone(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newStatus = task.status === "completed" ? "todo" : "completed";
    try {
      const data = await apiFetch(`/tasks/${id}`, { method: "PUT", body: { status: newStatus } });
      setTasks(p => p.map(t => t.id === id ? { ...data.task, id: data.task._id } : t));
    } catch (err) {
      console.error("Toggle task error:", err.message);
    }
  }

  async function moveTask(id, status) {
    try {
      const data = await apiFetch(`/tasks/${id}`, { method: "PUT", body: { status } });
      setTasks(p => p.map(t => t.id === id ? { ...data.task, id: data.task._id } : t));
    } catch (err) {
      console.error("Move task error:", err.message);
    }
  }

  function closeAll() { setMobileNav(false); }

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppContext.Provider value={{
      dark, setDark,
      accent, setAccent,
      activeNav, setActiveNav,
      mobileNav, setMobileNav,
      tasks, filtered, tasksLoading,
      modal, setModal,
      search, setSearch,
      fetchTasks,
      saveTask, deleteTask, toggleDone, moveTask,
      closeAll,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}