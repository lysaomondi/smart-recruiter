import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import CreateAssessment from "../pages/recruiter/CreateAssessment";
import EditAssessment from "../pages/recruiter/EditAssessment";
import ReviewAssessment from "../pages/recruiter/ReviewAssessment";

export default function AppRoutes() {
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Routes>
      <Route element={<DashboardLayout role="recruiter" onLogout={handleLogout} />}>
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/assessments/create" element={<CreateAssessment />} />
        <Route path="/recruiter/assessments/:id/edit" element={<EditAssessment />} />
        <Route path="/recruiter/assessments/:id/review" element={<ReviewAssessment />} />
      </Route>
      <Route path="/" element={<Navigate to="/recruiter/dashboard" replace />} />
    </Routes>
  );
}
