import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { restoreSession } from "./store/slices/authSlice";
import api from "./services/api";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function restoreAuthentication() {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        return;
      }

      try {
        const response = await api.get("/auth/me/");

        localStorage.setItem(
          "currentUser",
          JSON.stringify(response.data)
        );

        dispatch(restoreSession(response.data));
      } catch (error) {
        console.error("Session restoration failed:", error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currentUser");
      }
    }

    restoreAuthentication();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;