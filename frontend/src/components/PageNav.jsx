
//  PageNav.jsx  –  shared navbar for sub-pages


export default function PageNav({ dark, toggleDark, onBack, title, rightSlot }) {
  const D      = dark;
  const navBg  = D ? "bg-[#0a0c12]/90 border-white/5" : "bg-white/90 border-slate-200";
  const txtMut = D ? "text-slate-400" : "text-slate-500";
  const txtPri = D ? "text-white"     : "text-slate-800";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-10 h-16 border-b backdrop-blur-xl transition-colors duration-300 ${navBg}`}>

      {/* ← Back */}
      <button onClick={onBack}
        className={`flex items-center gap-2 text-sm font-semibold transition-colors hover:text-violet-400 ${txtMut}`}>
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
        </svg>
        Home
      </button>

      {/* Center — page title */}
      <span className={`font-extrabold text-base tracking-tight ${txtPri}`}
            style={{ fontFamily: "'Syne',sans-serif" }}>
        {title}
      </span>

      {/* Right — dark toggle + compact action */}
      <div className="flex items-center gap-1.5">
        <button onClick={toggleDark}
          title={D ? "Switch to light mode" : "Switch to dark mode"}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0 ${D ? "hover:bg-white/8 text-amber-300" : "hover:bg-slate-100 text-slate-500"}`}>
          {D
            ? <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/></svg>
            : <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
          }
        </button>

        {/* rightSlot — kept compact by the pages themselves */}
        {rightSlot}
      </div>
    </nav>
  );
}