globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-15T16:56:45.436Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-CQti0HiN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2976-2Smn9BEvdWpQxx2/bTLpJq2y8L4\"",
		"mtime": "2026-10-15T18:00:15.285Z",
		"size": 10614,
		"path": "../public/assets/AppShell-CQti0HiN.js"
	},
	"/assets/AppProvider-vbNjUZl6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5aeb-yV9grRKvtjoVhouXnfFz0Qxc0YA\"",
		"mtime": "2026-10-15T18:00:15.285Z",
		"size": 23275,
		"path": "../public/assets/AppProvider-vbNjUZl6.js"
	},
	"/assets/AuthPages-o1gDSuCp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e5-LYw1s6twjzmkAKOwl9p8xc954Sw\"",
		"mtime": "2026-10-15T18:00:15.285Z",
		"size": 5605,
		"path": "../public/assets/AuthPages-o1gDSuCp.js"
	},
	"/assets/configure-CxJaYpFn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1182-hJJem1M3vnuQt7bJ2aXsu0OnBrc\"",
		"mtime": "2026-10-15T18:00:15.289Z",
		"size": 4482,
		"path": "../public/assets/configure-CxJaYpFn.js"
	},
	"/assets/authService-DUMvkepP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"483-LkLaFbZO+TNwGkcJC7xTaD5Vavg\"",
		"mtime": "2026-10-15T18:00:15.289Z",
		"size": 1155,
		"path": "../public/assets/authService-DUMvkepP.js"
	},
	"/assets/credit-card-DMsMyQ5P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-QAok6LLdzIbtQZ7F/tfaTLin91k\"",
		"mtime": "2026-10-15T18:00:15.289Z",
		"size": 199,
		"path": "../public/assets/credit-card-DMsMyQ5P.js"
	},
	"/assets/domain-CerKKo7C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1302-KQD3yVMMSaBPidHIos/cVFg3mTo\"",
		"mtime": "2026-10-15T18:00:15.289Z",
		"size": 4866,
		"path": "../public/assets/domain-CerKKo7C.js"
	},
	"/assets/forgot-password-1Z6TMlQr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b-7uKA9kz4jUQ4xkfudQXPYeEj1W0\"",
		"mtime": "2026-10-15T18:00:15.289Z",
		"size": 75,
		"path": "../public/assets/forgot-password-1Z6TMlQr.js"
	},
	"/assets/format-BxAQqpap.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ee-bWmfuRAvgroTCJP2JcrOD8xeyWM\"",
		"mtime": "2026-10-15T18:00:15.289Z",
		"size": 1262,
		"path": "../public/assets/format-BxAQqpap.js"
	},
	"/assets/login-CwVGPOMw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b-7D0fYoimfQ0pSutd+vGnEDExtA0\"",
		"mtime": "2026-10-15T18:00:15.290Z",
		"size": 75,
		"path": "../public/assets/login-CwVGPOMw.js"
	},
	"/assets/help-BgQwdtxQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b-hz2FUU3u/9VNHFgeTsogdLlRurM\"",
		"mtime": "2026-10-15T18:00:15.290Z",
		"size": 75,
		"path": "../public/assets/help-BgQwdtxQ.js"
	},
	"/assets/InfoPages-Cn6IJ-mH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f6-ACaKDJdSrT7YzX5ASPM5FIDV/5c\"",
		"mtime": "2026-10-15T18:00:15.285Z",
		"size": 4342,
		"path": "../public/assets/InfoPages-Cn6IJ-mH.js"
	},
	"/assets/notifications-DmfXLWvq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e35-1fm8ce9od73mkU+B3DQoCuHXRaE\"",
		"mtime": "2026-10-15T18:00:15.290Z",
		"size": 3637,
		"path": "../public/assets/notifications-DmfXLWvq.js"
	},
	"/assets/orders.index-Ca-sZuss.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Xjh6dlhw5/uMnV6tf6C6QlT7vgI\"",
		"mtime": "2026-10-15T18:00:15.291Z",
		"size": 77,
		"path": "../public/assets/orders.index-Ca-sZuss.js"
	},
	"/assets/orders._orderId-Cne3KBDd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f5-EqCnGTVVqPveQkRVlXzmS/IV8wc\"",
		"mtime": "2026-10-15T18:00:15.290Z",
		"size": 245,
		"path": "../public/assets/orders._orderId-Cne3KBDd.js"
	},
	"/assets/orders._orderId-bfMPwxHf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ac-3joVPjhgbeQ66c/Jiy0shIR6woI\"",
		"mtime": "2026-10-15T18:00:15.291Z",
		"size": 684,
		"path": "../public/assets/orders._orderId-bfMPwxHf.js"
	},
	"/assets/OrdersPages-BZQOwhw3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d3-JFjsT0+4ZEYeFmKRRLvqH/euNMU\"",
		"mtime": "2026-10-15T18:00:15.288Z",
		"size": 6611,
		"path": "../public/assets/OrdersPages-BZQOwhw3.js"
	},
	"/assets/orderService-0SgGHpNC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-NKwgZTQ2hx17/ujGpQsxupW1+OQ\"",
		"mtime": "2026-10-15T18:00:15.290Z",
		"size": 278,
		"path": "../public/assets/orderService-0SgGHpNC.js"
	},
	"/assets/payment._orderId-DHqABybn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f-93C1NFmdJvko/0+mBHPHYAfIf+M\"",
		"mtime": "2026-10-15T18:00:15.292Z",
		"size": 527,
		"path": "../public/assets/payment._orderId-DHqABybn.js"
	},
	"/assets/payment._orderId-BybCM-SC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ee-CMibMQyfNdSOrtLfkjUNMkvx5UQ\"",
		"mtime": "2026-10-15T18:00:15.291Z",
		"size": 1262,
		"path": "../public/assets/payment._orderId-BybCM-SC.js"
	},
	"/assets/plus-Dk1Z-bwx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91-96MtFKE3zcHaPDRhgzlPjz4bLFA\"",
		"mtime": "2026-10-15T18:00:15.292Z",
		"size": 145,
		"path": "../public/assets/plus-Dk1Z-bwx.js"
	},
	"/assets/index-D3LURPAv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55146-qpDXqU3FyXFjQGuqVZZcd78hp/U\"",
		"mtime": "2026-10-15T18:00:15.283Z",
		"size": 348486,
		"path": "../public/assets/index-D3LURPAv.js"
	},
	"/assets/preload-helper-BXrJBmXj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f0-fyMVg33lsrFdOAl/hT+tP0fu0/c\"",
		"mtime": "2026-10-15T18:00:15.292Z",
		"size": 5872,
		"path": "../public/assets/preload-helper-BXrJBmXj.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"10897f-BEe+DF70Bpep6Ogym1yzePCAk+c\"",
		"mtime": "2026-10-15T17:22:13.362Z",
		"size": 1083775,
		"path": "../public/favicon.ico"
	},
	"/assets/pricing-DNe8lqLZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f7-TdQ+9MGTRKh5ltI1EKhpinQeGI8\"",
		"mtime": "2026-10-15T18:00:15.292Z",
		"size": 1015,
		"path": "../public/assets/pricing-DNe8lqLZ.js"
	},
	"/assets/privacy-BQ1Xzygt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b-56arEpiEwTBAlBM2+ExXis5mcvY\"",
		"mtime": "2026-10-15T18:00:15.292Z",
		"size": 75,
		"path": "../public/assets/privacy-BQ1Xzygt.js"
	},
	"/assets/profile.edit-B2DWdqQy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-5Kq1TNivjfC6uxYlLVoSPLWDwo8\"",
		"mtime": "2026-10-15T18:00:15.292Z",
		"size": 78,
		"path": "../public/assets/profile.edit-B2DWdqQy.js"
	},
	"/assets/ProfilePages-D89wSJTW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba2-8+v0Ls3Z7nskPC5zQ9xUU2jx4mQ\"",
		"mtime": "2026-10-15T18:00:15.288Z",
		"size": 7074,
		"path": "../public/assets/ProfilePages-D89wSJTW.js"
	},
	"/assets/profile.index-MZWI6d_t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-f2SnRzcGe5iPV2P5wKVyC8paX/s\"",
		"mtime": "2026-10-15T18:00:15.294Z",
		"size": 78,
		"path": "../public/assets/profile.index-MZWI6d_t.js"
	},
	"/assets/review-DLwN2Hid.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1713-LrBfK/ctQGKajfgM4DyujkTnm9Q\"",
		"mtime": "2026-10-15T18:00:15.294Z",
		"size": 5907,
		"path": "../public/assets/review-DLwN2Hid.js"
	},
	"/assets/register-BLdYwUyF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b-iv2Vr53JikQkUAnuYZnrwBqlB1s\"",
		"mtime": "2026-10-15T18:00:15.294Z",
		"size": 75,
		"path": "../public/assets/register-BLdYwUyF.js"
	},
	"/assets/queue-D5Wneglz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27b-nJYxrCjrQIZywWRN65fSMMNU3xE\"",
		"mtime": "2026-10-15T18:00:15.294Z",
		"size": 635,
		"path": "../public/assets/queue-D5Wneglz.js"
	},
	"/assets/routes-DCCEzmj5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"949-N+d6XHDrra7ffueEFPDtesfsh18\"",
		"mtime": "2026-10-15T18:00:15.295Z",
		"size": 2377,
		"path": "../public/assets/routes-DCCEzmj5.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-15T18:00:15.295Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/search-8TKsRygG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6-FDy+LCooT5J1jgCn8FqFLwsIdY0\"",
		"mtime": "2026-10-15T18:00:15.295Z",
		"size": 166,
		"path": "../public/assets/search-8TKsRygG.js"
	},
	"/assets/settings-CoFpSCh_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-GEDLQNYx8l5zUonM/Dioj0DDv3M\"",
		"mtime": "2026-10-15T18:00:15.296Z",
		"size": 78,
		"path": "../public/assets/settings-CoFpSCh_.js"
	},
	"/assets/shops._shopId-C_sUzL2I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d1-NeZCGfejXZa8C9v4P7H4l5/b6Vk\"",
		"mtime": "2026-10-15T18:00:15.296Z",
		"size": 721,
		"path": "../public/assets/shops._shopId-C_sUzL2I.js"
	},
	"/assets/shops._shopId-DGWCne08.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9d-ehQjZbm5Dpq8m2HEsyA/Oxgbchk\"",
		"mtime": "2026-10-15T18:00:15.296Z",
		"size": 3997,
		"path": "../public/assets/shops._shopId-DGWCne08.js"
	},
	"/assets/shopService-DQBleXiK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b0-lOxDWAYMzYKTzXKfdNSJJmLvPNA\"",
		"mtime": "2026-10-15T18:00:15.296Z",
		"size": 1200,
		"path": "../public/assets/shopService-DQBleXiK.js"
	},
	"/assets/star-CC38VkLL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"308-VcP5y6PjVeiTdKpV7N3KNlTnXok\"",
		"mtime": "2026-10-15T18:00:15.296Z",
		"size": 776,
		"path": "../public/assets/star-CC38VkLL.js"
	},
	"/assets/store-fCnfdAq4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ea-q2E1u38O4DMHAJ7NAxv/30k2f6U\"",
		"mtime": "2026-10-15T18:00:15.297Z",
		"size": 490,
		"path": "../public/assets/store-fCnfdAq4.js"
	},
	"/assets/terms-wm-cA9lF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b-rpA4BO4nm6eMZMoqWZ9d8yLBjv4\"",
		"mtime": "2026-10-15T18:00:15.297Z",
		"size": 75,
		"path": "../public/assets/terms-wm-cA9lF.js"
	},
	"/assets/track._orderId-CmiI0xwt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29d-xfc8Ton5q+8DMVLZeKKpAuEpw6E\"",
		"mtime": "2026-10-15T18:00:15.297Z",
		"size": 669,
		"path": "../public/assets/track._orderId-CmiI0xwt.js"
	},
	"/assets/validation-Be24ee0I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b00-Rw8Gd4tb3UV8S4FGifQFoFZJMZM\"",
		"mtime": "2026-10-15T18:00:15.297Z",
		"size": 2816,
		"path": "../public/assets/validation-Be24ee0I.js"
	},
	"/assets/upload-BwZVEsxA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1afb-4UhyA245UN81Y2LdcOmGQ9bImlU\"",
		"mtime": "2026-10-15T18:00:15.297Z",
		"size": 6907,
		"path": "../public/assets/upload-BwZVEsxA.js"
	},
	"/assets/track._orderId-CoPSzwA9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1123-7iCvCWmHSM32jAh/L7fCmT6pECs\"",
		"mtime": "2026-10-15T18:00:15.297Z",
		"size": 4387,
		"path": "../public/assets/track._orderId-CoPSzwA9.js"
	},
	"/assets/styles-Z8CLynr6.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16d97-ee/x+FxfUMmSi5IV09gx8zImWqQ\"",
		"mtime": "2026-10-15T18:00:15.298Z",
		"size": 93591,
		"path": "../public/assets/styles-Z8CLynr6.css"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_k0H7sE = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_k0H7sE
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
