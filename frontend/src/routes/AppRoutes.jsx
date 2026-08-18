import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Smart Recruiter</h1>
            <p>Results Dashboard</p>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;