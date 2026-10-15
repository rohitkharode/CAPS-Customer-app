import { CAPS_RUNTIME, integrationPending } from "./runtime";

async function request(path, { method = "GET", body, headers = {}, signal } = {}) {
  if (!CAPS_RUNTIME.backendConfigured) throw integrationPending("Backend API");
  const response = await fetch(`${CAPS_RUNTIME.apiBaseUrl}${path}`, {
    method,
    signal,
    headers: {
      Accept: "application/json",
      ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body instanceof FormData ? body : body === undefined ? undefined : JSON.stringify(body),
  });
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();
  if (!response.ok) {
    const message =
      typeof payload === "object" && payload?.message
        ? payload.message
        : `Request failed (${response.status}).`;
    const error = new Error(message);
    error.status = response.status;
    error.details = payload;
    throw error;
  }
  return payload;
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  upload: (path, formData, options) =>
    request(path, { ...options, method: "POST", body: formData }),
};
