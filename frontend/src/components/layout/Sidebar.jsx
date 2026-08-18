import React from "react";
import { NavLink } from "react-router-dom";

const LINKS = {
  recruiter: [
    { to: "/recruiter/dashboard", label: "Dashboard", icon: "▤" },
    { to: "/recruiter/assessments/create", label: "Create assessment", icon: "✎" },
  ],
  interviewee: [],
};

const linkClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm ${
    isActive
      ? "bg-panel-2 font-semibold text-brand-teal"
      : "text-muted hover:bg-panel-2 hover:text-paper"
  }`;

export default function Sidebar({ role = "recruiter" }) {
  const links = LINKS[role] || [];

  return (
    <div className="flex w-[210px] flex-shrink-0 flex-col gap-0.5 border-r border-line bg-panel p-3">
      <div className="px-2.5 pb-1.5 pt-2.5 font-mono text-[10px] uppercase tracking-widest text-muted">
        {role === "recruiter" ? "Recruiter" : "Interviewee"}
      </div>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={linkClass}>
          <span className="w-4 text-center font-mono text-[13px]">{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
