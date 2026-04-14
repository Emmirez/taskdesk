// Register.jsx
import { useState } from "react";
import PageNav from "../../components/PageNav";

export default function Register({ dark, toggleDark, onRegister, onGoLogin, onGoLanding }) {
  const [form,     setForm]     = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const [apiError, setApiError] = useState("");

  const D       = dark;
  const bg      = D ? "bg-[#0e1017]"  : "bg-slate-100";
  const card    = D ? "bg-[#111320]"  : "bg-white";
  const txtPri  = D ? "text-white"    : "text-slate-800";
  const txtMut  = D ? "text-slate-400": "text-slate-500";
  const labelCl = D ? "text-slate-300": "text-slate-600";
  const cardBrd = D ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0";

  const inp = (hasErr) =>
    `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
      hasErr
        ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20 " +
          (D ? "bg-[#1a1d2e] text-white placeholder-slate-500"
             : "bg-slate-50 text-slate-800 placeholder-slate-400")
        : D ? "bg-[#1a1d2e] border-white/10 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
            : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:ring-violet-100"}`;

  function validate() {
    const e = {};
    if (!form.name.trim())                 e.name     = "Name is required";
    if (!form.email.includes("@"))         e.email    = "Enter a valid email";
    if (form.password.length < 8)          e.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(form.password)) e.password = "Password needs an uppercase letter";
    else if (!/[0-9]/.test(form.password)) e.password = "Password needs a number";
    if (form.password !== form.confirm)    e.confirm  = "Passwords don't match";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setApiError("");
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("accessToken", data.accessToken);
      onRegister(data.user);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const strength = (() => {
    const p = form.password; if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["","Weak","Fair","Good","Strong"][strength];
  const strengthColor = ["","bg-rose-500","bg-amber-400","bg-cyan-400","bg-emerald-500"][strength];

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`} style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');`}</style>

      <PageNav dark={dark} toggleDark={toggleDark} onBack={onGoLanding} title="Create account"
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
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className={`text-2xl font-bold tracking-tight ${txtPri}`}>Create your account</h1>
            <p className={`text-sm mt-1 ${txtMut}`}>Start managing tasks with your team</p>
          </div>

          <div className="rounded-2xl p-6 shadow-xl" style={{ background: D ? "#111320" : "#fff", border: cardBrd }}>
            {apiError && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${labelCl}`}>Full name</label>
                <input type="text" className={inp(!!errors.name)} placeholder="Alex Rivera"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${labelCl}`}>Email address</label>
                <input type="email" className={inp(!!errors.email)} placeholder="you@company.io"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${labelCl}`}>Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} className={`${inp(!!errors.password)} pr-10`}
                    placeholder="Min. 8 characters" value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })} />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${txtMut} hover:text-violet-400`}>
                    {showPass
                      ? <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/></svg>
                      : <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>}
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : D ? "bg-white/10" : "bg-slate-200"}`} />
                      ))}
                    </div>
                    <p className={`text-xs ${txtMut}`}>Strength: <span className="font-semibold">{strengthLabel}</span></p>
                  </div>
                )}
                {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${labelCl}`}>Confirm password</label>
                <input type={showPass ? "text" : "password"} className={inp(!!errors.confirm)}
                  placeholder="Repeat your password" value={form.confirm}
                  onChange={e => setForm({ ...form, confirm: e.target.value })} />
                {errors.confirm && <p className="text-xs text-rose-400 mt-1">{errors.confirm}</p>}
              </div>

              <div className="flex items-start gap-2.5">
                <input type="checkbox" id="terms" required className="w-4 h-4 mt-0.5 rounded accent-violet-600 cursor-pointer flex-shrink-0" />
                <label htmlFor="terms" className={`text-xs cursor-pointer ${txtMut}`}>
                  I agree to the <span className="text-violet-500 font-semibold">Terms of Service</span> and <span className="text-violet-500 font-semibold">Privacy Policy</span>
                </label>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading
                  ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Creating account...</>
                  : "Create account"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ background: D ? "rgba(255,255,255,0.08)" : "#e2e8f0" }} />
              <span className={`text-xs ${txtMut}`}>or sign up with</span>
              <div className="flex-1 h-px" style={{ background: D ? "rgba(255,255,255,0.08)" : "#e2e8f0" }} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Google", icon: <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
                { name: "GitHub",  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
              ].map((s, i) => (
                <button key={i} className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${D ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-800"}`}
                  style={{ border: D ? "1px solid rgba(255,255,255,0.10)" : "1px solid #e2e8f0" }}>
                  {s.icon}{s.name}
                </button>
              ))}
            </div>
          </div>

          <p className={`text-center text-sm mt-5 ${txtMut}`}>
            Already have an account?{" "}
            <button onClick={onGoLogin} className="text-violet-500 hover:text-violet-400 font-semibold transition-colors">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}