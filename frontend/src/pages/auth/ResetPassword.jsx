// ResetPassword.jsx
import { useState } from "react";
import PageNav from "../../components/PageNav";

export default function ResetPassword({ dark, toggleDark, token, onGoLogin }) {
  const [form,     setForm]     = useState({ password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);
  const [errors,   setErrors]   = useState({});
  const [apiError, setApiError] = useState("");

  const D       = dark;
  const bg      = D ? "bg-[#0e1017]"  : "bg-slate-100";
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
      const res  = await fetch(`/api/auth/reset-password/${token}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password: form.password, confirmPassword: form.confirm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reset failed");
      setDone(true);
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

      <PageNav dark={dark} toggleDark={toggleDark} onBack={onGoLogin} title="Reset password"
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
            <h1 className={`text-2xl font-bold tracking-tight ${txtPri}`}>
              {done ? "Password reset!" : "Set new password"}
            </h1>
            <p className={`text-sm mt-1 text-center ${txtMut}`}>
              {done ? "You can now sign in with your new password" : "Must be at least 8 characters"}
            </p>
          </div>

          <div className="rounded-2xl p-6 shadow-xl" style={{ background: D ? "#111320" : "#fff", border: cardBrd }}>
            {done ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🎉</div>
                <p className={`text-sm mb-6 ${txtMut}`}>Your password has been updated successfully.</p>
                <button onClick={onGoLogin}
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors">
                  Sign in now
                </button>
              </div>
            ) : (
              <>
                {apiError && (
                  <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
                    {apiError}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`text-xs font-semibold mb-1.5 block ${labelCl}`}>New password</label>
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
                    <label className={`text-xs font-semibold mb-1.5 block ${labelCl}`}>Confirm new password</label>
                    <input type={showPass ? "text" : "password"} className={inp(!!errors.confirm)}
                      placeholder="Repeat your password" value={form.confirm}
                      onChange={e => setForm({ ...form, confirm: e.target.value })} />
                    {errors.confirm && <p className="text-xs text-rose-400 mt-1">{errors.confirm}</p>}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                    {loading
                      ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Resetting...</>
                      : "Reset password"}
                  </button>
                </form>
              </>
            )}
          </div>

          {!done && (
            <p className={`text-center text-sm mt-5 ${txtMut}`}>
              Remember your password?{" "}
              <button onClick={onGoLogin} className="text-violet-500 hover:text-violet-400 font-semibold transition-colors">Sign in</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}