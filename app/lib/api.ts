const BASE_URL = "https://backend-uapaverse.onrender.com/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[${res.status}] ${text}`);
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

const api = {
  get:    <T>(path: string)                    => request<T>("GET",    path),
  post:   <T>(path: string, body: unknown)     => request<T>("POST",   path, body),
  put:    <T>(path: string, body: unknown)     => request<T>("PUT",    path, body),
  delete: <T>(path: string)                    => request<T>("DELETE", path),
};

export default api;
