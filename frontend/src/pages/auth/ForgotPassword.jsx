// ForgotPassword.jsx
import { useState } from "react";
import PageNav from "../../components/PageNav";

export default function ForgotPassword({ dark, toggleDark, onGoLogin, onGoLanding }) {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [apiError,setApiError]= useState("");

  const D      = dark;
  const bg     = D ? "bg-[#0e1017]"  : "bg-slate-100";
  const txtPri = D ? "text-white"    : "text-slate-800";
  const txtMut = D ? "text-slate-400": "text-slate-500";
  const labelCl= D ? "text-slate-300": "text-slate-600";
  const cardBrd= D ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0";
  const inp    = `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
    D ? "bg-[#1a1d2e] border-white/10 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:ring-violet-100"}`;

  async function handleSubmit(ev) {
    ev.preventDefault();
    setApiError("");
    if (!email.includes("@")) { setApiError("Enter a valid email address."); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/forgot-password", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setSent(true);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`} style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');`}</style>

      <PageNav dark={dark} toggleDark={toggleDark} onBack={onGoLanding} title="Forgot password"
        rightSlot={
          <button onClick={onGoLogin} className={`hidden sm:block text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${D ? "border-white/10 text-slate-300 hover:bg-white/10 hover:text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"}`}>
            Sign in
          </button>
        }
      />

      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-sm py-12">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-violet-500/30">
              <svg viewBox="0 0 20 20" fill="white" className="w-6 h-6">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className={`text-2xl font-bold tracking-tight ${txtPri}`}>Reset your password</h1>
            <p className={`text-sm mt-1 text-center ${txtMut}`}>Enter your email and we'll send you a reset link</p>
          </div>

          <div className="rounded-2xl p-6 shadow-xl" style={{ background: D ? "#111320" : "#fff", border: cardBrd }}>
            {!sent ? (
              <>
                {apiError && (
                  <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
                    {apiError}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`text-xs font-semibold mb-1.5 block ${labelCl}`}>Email address</label>
                    <input type="email" className={inp} placeholder="you@company.io"
                      value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                    {loading
                      ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Sending...</>
                      : "Send reset link"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">📬</div>
                <h3 className={`font-bold text-base mb-2 ${txtPri}`}>Check your inbox</h3>
                <p className={`text-sm mb-6 ${txtMut}`}>
                  If <strong className="text-violet-400">{email}</strong> has an account, a reset link is on its way.
                </p>
                <button onClick={onGoLogin} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors">
                  Back to sign in
                </button>
              </div>
            )}
          </div>

          <p className={`text-center text-sm mt-5 ${txtMut}`}>
            Remember your password?{" "}
            <button onClick={onGoLogin} className="text-violet-500 hover:text-violet-400 font-semibold transition-colors">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}