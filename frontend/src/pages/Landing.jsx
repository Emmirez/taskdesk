// ─────────────────────────────────────────────
//  LandingPage.jsx
// ─────────────────────────────────────────────
export default function LandingPage({
  dark,
  toggleDark,
  onGoLogin,
  onGoRegister,
  onGoPage,
}) {
  const D = dark;
  const bg = D ? "bg-[#0a0c12]" : "bg-white";
  const txt = D ? "text-white" : "text-slate-800";
  const txtMut = D ? "text-slate-400" : "text-slate-500";
  const txtFaint = D ? "text-slate-500" : "text-slate-400";
  const cardBg = D
    ? "bg-[#111320] border-[rgba(255,255,255,0.08)]"
    : "bg-white border-slate-200";
  const navBg = D
    ? "bg-[#0a0c12]/80 border-[rgba(255,255,255,0.05)]"
    : "bg-white/80 border-slate-200";
  const gridLine = D ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)";
  const mockBg = D ? "bg-[#111320]" : "bg-slate-50";
  const mockHdr = D ? "bg-[#0e1017]/60" : "bg-white/80";
  const mockBrd = D ? "border-[rgba(255,255,255,0.08)]" : "border-slate-200";
  const mockRow = D
    ? "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)]"
    : "bg-slate-100 hover:bg-slate-200";
  const mockSide = D ? "border-[rgba(255,255,255,0.06)]" : "border-slate-200";

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      desc: "Manage tasks in real-time with instant updates across your entire team.",
    },
    {
      icon: "🎯",
      title: "Kanban Boards",
      desc: "Drag and drop tasks across columns. Visualize your entire workflow at a glance.",
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      desc: "Track progress, completion rates and team performance over time.",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      desc: "Never miss a deadline. Get alerts for due dates and task updates.",
    },
    {
      icon: "🌙",
      title: "Dark & Light Mode",
      desc: "Easy on the eyes day or night. Fully themeable to match your style.",
    },
    {
      icon: "📅",
      title: "Calendar View",
      desc: "See all your tasks plotted on a calendar. Plan sprints with ease.",
    },
  ];

  const stats = [
    { value: "10k+", label: "Teams using TaskFlow" },
    { value: "2M+", label: "Tasks completed" },
    { value: "99.9%", label: "Uptime guaranteed" },
    { value: "4.9★", label: "Average rating" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Engineering Lead @ Stripe",
      avatar: "SC",
      color: "bg-cyan-500",
      text: "TaskFlow replaced three tools we were using. Our team ships 40% faster now.",
    },
    {
      name: "Marcus Webb",
      role: "Product Manager @ Notion",
      avatar: "MW",
      color: "bg-violet-500",
      text: "The Kanban board is buttery smooth. Best task manager I've used in 10 years.",
    },
    {
      name: "Aisha Patel",
      role: "Founder @ Launchpad",
      avatar: "AP",
      color: "bg-rose-500",
      text: "Onboarded my entire team in under an hour. Dead simple, incredibly powerful.",
    },
  ];

  const mockTasks = [
    {
      label: "Design new onboarding flow",
      priority: "bg-rose-500",
      done: false,
    },
    { label: "Fix auth bug on mobile", priority: "bg-amber-400", done: true },
    {
      label: "Write Q1 performance report",
      priority: "bg-violet-500",
      done: false,
    },
    { label: "Update API documentation", priority: "bg-cyan-500", done: true },
    {
      label: "Deploy staging environment",
      priority: "bg-emerald-500",
      done: false,
    },
  ];

  const mockCards = [
    {
      val: "24",
      lbl: "Total",
      color: D
        ? "bg-violet-500/15 border-violet-500/25"
        : "bg-violet-50 border-violet-200",
      num: D ? "text-violet-300" : "text-violet-700",
    },
    {
      val: "12",
      lbl: "Done",
      color: D
        ? "bg-emerald-500/15 border-emerald-500/25"
        : "bg-emerald-50 border-emerald-200",
      num: D ? "text-emerald-300" : "text-emerald-700",
    },
    {
      val: "8",
      lbl: "Active",
      color: D
        ? "bg-cyan-500/15 border-cyan-500/25"
        : "bg-cyan-50 border-cyan-200",
      num: D ? "text-cyan-300" : "text-cyan-700",
    },
    {
      val: "4",
      lbl: "Urgent",
      color: D
        ? "bg-rose-500/15 border-rose-500/25"
        : "bg-rose-50 border-rose-200",
      num: D ? "text-rose-300" : "text-rose-700",
    },
  ];

  const DarkToggle = () => (
    <button
      onClick={toggleDark}
      title={D ? "Switch to light mode" : "Switch to dark mode"}
      className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${D ? "hover:bg-white/10 text-amber-300" : "hover:bg-slate-100 text-slate-500"}`}
    >
      {D ? (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );

  return (
    <div
      className={`min-h-screen ${bg} ${txt} overflow-x-hidden transition-colors duration-300`}
      style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .hero-glow-dark  { background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.22) 0%, transparent 70%); }
        .hero-glow-light { background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.08) 0%, transparent 70%); }
        .gradient-text   { background: linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .card-lift:hover { transform:translateY(-4px); }
        .float-anim      { animation: floatY 6s ease-in-out infinite; }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .ticker-wrap     { animation: ticker 22s linear infinite; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .fade-up         { animation: fadeUp 0.7s ease both; }
        .d1{animation-delay:.1s} .d2{animation-delay:.2s} .d3{animation-delay:.3s} .d4{animation-delay:.4s}
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-10 h-16 border-b backdrop-blur-xl transition-colors duration-300 ${navBg}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30 flex-shrink-0">
            <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span
            className="font-extrabold text-base tracking-tight"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            TaskFlow
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Features", page: "features" },
            { label: "Pricing", page: "pricing" },
            { label: "Blog", page: "blog" },
            { label: "About", page: "about" },
          ].map((l) => (
            <button
              key={l.page}
              onClick={() => onGoPage(l.page)}
              className={`text-sm font-medium transition-colors hover:text-violet-400 ${txtMut}`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <DarkToggle />
          <button
            onClick={onGoLogin}
            className={`hidden sm:block text-sm font-semibold px-3 py-2 rounded-xl transition-colors ${D ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}
          >
            Sign in
          </button>
          <button
            onClick={onGoRegister}
            className="text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl transition-colors shadow-lg shadow-violet-500/20"
          >
            Get started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        className={`relative pt-36 pb-24 px-6 text-center overflow-hidden ${D ? "hero-glow-dark" : "hero-glow-light"}`}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${gridLine} 1px,transparent 1px),linear-gradient(90deg,${gridLine} 1px,transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {D && (
          <div className="absolute top-24 left-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        )}
        {D && (
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
        )}
        <div className="relative max-w-4xl mx-auto">
          <div className="fade-up inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-violet-400 tracking-wide uppercase">
              Now in public beta — free forever
            </span>
          </div>
          <h1
            className="fade-up d1 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            The task manager
            <br />
            <span className="gradient-text">your team deserves</span>
          </h1>
          <p
            className={`fade-up d2 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${txtMut}`}
          >
            TaskFlow brings together kanban boards, smart analytics, and team
            collaboration into one beautiful workspace — built for modern teams
            who ship.
          </p>
          <div className="fade-up d3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <button
              onClick={onGoRegister}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-2xl shadow-violet-500/25 hover:-translate-y-0.5"
            >
              Start for free
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={onGoLogin}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 border font-semibold px-7 py-3.5 rounded-xl transition-all ${D ? "border-white/10 hover:border-white/20 text-slate-300 hover:text-white hover:bg-[rgba(255,255,255,0.05)]" : "border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 hover:bg-slate-50"}`}
            >
              Sign in to your account
            </button>
          </div>
          <p className={`fade-up d4 text-sm mb-3 ${txtFaint}`}>
            Trusted by teams at
          </p>
          <div
            className={`fade-up d4 flex flex-wrap items-center justify-center gap-6 ${D ? "opacity-30" : "opacity-40"}`}
          >
            {["Stripe", "Vercel", "Linear", "Notion", "Figma", "GitHub"].map(
              (b) => (
                <span
                  key={b}
                  className={`text-sm font-bold tracking-wide ${D ? "text-slate-300" : "text-slate-500"}`}
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {b}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* STATS TICKER */}
      <div
        className={`border-y py-5 overflow-hidden ${D ? "border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]" : "border-slate-100 bg-slate-50"}`}
      >
        <div className="flex ticker-wrap whitespace-nowrap">
          {[...stats, ...stats, ...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-10">
              <span
                className="text-2xl font-extrabold text-violet-500"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                {s.value}
              </span>
              <span className={`text-sm font-medium ${txtMut}`}>{s.label}</span>
              <span
                className={`ml-6 ${D ? "text-slate-700" : "text-slate-300"}`}
              >
                ·
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE SHOWCASE */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Everything in one place
            </h2>
            <p className={`text-lg max-w-xl mx-auto ${txtMut}`}>
              A beautiful workspace that keeps your team focused and moving
              forward.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Task List card */}
            <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span className={`text-sm font-bold ${txt}`}>All Tasks</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                  8 tasks
                </span>
              </div>
              <div className="p-3 space-y-1.5">
                {[
                  {
                    label: "Design onboarding flow",
                    done: true,
                    color: "#10b981",
                  },
                  {
                    label: "Fix auth bug on mobile",
                    done: false,
                    color: "#f43f5e",
                  },
                  { label: "Write Q1 report", done: false, color: "#f59e0b" },
                  { label: "Update API docs", done: true, color: "#10b981" },
                  {
                    label: "User research interviews",
                    done: false,
                    color: "#f59e0b",
                  },
                  { label: "Deploy staging env", done: true, color: "#10b981" },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                    style={{
                      background: D ? "rgba(255,255,255,0.04)" : "#f8fafc",
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{
                        border: t.done
                          ? "none"
                          : `1.5px solid ${D ? "#475569" : "#cbd5e1"}`,
                        background: t.done ? "#10b981" : "transparent",
                      }}
                    >
                      {t.done && (
                        <svg
                          viewBox="0 0 8 8"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          className="w-2.5 h-2.5"
                        >
                          <path d="M1 4l2 2 4-4" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-xs flex-1 truncate"
                      style={{
                        color: t.done
                          ? D
                            ? "#64748b"
                            : "#94a3b8"
                          : D
                            ? "#e2e8f0"
                            : "#374151",
                        textDecoration: t.done ? "line-through" : "none",
                      }}
                    >
                      {t.label}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: t.color }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kanban card */}
            <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span className={`text-sm font-bold ${txt}`}>Kanban Board</span>
                <span className={`text-xs ${txtMut}`}>Drag & drop</span>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                {[
                  {
                    col: "To Do",
                    dot: "#94a3b8",
                    tasks: [
                      { t: "Redesign emails", p: "#94a3b8" },
                      { t: "Competitor analysis", p: "#f59e0b" },
                    ],
                  },
                  {
                    col: "Active",
                    dot: "#7c3aed",
                    tasks: [
                      { t: "Auth bug fix", p: "#f43f5e" },
                      { t: "API docs update", p: "#7c3aed" },
                    ],
                  },
                  {
                    col: "Done",
                    dot: "#10b981",
                    tasks: [
                      { t: "Deploy staging", p: "#10b981" },
                      { t: "Q1 report draft", p: "#10b981" },
                    ],
                  },
                ].map((col, ci) => (
                  <div key={ci}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: col.dot }}
                      />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: D ? "#94a3b8" : "#64748b" }}
                      >
                        {col.col}
                      </span>
                    </div>
                    {col.tasks.map((task, ti) => (
                      <div
                        key={ti}
                        className="rounded-lg p-2 mb-1.5"
                        style={{
                          background: D ? "rgba(255,255,255,0.05)" : "#f8fafc",
                          border: `1px solid ${D ? "rgba(255,255,255,0.06)" : "#f1f5f9"}`,
                        }}
                      >
                        <p
                          className="text-xs leading-snug mb-1.5"
                          style={{ color: D ? "#cbd5e1" : "#374151" }}
                        >
                          {task.t}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: task.p, opacity: 0.7 }}
                          />
                          <div
                            className="h-1 flex-1 rounded"
                            style={{
                              background: D
                                ? "rgba(255,255,255,0.08)"
                                : "#e2e8f0",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics card */}
            <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span className={`text-sm font-bold ${txt}`}>Analytics</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#10b981" }}
                >
                  ↑ 24% this week
                </span>
              </div>
              <div className="p-4 space-y-3">
                <p
                  className="text-xs"
                  style={{ color: D ? "#94a3b8" : "#64748b" }}
                >
                  Tasks completed per day
                </p>
                <div
                  className="flex items-end gap-1"
                  style={{ height: "56px" }}
                >
                  {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 5
                            ? "#7c3aed"
                            : D
                              ? "rgba(139,92,246,0.25)"
                              : "#ede9fe",
                      }}
                    />
                  ))}
                </div>
                <div className="flex">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span
                      key={i}
                      className="flex-1 text-center"
                      style={{
                        fontSize: "10px",
                        color: D ? "#475569" : "#94a3b8",
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Completion", value: "78%", color: "#7c3aed" },
                    { label: "On time", value: "92%", color: "#10b981" },
                    {
                      label: "Total",
                      value: "124",
                      color: D ? "#e2e8f0" : "#1e293b",
                    },
                    { label: "Overdue", value: "3", color: "#f43f5e" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-2.5"
                      style={{
                        background: D ? "rgba(255,255,255,0.04)" : "#f8fafc",
                        border: `1px solid ${D ? "rgba(255,255,255,0.06)" : "#f1f5f9"}`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          color: D ? "#64748b" : "#94a3b8",
                          marginBottom: "2px",
                        }}
                      >
                        {s.label}
                      </p>
                      <p
                        className="text-base font-bold"
                        style={{
                          color: s.color,
                          fontFamily: "'Syne',sans-serif",
                        }}
                      >
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`py-20 px-6 ${D ? "" : "bg-slate-50"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Built for how teams actually work
            </h2>
            <p className={`text-lg max-w-xl mx-auto ${txtMut}`}>
              Every feature designed around real workflows — not feature
              checklists.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group border rounded-2xl p-6 transition-all duration-300 card-lift cursor-default ${cardBg}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform ${D ? "bg-violet-500/15 border border-violet-500/20" : "bg-violet-50 border border-violet-100"}`}
                >
                  {f.icon}
                </div>
                <h3 className={`font-bold text-base mb-2 ${txt}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${txtMut}`}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onGoPage("features")}
              className="text-sm text-violet-500 hover:text-violet-400 font-semibold transition-colors"
            >
              See all features →
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Loved by productive teams
            </h2>
            <p className={`text-lg ${txtMut}`}>Don't take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`border rounded-2xl p-6 card-lift transition-all duration-300 ${cardBg}`}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg
                      key={s}
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-3.5 h-3.5 text-amber-400"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  ))}
                </div>
                <p
                  className={`text-sm leading-relaxed mb-5 ${D ? "text-slate-300" : "text-slate-600"}`}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 ${t.color} rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${txt}`}>{t.name}</p>
                    <p className={`text-xs ${txtFaint}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className={`py-20 px-6 ${D ? "" : "bg-slate-50"}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Simple, honest pricing
            </h2>
            <p className={`text-lg ${txtMut}`}>
              No hidden fees. Cancel anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className={`border rounded-2xl p-7 ${cardBg}`}>
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-3 ${txtMut}`}
              >
                Free
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span
                  className="text-4xl font-extrabold"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  $0
                </span>
                <span className={`mb-1 ${txtMut}`}>/month</span>
              </div>
              <p className={`text-sm mb-6 ${txtFaint}`}>
                Perfect for individuals and small teams.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Up to 5 team members",
                  "Unlimited tasks",
                  "Kanban boards",
                  "Calendar view",
                  "7-day history",
                ].map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2.5 text-sm ${D ? "text-slate-300" : "text-slate-600"}`}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                    >
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onGoRegister}
                className={`w-full py-2.5 border rounded-xl text-sm font-semibold transition-all ${D ? "border-white/10 hover:border-violet-500/40 hover:bg-violet-500/8 text-white" : "border-slate-200 hover:border-violet-400 hover:bg-violet-50 text-slate-700"}`}
              >
                Get started free
              </button>
            </div>
            <div className="relative border border-violet-500/40 bg-gradient-to-b from-violet-600/10 to-transparent rounded-2xl p-7 shadow-xl shadow-violet-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-violet-500/30">
                MOST POPULAR
              </div>
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">
                Pro
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span
                  className="text-4xl font-extrabold"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  $12
                </span>
                <span className={`mb-1 ${txtMut}`}>/month</span>
              </div>
              <p className={`text-sm mb-6 ${txtFaint}`}>
                For growing teams that need more power.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Unlimited members",
                  "Advanced analytics",
                  "Priority support",
                  "Unlimited history",
                  "Custom workflows",
                  "API access",
                ].map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2.5 text-sm ${D ? "text-slate-300" : "text-slate-600"}`}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-violet-400 flex-shrink-0"
                    >
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onGoRegister}
                className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-500/25"
              >
                Start free trial
              </button>
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => onGoPage("pricing")}
              className="text-sm text-violet-500 hover:text-violet-400 font-semibold transition-colors"
            >
              Compare all plans →
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div
          className={`max-w-3xl mx-auto text-center border rounded-3xl p-12 relative overflow-hidden ${D ? "border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-transparent" : "border-violet-200 bg-gradient-to-br from-violet-50 to-white"}`}
        >
          <div className="relative">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Ready to ship faster?
            </h2>
            <p className={`text-lg mb-8 ${txtMut}`}>
              Join thousands of teams who use TaskFlow to stay organised and
              move fast.
            </p>
            <button
              onClick={onGoRegister}
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-2xl shadow-violet-500/25 hover:-translate-y-0.5"
            >
              Create your free account
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className={`border-t px-6 py-10 ${D ? "border-[rgba(255,255,255,0.05)]" : "border-slate-200"}`}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span
              className="font-bold text-sm"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              TaskFlow
            </span>
            <span className={`text-sm ml-2 ${txtFaint}`}>
              © 2026 All rights reserved.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "Features", page: "features" },
              { label: "Pricing", page: "pricing" },
              { label: "Blog", page: "blog" },
              { label: "About", page: "about" },
            ].map((l) => (
              <button
                key={l.page}
                onClick={() => onGoPage(l.page)}
                className={`text-sm transition-colors hover:text-violet-400 ${txtFaint}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
