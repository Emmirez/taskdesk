//  FeaturesPage.jsx

import PageNav from "../components/PageNav";

const FEATURES = [
  {
    category: "Productivity",
    items: [
      {
        icon: "🎯",
        title: "Kanban Boards",
        desc: "Drag and drop tasks across columns. Fully customisable to fit any workflow.",
      },
      {
        icon: "📋",
        title: "Task Management",
        desc: "Create, edit, assign and prioritise tasks with due dates, labels, and priority levels.",
      },
      {
        icon: "⚡",
        title: "Keyboard Shortcuts",
        desc: "Navigate tasks at lightning speed with a full set of keyboard shortcuts.",
      },
      {
        icon: "🔁",
        title: "Recurring Tasks",
        desc: "Set tasks to repeat daily, weekly or monthly so nothing falls through the cracks.",
      },
    ],
  },
  {
    category: "Collaboration",
    items: [
      {
        icon: "👥",
        title: "Team Workspaces",
        desc: "Invite your team, assign roles, and collaborate in shared project boards.",
      },
      {
        icon: "💬",
        title: "Task Comments",
        desc: "Discuss work directly on tasks. Mention teammates and keep context together.",
      },
      {
        icon: "🔔",
        title: "Notifications",
        desc: "Get notified when tasks are updated or deadlines are approaching.",
      },
      {
        icon: "📧",
        title: "Email Digests",
        desc: "Receive a daily or weekly summary of your team's progress to your inbox.",
      },
    ],
  },
  {
    category: "Visibility",
    items: [
      {
        icon: "📊",
        title: "Analytics Dashboard",
        desc: "Track completion rates, team velocity and project health with real-time charts.",
      },
      {
        icon: "📅",
        title: "Calendar View",
        desc: "See every task on a full calendar. Drag to reschedule due dates instantly.",
      },
      {
        icon: "📁",
        title: "Project Overview",
        desc: "Bird's-eye view of all projects with progress bars and team activity.",
      },
      {
        icon: "🔍",
        title: "Global Search",
        desc: "Instantly find any task, project or comment across your entire workspace.",
      },
    ],
  },
  {
    category: "Customisation",
    items: [
      {
        icon: "🌙",
        title: "Dark & Light Mode",
        desc: "Switch between themes instantly. Your preference is saved automatically.",
      },
      {
        icon: "🎨",
        title: "Custom Priorities",
        desc: "Define your own priority levels and colour-code tasks to match your team.",
      },
      {
        icon: "🏷️",
        title: "Labels & Tags",
        desc: "Organise tasks with custom labels. Filter by any combination you need.",
      },
      {
        icon: "⚙️",
        title: "Workflow Automation",
        desc: "Set rules to automatically move, assign or notify on task conditions.",
      },
    ],
  },
];

export default function FeaturesPage({
  dark,
  toggleDark,
  onBack,
  onGoRegister,
}) {
  const D = dark;
  const bg = D ? "bg-[#0a0c12]" : "bg-white";
  const txt = D ? "text-white" : "text-slate-800";
  const txtM = D ? "text-slate-400" : "text-slate-500";
  const card = D ? "bg-[#111320] border-white/8" : "bg-white border-slate-200";

  return (
    <div
      className={`min-h-screen ${bg} ${txt}`}
      style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');`}</style>

      <PageNav
        dark={dark}
        toggleDark={toggleDark}
        onBack={onBack}
        title="Features"
        rightSlot={
          <button
            onClick={onGoRegister}
            className="text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Get started
          </button>
        }
      />

      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Everything you need to
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ship great work
            </span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${txtM}`}>
            16 powerful features built around the way modern teams actually
            work.
          </p>
        </div>

        <div className="space-y-14">
          {FEATURES.map((cat, ci) => (
            <div key={ci}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-violet-500/20" />
                <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">
                  {cat.category}
                </span>
                <div className="h-px flex-1 bg-violet-500/20" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.items.map((f, fi) => (
                  <div
                    key={fi}
                    className={`border rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${card} ${D ? "hover:border-violet-500/30" : "hover:border-violet-300"}`}
                  >
                    <div className="text-2xl mb-3">{f.icon}</div>
                    <h3 className={`font-bold text-sm mb-2 ${txt}`}>
                      {f.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${txtM}`}>
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 text-center border rounded-3xl p-12 ${D ? "border-violet-500/20 bg-violet-600/8" : "border-violet-200 bg-violet-50"}`}
        >
          <h2
            className="text-2xl font-extrabold mb-3"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Ready to try everything?
          </h2>
          <p className={`mb-6 ${txtM}`}>
            All features included in the free plan. No credit card required.
          </p>
          <button
            onClick={onGoRegister}
            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-violet-500/25"
          >
            Create free account
          </button>
        </div>
      </div>
    </div>
  );
}
