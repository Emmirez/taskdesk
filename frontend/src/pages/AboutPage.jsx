//  AboutPage.jsx

import PageNav from "../components/PageNav";

const TEAM = [
  {
    name: "Alex Rivera",
    role: "CEO & Co-founder",
    avatar: "AR",
    color: "bg-violet-500",
    bio: "Former PM at Notion. Obsessed with productivity systems and great design.",
  },
  {
    name: "Sarah Chen",
    role: "CTO & Co-founder",
    avatar: "SC",
    color: "bg-cyan-500",
    bio: "Ex-engineering lead at Stripe. Loves distributed systems and fast UIs.",
  },
  {
    name: "Marcus Webb",
    role: "Head of Product",
    avatar: "MW",
    color: "bg-emerald-500",
    bio: "10 years shipping B2B tools. Believes great software should feel invisible.",
  },
  {
    name: "Aisha Patel",
    role: "Head of Design",
    avatar: "AP",
    color: "bg-rose-500",
    bio: "Designed at Figma and Linear. Passionate about details that delight.",
  },
  {
    name: "James Liu",
    role: "Lead Engineer",
    avatar: "JL",
    color: "bg-amber-500",
    bio: "Full-stack wizard. Built TaskFlow's real-time engine from scratch.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Growth",
    avatar: "PS",
    color: "bg-pink-500",
    bio: "Grew two startups from 0 to 50k users. Data-driven and human-first.",
  },
];
const VALUES = [
  {
    icon: "🎯",
    title: "Simplicity first",
    desc: "We cut every feature that doesn't earn its place. Simple tools get used. Complex tools get abandoned.",
  },
  {
    icon: "⚡",
    title: "Speed is a feature",
    desc: "Every millisecond matters. We obsess over performance because slow software kills momentum.",
  },
  {
    icon: "🤝",
    title: "Team over ego",
    desc: "The best ideas win regardless of who has them. We hire people smarter than us and trust them fully.",
  },
  {
    icon: "🔍",
    title: "Radical transparency",
    desc: "We share our roadmap, our mistakes, and our reasoning. No corporate speak, ever.",
  },
];
const TIMELINE = [
  {
    year: "2023",
    event:
      "TaskFlow founded in a San Francisco garage. First version shipped in 6 weeks.",
  },
  {
    year: "2024",
    event:
      "Reached 1,000 teams. Raised $2.4M seed round. Launched Kanban boards.",
  },
  {
    year: "2025",
    event:
      "Hit 5,000 teams. Launched analytics, calendar view, and mobile apps.",
  },
  {
    year: "2026",
    event: "10,000+ teams, 2M+ tasks completed. Launched Pro plan and API.",
  },
];

export default function AboutPage({ dark, toggleDark, onBack, onGoRegister }) {
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
        title="About"
        rightSlot={
          <button
            onClick={onGoRegister}
            className="text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Get started
          </button>
        }
      />

      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto space-y-20">
        {/* Mission */}
        <div className="text-center max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-6"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            We believe great tools
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              should get out of your way
            </span>
          </h1>
          <p className={`text-lg leading-relaxed ${txtM}`}>
            TaskFlow was born from frustration with bloated project management
            tools. We set out to build something fast, focused and genuinely
            enjoyable to use.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "2023", lbl: "Founded" },
            { val: "10k+", lbl: "Teams" },
            { val: "2M+", lbl: "Tasks done" },
            { val: "18", lbl: "Team size" },
          ].map((s, i) => (
            <div
              key={i}
              className={`border rounded-2xl p-5 text-center ${card}`}
            >
              <div
                className="text-3xl font-extrabold text-violet-400 mb-1"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                {s.val}
              </div>
              <div className={`text-sm font-medium ${txtM}`}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div>
          <h2
            className="text-2xl font-extrabold text-center mb-10"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            What we believe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <div key={i} className={`border rounded-2xl p-6 ${card}`}>
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className={`font-bold mb-2 ${txt}`}>{v.title}</h3>
                <p className={`text-sm leading-relaxed ${txtM}`}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2
            className="text-2xl font-extrabold text-center mb-10"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Our story
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-violet-500/20" />
            <div className="space-y-8">
              {TIMELINE.map((t, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-14 flex-shrink-0 text-right">
                    <span
                      className="text-sm font-extrabold text-violet-400"
                      style={{ fontFamily: "'Syne',sans-serif" }}
                    >
                      {t.year}
                    </span>
                  </div>
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-violet-500 ring-4 ring-violet-500/20" />
                  </div>
                  <p className={`text-sm leading-relaxed pt-0.5 ${txtM}`}>
                    {t.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2
            className="text-2xl font-extrabold text-center mb-10"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Meet the team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((m, i) => (
              <div
                key={i}
                className={`border rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${card} ${D ? "hover:border-white/15" : "hover:border-slate-300"}`}
              >
                <div
                  className={`w-14 h-14 ${m.color} rounded-2xl flex items-center justify-center text-xl font-extrabold text-white mb-4`}
                >
                  {m.avatar}
                </div>
                <h3 className={`font-bold ${txt}`}>{m.name}</h3>
                <p className="text-xs text-violet-400 font-semibold mb-2">
                  {m.role}
                </p>
                <p className={`text-sm leading-relaxed ${txtM}`}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center border rounded-3xl p-12 ${D ? "border-violet-500/20 bg-violet-600/8" : "border-violet-200 bg-violet-50"}`}
        >
          <h2
            className="text-2xl font-extrabold mb-3"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Come build with us
          </h2>
          <p className={`mb-6 max-w-md mx-auto ${txtM}`}>
            We're a small team doing big things. Try TaskFlow free and tell us
            what you think.
          </p>
          <button
            onClick={onGoRegister}
            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-violet-500/25"
          >
            Get started for free
          </button>
        </div>
      </div>
    </div>
  );
}
