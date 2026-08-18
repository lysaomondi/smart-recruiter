import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected interviewee routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["interviewee"]} />}
        >
          <Route
            path="/interviewee"
            element={
              <div className="min-h-screen bg-[#0F1830] p-8 text-white">
                Interviewee Dashboard
              </div>
            }
          />
        </Route>

        {/* Protected recruiter routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["recruiter"]} />}
        >
          <Route
            path="/recruiter"
            element={
              <div className="min-h-screen bg-[#0F1830] p-8 text-white">
                Recruiter Dashboard
              </div>
            }
          />
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
    </BrowserRouter>
  );
}

export default AppRoutes;