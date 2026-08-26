import { useDispatch, useSelector } from "react-redux";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import { logout } from "../store/slices/authSlice";
import { setActiveTab } from "../store/slices/activeTabSlice";

import { logoutUser } from "../services/authService";


function Dashboard({ role }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const title =
    role === "recruiter"
      ? "Recruiter Dashboard"
      : "Interviewee Dashboard";


  async function handleLogout() {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logout());
      dispatch(setActiveTab("login"));
    }
  }


  return (
    <main className="min-h-screen bg-[#0F1830] p-6 text-[#F1F3F6] sm:p-10">
      <section className="mx-auto max-w-4xl rounded-2xl bg-[#1A2547] p-8 shadow-2xl">

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2FD5A6]">
          Smart Recruiter
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              {title}
            </h1>

            <p className="mt-2 text-[#F1F3F6]/60">
              Welcome back, {user?.full_name || user?.name}.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-[#F2A93B] px-4 py-2 font-semibold text-[#0F1830] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:ring-offset-2 focus:ring-offset-[#1A2547]"
          >
            Sign out
          </button>

        </div>

      </section>
    </main>
  );
}


function AppRoutes() {
  const activeTab = useSelector(
    (state) => state.activeTab
  );

  const {
    isAuthenticated,
    user,
  } = useSelector(
    (state) => state.auth
  );

  const userRole = user?.role?.toUpperCase();


  /*
   * REGISTER
   */

  if (activeTab === "register") {
    return <Register />;
  }


  /*
   * NOT AUTHENTICATED
   */

  if (!isAuthenticated || !user) {
    return <Login />;
  }


  /*
   * RECRUITER
   */

  if (userRole === "RECRUITER") {

    if (activeTab === "recruiter-dashboard") {
      return <Dashboard role="recruiter" />;
    }

    /*
     * Recruiters cannot access the interviewee dashboard.
     */

    return <Dashboard role="recruiter" />;
  }


  /*
   * INTERVIEWEE
   */

  if (userRole === "INTERVIEWEE") {

    if (activeTab === "interviewee-dashboard") {
      return <Dashboard role="interviewee" />;
    }

    /*
     * Interviewees cannot access the recruiter dashboard.
     */

    return <Dashboard role="interviewee" />;
  }


  /*
   * Unknown/invalid role.
   */

  return <Login />;
}


export default AppRoutes;