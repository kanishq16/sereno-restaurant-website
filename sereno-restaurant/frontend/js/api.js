// Base URL of the backend API. Change this if you deploy the backend elsewhere.
const API_BASE = window.location.origin.includes("5000")
  ? "/api"
  : "http://localhost:5000/api";

async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}
