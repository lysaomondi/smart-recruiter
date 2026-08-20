import React from "react";
import { NavLink } from "react-router-dom";

const LINKS = {
  recruiter: [
    { to: "/recruiter/dashboard", label: "Dashboard" },
    { to: "/recruiter/assessments/create", label: "Create assessment" },
    { to: "/recruiter/results", label: "Candidates & scores" },
    { to: "/recruiter/review-feedback", label: "Review & feedback" },
    { to: "/recruiter/statistics", label: "Statistics" },
  ],
  interviewee: [
    { to: "/interviewee/dashboard", label: "My assessments", end: true },
    { to: "/interviewee/trial", label: "Trial assessment" },
    { to: "/interviewee/assessment/ia1/instructions", label: "Take assessment" },
    { to: "/interviewee/results", label: "Feedback" },
  ],
};

const linkClass = ({ isActive }) =>
  `flex items-center rounded-md px-2.5 py-2 text-sm ${
    isActive
      ? "bg-[#1B7F63] font-semibold text-paper"
      : "text-[#8C97BE] hover:bg-[#212D54] hover:text-paper"
  }`;

export default function Sidebar({ role = "recruiter" }) {
  const links = LINKS[role] || [];

  return (
    <div className="flex w-[210px] flex-shrink-0 flex-col gap-0.5 border-r border-[#2E3A63] bg-panel p-3">
      <div className="px-2.5 pb-1.5 pt-2.5 font-mono text-[10px] uppercase tracking-widest text-[#8C97BE]">
        {role === "recruiter" ? "Recruiter" : "Interviewee"}
      </div>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
          {link.label}
        </NavLink>
      ))}
      {role === "recruiter" && (
        <>
          <div className="my-5 border-t border-[#2E3A63]" />
          <div className="px-2.5 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-[#8C97BE]">
            Account
          </div>
          <button
            type="button"
            className="flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm text-[#8C97BE] hover:bg-[#212D54] hover:text-paper"
          >
            Settings
          </button>
        </>
      )}
    </div>
  );
}
