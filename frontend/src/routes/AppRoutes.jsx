import { Routes, Route } from "react-router-dom";

import Codewars from "../pages/Codewars";

import RecruiterResults from "../pages/recruiter/Results";
import CandidateResult from "../pages/recruiter/CandidateResult";
import CandidateFeedback from "../pages/recruiter/CandidateFeedback";

import MyResults from "../pages/interviewee/MyResults";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/recruiter/results"
        element={<RecruiterResults />}
      />

      <Route
        path="/recruiter/results/:candidateId"
        element={<CandidateResult />}
      />

      <Route
        path="/recruiter/results/:candidateId/feedback"
        element={<CandidateFeedback />}
      />

      <Route
        path="/interviewee/results"
        element={<MyResults />}
      />

      <Route
        path="/codewars"
        element={<Codewars />}
      />
    </Routes>
  );
}