import { Routes, Route, Navigate } from "react-router-dom";
import Codewars from "../pages/Codewars";
import CandidateResults from "../pages/results/CandidateResults";
import ResultsDashboard from "../pages/results/ResultsDashboard";
import RecruiterResults from "../pages/recruiter/Results";
import MyResults from "../pages/interviewee/MyResults";

import DashboardLayout from "../components/layout/DashboardLayout";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import Assessments from "../pages/recruiter/Assessments";
import CreateAssessment from "../pages/recruiter/CreateAssessment";
import EditAssessment from "../pages/recruiter/EditAssessment";
import ReviewAssessment from "../pages/recruiter/ReviewAssessment";

function AppRoutes() {
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Routes>
      {/* Existing Codewars */}
      <Route path="/" element={<Navigate to="/recruiter/dashboard" replace />} />
      <Route path="/codewars" element={<Codewars />} />

      {/* Recruiter Dashboard & Assessments */}
      <Route
        element={
          <DashboardLayout role="recruiter" onLogout={handleLogout} />
        }
      >
        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/recruiter/assessments"
          element={<Assessments />}
        />

        <Route
          path="/recruiter/assessments/create"
          element={<CreateAssessment />}
        />

        <Route
          path="/recruiter/assessments/:id/edit"
          element={<EditAssessment />}
        />

        <Route
          path="/recruiter/assessments/:id/review"
          element={<ReviewAssessment />}
        />
      </Route>

      {/* Results */}
      <Route
        path="/recruiter/results"
        element={<RecruiterResults />}
      />

      <Route
        path="/recruiter/results/candidates/:id"
        element={<CandidateResults />}
      />

      <Route
        path="/interviewee/results"
        element={<MyResults />}
      />

      <Route
        path="/results"
        element={<ResultsDashboard />}
      />

      <Route
        path="/results/candidates/:id"
        element={<CandidateResults />}
      />
    </Routes>
  );
}

export default AppRoutes;
