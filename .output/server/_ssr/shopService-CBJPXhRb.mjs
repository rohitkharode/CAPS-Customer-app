import { _ as integrationPending, a as CAPS_RUNTIME } from "./AppShell-B3q1XuMP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shopService-CBJPXhRb.js
async function request(path, { method = "GET", body, headers = {}, signal } = {}) {
	if (!CAPS_RUNTIME.backendConfigured) throw integrationPending("Backend API");
	const response = await fetch(`${CAPS_RUNTIME.apiBaseUrl}${path}`, {
		method,
		signal,
		headers: {
			Accept: "application/json",
			...body instanceof FormData ? {} : { "Content-Type": "application/json" },
			...headers
		},
		body: body instanceof FormData ? body : body === void 0 ? void 0 : JSON.stringify(body)
	});
	const payload = (response.headers.get("content-type") || "").includes("application/json") ? await response.json() : await response.text();
	if (!response.ok) {
		const message = typeof payload === "object" && payload?.message ? payload.message : `Request failed (${response.status}).`;
		const error = new Error(message);
		error.status = response.status;
		error.details = payload;
		throw error;
	}
	return payload;
}
var apiClient = {
	get: (path, options) => request(path, {
		...options,
		method: "GET"
	}),
	post: (path, body, options) => request(path, {
		...options,
		method: "POST",
		body
	}),
	upload: (path, formData, options) => request(path, {
		...options,
		method: "POST",
		body: formData
	})
};
var shopService = {
	location: () => ({
		label: "Location unavailable",
		available: false
	}),
	async list({ search = "", openOnly = false, sort = "closest" } = {}) {
		if (!CAPS_RUNTIME.backendConfigured) return [];
		return apiClient.get("/shops", { query: {
			search,
			openOnly,
			sort
		} });
	},
	get(id) {
		if (!CAPS_RUNTIME.backendConfigured || !id) return null;
		throw integrationPending("Shop details");
	},
	startingPrice(shop) {
		if (!shop?.pricing?.perPage) return null;
		return Math.min(...Object.values(shop.pricing.perPage).filter(Boolean).map((p) => p.bw));
	}
};
//#endregion
export { shopService as t };
