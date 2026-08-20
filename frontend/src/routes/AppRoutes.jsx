import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Codewars from "../pages/Codewars";
import CandidateResults from "../pages/results/CandidateResults";
import ResultsDashboard from "../pages/results/ResultsDashboard";
import RecruiterResults from "../pages/recruiter/Results";
import MyResults from "../pages/interviewee/MyResults";
import IntervieweeDashboard from "../pages/interviewee/IntervieweeDashboard";
import AssessmentInstructions from "../pages/interviewee/AssessmentInstructions";
import TakeAssessment from "../pages/interviewee/TakeAssessment";
import TrialAssessment from "../pages/interviewee/TrialAssessment";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { logout } from "../store/slices/authSlice";

import DashboardLayout from "../components/layout/DashboardLayout";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import Assessments from "../pages/recruiter/Assessments";
import CreateAssessment from "../pages/recruiter/CreateAssessment";
import EditAssessment from "../pages/recruiter/EditAssessment";
import ReviewAssessment from "../pages/recruiter/ReviewAssessment";
import Statistics from "../pages/recruiter/Statistics";
import ReviewFeedback from "../pages/recruiter/ReviewFeedback";

function AppRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/codewars" element={<Codewars />} />

      {/* Recruiter protected routes */}
      <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
        <Route
          element={
            <DashboardLayout
              role="recruiter"
              onLogout={handleLogout}
            />
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
          <Route path="/recruiter/results" element={<RecruiterResults />} />
          <Route path="/recruiter/results/candidates/:id" element={<CandidateResults />} />
          <Route path="/recruiter/review-feedback" element={<ReviewFeedback />} />
          <Route path="/recruiter/statistics" element={<Statistics />} />
        </Route>
      </Route>

      {/* Results */}
      <Route
        path="/results"
        element={<ResultsDashboard />}
      />

      <Route
        path="/results/candidates/:id"
        element={<CandidateResults />}
      />

      {/* Interviewee protected routes */}
      <Route element={<ProtectedRoute allowedRoles={["interviewee"]} />}>
        <Route
          element={<DashboardLayout role="interviewee" onLogout={handleLogout} />}
        >
          <Route path="/interviewee/dashboard" element={<IntervieweeDashboard />} />
          <Route path="/interviewee/results" element={<MyResults />} />
          <Route
            path="/interviewee/assessment/:assessmentId/instructions"
            element={<AssessmentInstructions />}
          />
          <Route
            path="/interviewee/assessment/:assessmentId/take"
            element={<TakeAssessment />}
          />
          <Route path="/interviewee/trial" element={<TrialAssessment />} />
        </Route>
      </Route>

      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
