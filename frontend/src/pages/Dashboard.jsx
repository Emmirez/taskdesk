//  Dashboard.jsx  –  main overview page
import { useApp } from "../context/AppContext";
import { getTheme } from "../data/constants";
import Stats from "../components/Stats";
import TaskList from "../components/TaskList";

export default function Dashboard({ user }) {
  const { dark } = useApp();
  const T = getTheme(dark);

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-5xl mx-auto w-full">
      {/* Greeting */}
      <div>
        <h1
          className={`text-xl sm:text-2xl font-bold tracking-tight ${T.txtPri}`}
        >
          Good morning, {user?.name?.split(" ")[0] || "there"} 👋
        </h1>
        <p className={`text-sm mt-1 ${T.txtMut}`}>
          Here's what's happening with your tasks today.
        </p>
      </div>

      {/* Stats + progress */}
      <Stats />

      {/* Full task list */}
      <TaskList />
    </div>
  );
}
