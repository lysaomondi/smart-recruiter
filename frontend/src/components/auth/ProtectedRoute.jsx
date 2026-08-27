import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, isInitialized, user } = useSelector(
    (state) => state.auth,
  );

  if (!isInitialized)
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Checking authentication...
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
