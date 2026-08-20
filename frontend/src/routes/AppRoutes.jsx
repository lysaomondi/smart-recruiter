import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AssessmentInstructions from '../pages/interviewee/AssessmentInstructions';
import IntervieweeDashboard from '../pages/interviewee/IntervieweeDashboard';
import MyResults from '../pages/interviewee/MyResults';
import TakeAssessment from '../pages/interviewee/TakeAssessment';
import TrialAssessment from '../pages/interviewee/TrialAssessment';
import CreateAssessment from '../pages/recruiter/CreateAssessment';
import EditAssessment from '../pages/recruiter/EditAssessment';
import RecruiterDashboard from '../pages/recruiter/RecruiterDashboard';
import RecruiterResults from '../pages/recruiter/Results';
import Assessments from '../pages/recruiter/Assessments';
import ReviewAssessment from '../pages/recruiter/ReviewAssessment';

const intervieweeRoute = (element) => <ProtectedRoute role="interviewee">{element}</ProtectedRoute>;
const recruiterRoute = (element) => <ProtectedRoute role="recruiter">{element}</ProtectedRoute>;

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/interviewee/dashboard" element={intervieweeRoute(<IntervieweeDashboard />)} />
      <Route path="/interviewee/assessment/:assessmentId/instructions" element={intervieweeRoute(<AssessmentInstructions />)} />
      <Route path="/interviewee/assessment/:assessmentId/take" element={intervieweeRoute(<TakeAssessment />)} />
      <Route path="/interviewee/trial" element={intervieweeRoute(<TrialAssessment />)} />
      <Route path="/interviewee/results" element={intervieweeRoute(<MyResults />)} />

      <Route path="/recruiter/dashboard" element={recruiterRoute(<RecruiterDashboard />)} />
      <Route path="/recruiter/assessments" element={recruiterRoute(<Assessments />)} />
      <Route path="/recruiter/assessments/create" element={recruiterRoute(<CreateAssessment />)} />
      <Route path="/recruiter/assessments/:id/edit" element={recruiterRoute(<EditAssessment />)} />
      <Route path="/recruiter/assessments/:id/review" element={recruiterRoute(<ReviewAssessment />)} />
      <Route path="/recruiter/results" element={recruiterRoute(<RecruiterResults />)} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
