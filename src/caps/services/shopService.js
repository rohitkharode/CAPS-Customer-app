// Shop discovery contract. The backend must provide shops, location and queue data.
import { apiClient } from "./apiClient";
import { CAPS_RUNTIME, integrationPending } from "./runtime";

export const shopService = {
  location: () => ({ label: "Location unavailable", available: false }),
  async list({ search = "", openOnly = false, sort = "closest" } = {}) {
    if (!CAPS_RUNTIME.backendConfigured) return [];
    return apiClient.get("/shops", { query: { search, openOnly, sort } });
  },
  get(id) {
    if (!CAPS_RUNTIME.backendConfigured || !id) return null;
    throw integrationPending("Shop details");
  },
  startingPrice(shop) {
    if (!shop?.pricing?.perPage) return null;
    return Math.min(
      ...Object.values(shop.pricing.perPage)
        .filter(Boolean)
        .map((p) => p.bw),
    );
  },
};
