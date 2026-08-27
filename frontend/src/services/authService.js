import { api } from "./api";

/** POST /api/auth/register/ */
export async function register({ fullName, email, password, passwordConfirmation, role }) {
  return api.post("/auth/register/", {
    full_name: fullName,
    email,
    password,
    password_confirmation: passwordConfirmation,
    role,
  });
}

/** POST /api/auth/login/ — returns { access, refresh, user } */
export async function login({ email, password }) {
  return api.post("/auth/login/", { email, password });
}

/** POST /api/auth/logout/ — blacklists the refresh token */
export async function logout(refreshToken) {
  return api.post("/auth/logout/", { refresh: refreshToken });
}

/** GET /api/auth/me/ */
export async function fetchMe() {
  return api.get("/auth/me/");
}
