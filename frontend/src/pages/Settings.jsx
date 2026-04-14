// Settings.jsx
import { useState } from "react";
import { useApp }   from "../context/AppContext";
import { getTheme } from "../data/constants";
import { Avatar }   from "../components/Avatar";

function Toggle({ on, onToggle, dark }) {
  return (
    <button onClick={onToggle}
      className={`relative rounded-full transition-colors flex-shrink-0 ${on ? "bg-violet-600" : dark ? "bg-white/15" : "bg-slate-300"}`}
      style={{ height: "22px", width: "40px" }}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? "left-[20px]" : "left-0.5"}`} />
    </button>
  );
}

function Section({ title, children, dark, T }) {
  return (
    <div className={`border rounded-2xl overflow-hidden ${T.cardCls}`}>
      <div className={`px-5 py-4 border-b ${T.brdCls}`}>
        <h2 className={`font-bold text-sm ${T.txtPri}`}>{title}</h2>
      </div>
      <div className="divide-y" style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, desc, control, T }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 gap-4">
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${T.txtPri}`}>{label}</p>
        {desc && <p className={`text-xs mt-0.5 ${T.txtMut}`}>{desc}</p>}
      </div>
      {control}
    </div>
  );
}

export default function Settings({ user }) {
  const { dark, setDark, tasks, accent, setAccent } = useApp();
  const T = getTheme(dark);

  // Profile state — seeded from real user
  const [name,    setName]    = useState(user?.name  || "");
  const [nameMsg, setNameMsg] = useState("");
  const [nameSaving, setNameSaving] = useState(false);

  // Password state
  const [pwForm,   setPwForm]   = useState({ current: "", next: "", confirm: "" });
  const [pwMsg,    setPwMsg]    = useState({ text: "", error: false });
  const [pwSaving, setPwSaving] = useState(false);
  const [showPw,   setShowPw]   = useState(false);

  // Prefs
  const [notif,   setNotif]   = useState(true);
  const [emailD,  setEmailD]  = useState(false);
  const [compact, setCompact] = useState(false);
  const [sound,   setSound]   = useState(true);

  async function saveName(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setNameSaving(true);
    setNameMsg("");
    try {
      const token = localStorage.getItem("accessToken");
      const res   = await fetch("/api/auth/update-profile", {
        method:  "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update");
      setNameMsg("Name updated!");
    } catch (err) {
      setNameMsg(err.message);
    } finally {
      setNameSaving(false);
      setTimeout(() => setNameMsg(""), 3000);
    }
  }

  async function savePassword(e) {
    e.preventDefault();
    setPwMsg({ text: "", error: false });
    if (pwForm.next.length < 8)          { setPwMsg({ text: "Password must be at least 8 characters", error: true }); return; }
    if (!/[A-Z]/.test(pwForm.next))      { setPwMsg({ text: "Password needs an uppercase letter", error: true }); return; }
    if (!/[0-9]/.test(pwForm.next))      { setPwMsg({ text: "Password needs a number", error: true }); return; }
    if (pwForm.next !== pwForm.confirm)  { setPwMsg({ text: "Passwords don't match", error: true }); return; }
    setPwSaving(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res   = await fetch("/api/auth/update-password", {
        method:  "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");
      setPwMsg({ text: "Password updated successfully!", error: false });
      setPwForm({ current: "", next: "", confirm: "" });
    } catch (err) {
      setPwMsg({ text: err.message, error: true });
    } finally {
      setPwSaving(false);
    }
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "taskflow-export.json"; a.click();
    URL.revokeObjectURL(url);
  }

  const inp = `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
    dark ? "bg-[#1a1d2e] border-white/10 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
         : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:ring-violet-100"}`;

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-5">
      <div>
        <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${T.txtPri}`}>Settings</h1>
        <p className={`text-sm mt-1 ${T.txtMut}`}>Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <Section title="Profile" dark={dark} T={T}>
        <form onSubmit={saveName} className="px-5 py-5 flex items-center gap-4">
          <Avatar name={name || user?.name || "U"} size="lg" />
          <div className="flex-1 min-w-0 space-y-2">
            <input className={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            <input className={inp} value={user?.email || ""} disabled
              style={{ opacity: 0.6, cursor: "not-allowed" }} placeholder="Email" />
          </div>
        </form>
        {nameMsg && (
          <div className="mx-5 mb-4 px-4 py-2 rounded-lg text-xs font-medium"
            style={{ background: nameMsg.includes("!") ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)",
                     color: nameMsg.includes("!") ? "#34d399" : "#f87171" }}>
            {nameMsg}
          </div>
        )}
        <Row label="Email" desc={user?.email || ""} T={T}
          control={<span className={`text-xs px-2 py-1 rounded-lg ${dark ? "bg-white/8 text-slate-400" : "bg-slate-100 text-slate-500"}`}>Read only</span>} />
        <div className="px-5 py-3 flex justify-end">
          <button onClick={saveName} disabled={nameSaving}
            className="text-xs font-semibold px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white rounded-lg transition-colors">
            {nameSaving ? "Saving..." : "Save name"}
          </button>
        </div>
      </Section>

      {/* Password */}
      <Section title="Change Password" dark={dark} T={T}>
        <form onSubmit={savePassword} className="px-5 py-5 space-y-3">
          {pwMsg.text && (
            <div className="px-4 py-2 rounded-lg text-xs font-medium"
              style={{ background: pwMsg.error ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.12)",
                       color: pwMsg.error ? "#f87171" : "#34d399" }}>
              {pwMsg.text}
            </div>
          )}
          <div className="relative">
            <input type={showPw ? "text" : "password"} className={inp} placeholder="Current password"
              value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} />
          </div>
          <input type={showPw ? "text" : "password"} className={inp} placeholder="New password (min. 8 chars)"
            value={pwForm.next} onChange={e => setPwForm({ ...pwForm, next: e.target.value })} />
          <input type={showPw ? "text" : "password"} className={inp} placeholder="Confirm new password"
            value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} />
          <div className="flex items-center justify-between pt-1">
            <label className={`flex items-center gap-2 text-xs cursor-pointer ${T.txtMut}`}>
              <input type="checkbox" checked={showPw} onChange={() => setShowPw(s => !s)} className="accent-violet-600" />
              Show passwords
            </label>
            <button type="submit" disabled={pwSaving}
              className="text-xs font-semibold px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white rounded-lg transition-colors">
              {pwSaving ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </Section>

      {/* Appearance */}
      <Section title="Appearance" dark={dark} T={T}>
        <Row label="Dark Mode" desc="Use dark color scheme" T={T}
          control={<Toggle on={dark} onToggle={() => setDark(d => !d)} dark={dark} />} />
        <Row label="Compact View" desc="Reduce spacing in task lists" T={T}
          control={<Toggle on={compact} onToggle={() => setCompact(c => !c)} dark={dark} />} />
        <Row label="Accent Color" desc="Primary brand color" T={T}
          control={
            <div className="flex gap-1.5">
              {[
                { color: "#7c3aed", bg: "bg-violet-500"  },
                { color: "#06b6d4", bg: "bg-cyan-500"    },
                { color: "#f43f5e", bg: "bg-rose-500"    },
                { color: "#f59e0b", bg: "bg-amber-500"   },
                { color: "#10b981", bg: "bg-emerald-500" },
              ].map((a, i) => (
                <button key={i} onClick={() => setAccent(a.color)}
                  className={`w-5 h-5 rounded-full ${a.bg} transition-transform hover:scale-110`}
                  style={accent === a.color ? { outline: `2px solid ${a.color}`, outlineOffset: "2px" } : {}} />
              ))}
            </div>
          }
        />
      </Section>

      {/* Notifications */}
      <Section title="Notifications" dark={dark} T={T}>
        <Row label="Push Notifications" desc="Receive in-app alerts" T={T}
          control={<Toggle on={notif} onToggle={() => setNotif(n => !n)} dark={dark} />} />
        <Row label="Email Digests" desc="Daily task summary by email" T={T}
          control={<Toggle on={emailD} onToggle={() => setEmailD(e => !e)} dark={dark} />} />
        <Row label="Sound Effects" desc="Play sound on task completion" T={T}
          control={<Toggle on={sound} onToggle={() => setSound(s => !s)} dark={dark} />} />
      </Section>

      {/* Danger zone */}
      <Section title="Danger Zone" dark={dark} T={T}>
        <Row label="Export Data" desc="Download all your tasks as JSON" T={T}
          control={
            <button onClick={exportData}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${dark ? "border-white/15 text-slate-300 hover:bg-white/8" : "border-slate-200 text-slate-600 hover:bg-slate-100"}`}>
              Export
            </button>
          }
        />
        <Row label="Delete Account" desc="Permanently delete your account and data" T={T}
          control={
            <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-500/40 text-rose-500 hover:bg-rose-500/10 transition-colors">
              Delete
            </button>
          }
        />
      </Section>
    </div>
  );
}