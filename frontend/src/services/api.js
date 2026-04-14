// src/services/api.js
// Uses relative /api URLs — Vite proxy forwards them to http://localhost:5000
// No CORS issues because the request comes from the same origin

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("accessToken");

  const config = {
    method:  options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const res  = await fetch(`/api${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      const message =
        data?.message ||
        data?.errors?.[0]?.message ||
        `Error ${res.status}`;
      throw new Error(message);
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError") {
      throw new Error("Cannot connect to server. Make sure the backend is running on port 5000.");
    }
    throw err;
  }
}

export const authAPI = {
  register: (body) =>
    request("/auth/register", { method: "POST", body }),

  login: (body) =>
    request("/auth/login", { method: "POST", body }),

  logout: () =>
    request("/auth/logout", { method: "POST" }),

  getMe: () =>
    request("/auth/me"),

  forgotPassword: (email) =>
    request("/auth/forgot-password", { method: "POST", body: { email } }),

  resetPassword: (token, body) =>
    request(`/auth/reset-password/${token}`, { method: "POST", body }),

  updatePassword: (body) =>
    request("/auth/update-password", { method: "PUT", body }),

  verifyEmail: (token) =>
    request(`/auth/verify-email/${token}`),

  refresh: () =>
    request("/auth/refresh", { method: "POST" }),
};