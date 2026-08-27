const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// TEMPORARY — until Member 1's login UI exists, the access token is read
// from localStorage. Set it manually in the browser console for testing:
//   localStorage.setItem("access_token", "eyJ...")
function getAuthHeader() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function getErrorMessage(data, status) {
  if (typeof data === "string") return data;
  if (data?.detail || data?.error || data?.message) {
    return data.detail || data.error || data.message;
  }
  return data ? JSON.stringify(data) : `Request failed with status ${status}`;
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return false;

  const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.access) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return false;
  }

  localStorage.setItem("access_token", data.access);
  if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
  return true;
}

async function request(path, { method = "GET", body, retry = true } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null; // DELETE returns no content

  const data = await res.json().catch(() => null);

  if (res.status === 401 && retry && !path.includes("/auth/")) {
    if (await refreshAccessToken()) {
      return request(path, { method, body, retry: false });
    }
  }

  if (!res.ok) {
    const error = new Error(getErrorMessage(data, res.status));
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};
