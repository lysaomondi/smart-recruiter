import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";

export default function AppRoutes() {
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Routes>
      <Route element={<DashboardLayout role="recruiter" onLogout={handleLogout} />}>
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      </Route>
      <Route path="/" element={<Navigate to="/recruiter/dashboard" replace />} />
    </Routes>
  );
}
