import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ role = "recruiter", onLogout }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar role={role} onLogout={onLogout} />
      <div className="flex flex-1">
        <Sidebar role={role} />
        <div className="flex-1 bg-paper px-8 py-7 text-ink">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
