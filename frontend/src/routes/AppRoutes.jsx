import { Routes, Route } from "react-router-dom";
import Codewars from "../pages/Codewars";
import CandidateResults from "../pages/results/CandidateResults";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Codewars />} />
      <Route path="/codewars" element={<Codewars />} />
      <Route path="/results" element={<CandidateResults />} />
    </Routes>
  );
}

export default AppRoutes;