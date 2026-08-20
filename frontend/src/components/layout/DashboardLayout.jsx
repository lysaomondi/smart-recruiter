import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ role = "recruiter", onLogout }) {
  const isInterviewee = role === "interviewee";

  return (
    <div className={`flex min-h-screen flex-col ${isInterviewee ? "bg-slate-50" : ""}`}>
      <Navbar role={role} onLogout={onLogout} />
      <div className="flex flex-1">
        <Sidebar role={role} />
        <main className={`flex-1 ${isInterviewee ? "bg-slate-50 px-5 py-8 sm:px-8 lg:px-12" : "bg-paper px-8 py-7 text-ink"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
