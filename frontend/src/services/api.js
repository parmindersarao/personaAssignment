const API_BASE = import.meta.env.VITE_API_BASE_URL;

function getApiKey() {
  return sessionStorage.getItem("app_api_key");
}

export async function fetchPersonas() {
  const res = await fetch(`${API_BASE}/api/personas`, {
    headers: { "x-api-key": getApiKey() },
  });
  if (!res.ok) throw new Error("Failed to load personas");
  return res.json();
}

export async function sendMessage(personaId, message, history) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": getApiKey(),
    },
    body: JSON.stringify({ persona_id: personaId, message, history }),
  });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error("Failed to get response");
  return res.json();
}