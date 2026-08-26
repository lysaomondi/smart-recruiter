const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// TEMPORARY — until Member 1's login UI exists, the access token is read
// from localStorage. Set it manually in the browser console for testing:
//   localStorage.setItem("access_token", "eyJ...")
function getAuthHeader() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body } = {}) {
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

  if (!res.ok) {
    const message =
      (data && (data.detail || data.error || JSON.stringify(data))) ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};
