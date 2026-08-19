import { Routes, Route } from "react-router-dom";
import Codewars from "../pages/Codewars";
import CandidateResults from "../pages/results/CandidateResults";
import ResultsDashboard from "../pages/results/ResultsDashboard";
import RecruiterResults from "../pages/recruiter/Results";
import MyResults from "../pages/interviewee/MyResults";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Codewars />} />
      <Route path="/codewars" element={<Codewars />} />

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