import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Codewars from "../pages/Codewars";
import LandingPage from "../pages/LandingPage";
import CandidateResults from "../pages/results/CandidateResults";
import ResultsDashboard from "../pages/results/ResultsDashboard";
import RecruiterResults from "../pages/recruiter/Results";
import MyResults from "../pages/interviewee/MyResults";
import IntervieweeDashboard from "../pages/interviewee/IntervieweeDashboard";
// TEMPORARILY DISABLED — these three pages depend on assessmentSlice thunks
// (fetchAssessmentDetails, startAssessmentAttempt, etc.) that were accidentally
// merged in and have since been removed. Member 3 needs to build a real
//import AssessmentInstructions from "../pages/interviewee/AssessmentInstructions";
//import TakeAssessment from "../pages/interviewee/TakeAssessment";
//import TrialAssessment from "../pages/interviewee/TrialAssessment";

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

      <Route
        element={<ProtectedRoute allowedRoles={["recruiter", "interviewee"]} />}
      >
        <Route path="/codewars" element={<Codewars />} />
      </Route>

      {/* Recruiter protected routes */}
      <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
        <Route
          element={<DashboardLayout role="recruiter" onLogout={handleLogout} />}
        >
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />

          <Route path="/recruiter/assessments" element={<Assessments />} />

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
          <Route
            path="/recruiter/results/candidates/:id"
            element={<CandidateResults />}
          />
          <Route
            path="/recruiter/review-feedback"
            element={<ReviewFeedback />}
          />
          <Route path="/recruiter/statistics" element={<Statistics />} />
        </Route>
      </Route>

      {/* Interviewee protected routes */}
      <Route element={<ProtectedRoute allowedRoles={["interviewee"]} />}>
        <Route
          element={
            <DashboardLayout role="interviewee" onLogout={handleLogout} />
          }
        >
          <Route
            path="/interviewee/dashboard"
            element={<IntervieweeDashboard />}
          />
          <Route path="/interviewee/results" element={<MyResults />} />
          //TEMPORARILY DISABLED, see import comment above
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

      <Route path="/" element={<LandingPage />} />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
