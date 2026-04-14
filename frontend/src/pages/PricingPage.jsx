// ─────────────────────────────────────────────
//  PricingPage.jsx
// ─────────────────────────────────────────────
import { useState } from "react";
import PageNav from "../components/PageNav";

const PLANS = [
  {
    name:  "Free",
    price: { monthly: 0, yearly: 0 },
    desc:  "Perfect for individuals and small teams.",
    badge: null,
    pro:   false,
    features: [
      "Up to 5 team members",
      "Unlimited tasks",
      "Kanban boards",
      "Calendar view",
      "7-day activity history",
      "Email notifications",
      "Mobile app",
    ],
  },
  {
    name:  "Pro",
    price: { monthly: 12, yearly: 9 },
    desc:  "For growing teams that need advanced tools.",
    badge: "Most Popular",
    pro:   true,
    features: [
      "Unlimited team members",
      "Everything in Free",
      "Advanced analytics",
      "Priority support",
      "Unlimited history",
      "Custom workflows",
      "API access",
      "SSO & permissions",
    ],
  },
  {
    name:  "Enterprise",
    price: { monthly: null, yearly: null },
    desc:  "Custom solutions for large organisations.",
    badge: null,
    pro:   false,
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
      "Audit logs",
      "Custom training",
      "Invoice billing",
    ],
  },
];

const FAQ = [
  { q: "Can I upgrade or downgrade anytime?",  a: "Yes — you can change your plan at any time. Upgrades take effect immediately and downgrades at the end of your billing period." },
  { q: "Is there a free trial for Pro?",        a: "Yes. Every new account gets a 14-day Pro trial with no credit card required." },
  { q: "What payment methods do you accept?",  a: "We accept all major credit cards, PayPal, and bank transfers for annual Enterprise plans." },
  { q: "What happens to my data if I cancel?", a: "Your data is kept for 30 days after cancellation so you can export everything before it's removed." },
];

// ── Contact Sales Modal ───────────────────────────────────────────────────────
function ContactModal({ dark, onClose }) {
  const D = dark;
  const [form, setForm]   = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent]   = useState(false);

  const overlay = D ? "bg-[#161929]" : "bg-white";
  const brd     = D ? "1px solid rgba(255,255,255,0.10)" : "1px solid #e2e8f0";
  const labelCl = D ? "text-slate-300" : "text-slate-600";
  const titleCl = D ? "text-white"     : "text-slate-800";
  const inp     = {
    width: "100%", borderRadius: "12px", padding: "10px 14px", fontSize: "14px",
    outline: "none", border: D ? "1px solid rgba(255,255,255,0.12)" : "1px solid #e2e8f0",
    background: D ? "#252a40" : "#f8fafc", color: D ? "#fff" : "#1e293b",
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: D ? "#161929" : "#fff", border: brd, borderRadius: "20px", padding: "28px", width: "100%", maxWidth: "440px", boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}>
        {!sent ? (
          <>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: D ? "#fff" : "#1e293b", margin: 0 }}>
                  Contact Sales
                </h3>
                <p style={{ fontSize: "13px", color: D ? "#94a3b8" : "#64748b", marginTop: "4px" }}>
                  Tell us about your team and we'll be in touch within 24 hours.
                </p>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: D ? "#64748b" : "#94a3b8", fontSize: "20px", lineHeight: 1, padding: "2px" }}>×</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: D ? "#cbd5e1" : "#64748b", display: "block", marginBottom: "6px" }}>Full name *</label>
                <input style={inp} placeholder="Alex Rivera" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: D ? "#cbd5e1" : "#64748b", display: "block", marginBottom: "6px" }}>Work email *</label>
                <input style={inp} type="email" placeholder="alex@company.io" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: D ? "#cbd5e1" : "#64748b", display: "block", marginBottom: "6px" }}>Company name</label>
                <input style={inp} placeholder="Acme Corp" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: D ? "#cbd5e1" : "#64748b", display: "block", marginBottom: "6px" }}>How can we help?</label>
                <textarea style={{ ...inp, height: "90px", resize: "vertical" }} placeholder="Tell us about your team size and needs..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "4px" }}>
                <button type="button" onClick={onClose}
                  style={{ padding: "9px 18px", fontSize: "13px", fontWeight: 600, borderRadius: "10px", border: D ? "1px solid rgba(255,255,255,0.12)" : "1px solid #e2e8f0", background: "none", color: D ? "#94a3b8" : "#64748b", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit"
                  style={{ padding: "9px 22px", fontSize: "13px", fontWeight: 600, borderRadius: "10px", border: "none", background: "#7c3aed", color: "#fff", cursor: "pointer" }}>
                  Send message
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: D ? "#fff" : "#1e293b", margin: "0 0 8px" }}>Message sent!</h3>
            <p style={{ fontSize: "14px", color: D ? "#94a3b8" : "#64748b", marginBottom: "24px" }}>
              Thanks {form.name}! Our team will reach out to <strong style={{ color: D ? "#c4b5fd" : "#7c3aed" }}>{form.email}</strong> within 24 hours.
            </p>
            <button onClick={onClose}
              style={{ padding: "10px 28px", fontSize: "14px", fontWeight: 600, borderRadius: "10px", border: "none", background: "#7c3aed", color: "#fff", cursor: "pointer" }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PricingPage({ dark, toggleDark, onBack, onGoRegister }) {
  const [yearly,       setYearly]       = useState(false);
  const [openFaq,      setOpenFaq]      = useState(null);
  const [showContact,  setShowContact]  = useState(false);

  const D    = dark;
  const bg   = D ? "bg-[#0a0c12]" : "bg-white";
  const txt  = D ? "text-white"   : "text-slate-800";
  const txtM = D ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`min-h-screen ${bg} ${txt}`} style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');`}</style>

      <PageNav dark={dark} toggleDark={toggleDark} onBack={onBack} title="Pricing"
        rightSlot={
          <button onClick={onGoRegister} className="text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors">
            Get started
          </button>
        }
      />

      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">

        {/* Heading + toggle */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Syne',sans-serif" }}>
            Simple, honest pricing
          </h1>
          <p className={`text-lg mb-8 ${txtM}`}>No hidden fees. No lock-in. Cancel anytime.</p>

          {/* Monthly / Yearly toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl"
               style={{ background: D ? "rgba(255,255,255,0.06)" : "#f1f5f9", border: D ? "1px solid rgba(255,255,255,0.10)" : "1px solid #e2e8f0" }}>
            <button onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${!yearly ? "bg-violet-600 text-white shadow" : txtM}`}>
              Monthly
            </button>
            <button onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${yearly ? "bg-violet-600 text-white shadow" : txtM}`}>
              Yearly
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">−25%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {PLANS.map((p, i) => (
            <div key={i} className="relative flex flex-col rounded-2xl p-7"
                 style={{
                   background:   p.pro ? (D ? "linear-gradient(160deg,rgba(124,58,237,0.12),#111320)" : "linear-gradient(160deg,rgba(124,58,237,0.06),#fff)") : D ? "#111320" : "#fff",
                   border:       p.pro ? "1px solid rgba(124,58,237,0.45)" : D ? "1px solid rgba(255,255,255,0.10)" : "1px solid #e2e8f0",
                   boxShadow:    p.pro ? "0 20px 40px rgba(124,58,237,0.12)" : "none",
                 }}>

              {/* Popular badge */}
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-violet-500/30">
                  {p.badge}
                </div>
              )}

              {/* Plan name */}
              <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${p.pro ? "text-violet-400" : txtM}`}>
                {p.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-2">
                {p.price.monthly === null ? (
                  <span className="text-3xl font-extrabold" style={{ fontFamily: "'Syne',sans-serif", color: D ? "#fff" : "#1e293b" }}>
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-4xl font-extrabold" style={{ fontFamily: "'Syne',sans-serif", color: D ? "#fff" : "#1e293b" }}>
                      ${yearly ? p.price.yearly : p.price.monthly}
                    </span>
                    <span className={`mb-1 text-sm ${txtM}`}>/mo</span>
                  </>
                )}
              </div>

              <p className={`text-sm mb-6 ${txtM}`}>{p.desc}</p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map((f, fi) => (
                  <li key={fi} className={`flex items-center gap-2.5 text-sm ${D ? "text-slate-300" : "text-slate-600"}`}>
                    <svg viewBox="0 0 16 16" fill="currentColor" className={`w-4 h-4 flex-shrink-0 ${p.pro ? "text-violet-400" : "text-emerald-500"}`}>
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <button
                onClick={p.price.monthly === null ? () => setShowContact(true) : onGoRegister}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={p.pro
                  ? { background: "#7c3aed", color: "#fff", border: "none" }
                  : { background: "none", color: D ? "#fff" : "#374151", border: D ? "1px solid rgba(255,255,255,0.15)" : "1px solid #e2e8f0", cursor: "pointer" }
                }
                onMouseEnter={e => { if (!p.pro) e.currentTarget.style.borderColor = "#7c3aed"; }}
                onMouseLeave={e => { if (!p.pro) e.currentTarget.style.borderColor = D ? "rgba(255,255,255,0.15)" : "#e2e8f0"; }}
              >
                {p.price.monthly === null ? "Contact sales" : p.price.monthly === 0 ? "Get started free" : "Start free trial"}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-8" style={{ fontFamily: "'Syne',sans-serif" }}>
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                   style={{ border: D ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0", background: D ? "#111320" : "#f8fafc" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors ${txt}`}
                  style={{ background: "none", border: "none", cursor: "pointer" }}>
                  {f.q}
                  <svg viewBox="0 0 20 20" fill="currentColor"
                       className={`w-4 h-4 flex-shrink-0 transition-transform ${txtM} ${openFaq === i ? "rotate-180" : ""}`}>
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className={`px-5 pb-4 text-sm leading-relaxed ${txtM}`}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Sales Modal */}
      {showContact && <ContactModal dark={dark} onClose={() => setShowContact(false)} />}
    </div>
  );
}