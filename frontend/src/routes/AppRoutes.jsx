import { Routes, Route } from "react-router-dom";
import Codewars from "../pages/Codewars";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Codewars />} />
      <Route path="/codewars" element={<Codewars />} />
    </Routes>
  );
}

export default AppRoutes;