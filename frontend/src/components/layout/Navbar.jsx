import React from "react";

export default function Navbar({ role = "recruiter", onLogout }) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-panel px-6 py-3.5">
      <div className="flex items-center gap-2.5">
       
        <div>
          <div className="text-[15px] font-extrabold tracking-tight text-paper">Smart Recruiter</div>
          <div className="font-mono text-[11px] tracking-wide text-muted">TECHNICAL ASSESSMENT PLATFORM</div>
        </div>
      </div>
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
          {role === "recruiter" ? "Recruiter" : "Interviewee"} view
        </div>
        <button
          onClick={onLogout}
          className="rounded-lg border border-line px-3 py-1.5 text-xs text-paper hover:bg-panel-2"
        >
          ↩ Log out
        </button>
      </div>
    </div>
  );
}
