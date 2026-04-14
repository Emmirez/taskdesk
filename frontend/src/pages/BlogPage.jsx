//  BlogPage.jsx

import { useState } from "react";
import PageNav from "../components/PageNav";

const POSTS = [
  {
    category: "Product",
    title: "Introducing Kanban 2.0 — drag, drop, and do more",
    excerpt:
      "We've completely rebuilt the Kanban board with smoother animations, multi-select, and bulk actions.",
    author: "Alex Rivera",
    avatar: "AR",
    color: "bg-violet-500",
    date: "Mar 12, 2026",
    read: "4 min read",
    featured: true,
  },
  {
    category: "Tips",
    title: "5 ways high-performing teams use TaskFlow to ship faster",
    excerpt:
      "From sprint planning to retrospectives, here's how the best teams structure their workflow in TaskFlow.",
    author: "Sarah Chen",
    avatar: "SC",
    color: "bg-cyan-500",
    date: "Mar 8, 2026",
    read: "6 min read",
    featured: false,
  },
  {
    category: "Engineering",
    title: "How we scaled TaskFlow to 10,000 teams",
    excerpt:
      "A deep dive into the architectural decisions that let us handle millions of real-time task updates.",
    author: "Marcus Webb",
    avatar: "MW",
    color: "bg-emerald-500",
    date: "Mar 3, 2026",
    read: "8 min read",
    featured: false,
  },
  {
    category: "Product",
    title: "Dark mode is here — and it looks incredible",
    excerpt:
      "After months of polish, our dark mode is live. Here's the design story behind every decision.",
    author: "Aisha Patel",
    avatar: "AP",
    color: "bg-rose-500",
    date: "Feb 24, 2026",
    read: "3 min read",
    featured: false,
  },
  {
    category: "Tips",
    title: "The ultimate guide to task prioritisation",
    excerpt:
      "Stop feeling overwhelmed. Learn the frameworks the most productive teams use to decide what's next.",
    author: "Alex Rivera",
    avatar: "AR",
    color: "bg-violet-500",
    date: "Feb 18, 2026",
    read: "7 min read",
    featured: false,
  },
  {
    category: "Engineering",
    title: "Building real-time collaboration with WebSockets",
    excerpt:
      "How we built instant task updates across thousands of simultaneous users without noticeable latency.",
    author: "Marcus Webb",
    avatar: "MW",
    color: "bg-emerald-500",
    date: "Feb 10, 2026",
    read: "10 min read",
    featured: false,
  },
];
const CATEGORIES = ["All", "Product", "Tips", "Engineering"];
const CAT_COLORS = {
  Product: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  Tips: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  Engineering: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

export default function BlogPage({ dark, toggleDark, onBack, onGoRegister }) {
  const [active, setActive] = useState("All");
  const D = dark;
  const bg = D ? "bg-[#0a0c12]" : "bg-white";
  const txt = D ? "text-white" : "text-slate-800";
  const txtM = D ? "text-slate-400" : "text-slate-500";
  const card = D
    ? "bg-[#111320] border-white/8 hover:border-white/15"
    : "bg-white border-slate-200 hover:border-slate-300";
  const brd = D ? "border-white/8" : "border-slate-200";

  const posts =
    active === "All" ? POSTS : POSTS.filter((p) => p.category === active);
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

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
        title="Blog"
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
        <div className="text-center mb-10">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            The TaskFlow Blog
          </h1>
          <p className={`text-lg ${txtM}`}>
            Product updates, tips, and stories from our team.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${active === c ? "bg-violet-600 border-violet-600 text-white" : D ? "border-white/10 text-slate-400 hover:border-white/20 hover:text-white" : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {featured && (
          <div
            className={`border rounded-2xl p-6 sm:p-8 mb-8 transition-all hover:shadow-xl cursor-pointer ${card}`}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div
                className={`w-full sm:w-56 h-36 rounded-xl flex-shrink-0 flex items-center justify-center text-4xl ${D ? "bg-violet-500/10 border border-violet-500/20" : "bg-violet-50"}`}
              >
                📋
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${CAT_COLORS[featured.category]}`}
                  >
                    {featured.category}
                  </span>
                  <span className="text-xs bg-amber-400/15 text-amber-400 border border-amber-400/25 px-2 py-0.5 rounded-full font-bold">
                    Featured
                  </span>
                </div>
                <h2
                  className={`text-xl font-extrabold mb-2 ${txt}`}
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {featured.title}
                </h2>
                <p className={`text-sm leading-relaxed mb-4 ${txtM}`}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 ${featured.color} rounded-full flex items-center justify-center text-xs font-bold text-white`}
                  >
                    {featured.avatar}
                  </div>
                  <span className={`text-xs font-semibold ${txt}`}>
                    {featured.author}
                  </span>
                  <span className={`text-xs ${txtM}`}>
                    {featured.date} · {featured.read}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p, i) => (
            <div
              key={i}
              className={`border rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer ${card}`}
            >
              <div
                className={`w-full h-28 rounded-xl flex items-center justify-center text-3xl mb-4 ${D ? "bg-white/4" : "bg-slate-50"}`}
              >
                {["📊", "💡", "⚙️", "🌙", "🎯", "🔧"][i % 6]}
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full border ${CAT_COLORS[p.category]}`}
              >
                {p.category}
              </span>
              <h3
                className={`font-extrabold text-sm mt-2 mb-2 leading-snug ${txt}`}
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                {p.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${txtM}`}>
                {p.excerpt}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 ${p.color} rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                >
                  {p.avatar}
                </div>
                <span className={`text-xs font-semibold ${txt}`}>
                  {p.author}
                </span>
                <span className={`text-xs ${txtM} ml-auto`}>{p.read}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
