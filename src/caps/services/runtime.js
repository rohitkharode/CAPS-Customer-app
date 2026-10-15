const configuredBaseUrl = String(import.meta.env?.VITE_CAPS_API_BASE_URL || "")
  .trim()
  .replace(/\/+$/, "");

export const CAPS_RUNTIME = Object.freeze({
  apiBaseUrl: configuredBaseUrl,
  backendConfigured: Boolean(configuredBaseUrl),
  mode: configuredBaseUrl ? "backend-pending" : "local-only",
});

export function integrationPending(capability) {
  const error = new Error(
    `${capability} is not connected. Set VITE_CAPS_API_BASE_URL after the backend contract is agreed.`,
  );
  error.code = "CAPS_INTEGRATION_PENDING";
  return error;
}
