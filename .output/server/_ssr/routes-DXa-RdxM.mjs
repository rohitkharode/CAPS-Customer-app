import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp } from "./AppProvider-Dey2SDbi.mjs";
import { f as Search, o as Store, v as MapPin } from "../_libs/lucide-react.mjs";
import { c as EmptyState, g as cx, m as Spinner, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { t as shopService } from "./shopService-CBJPXhRb.mjs";
import { i as ShopCard } from "./domain-CRhfeU8A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DXa-RdxM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SORTS = [
	{
		value: "closest",
		label: "Closest"
	},
	{
		value: "fastest",
		label: "Fastest"
	},
	{
		value: "rating",
		label: "Highest Rated"
	}
];
function HomePage() {
	const { user, orders } = useApp();
	const [search, setSearch] = (0, import_react.useState)("");
	const [openOnly, setOpenOnly] = (0, import_react.useState)(false);
	const [sort, setSort] = (0, import_react.useState)("closest");
	const [shops, setShops] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const loc = shopService.location();
	(0, import_react.useEffect)(() => {
		let alive = true;
		setShops(null);
		shopService.list({
			search,
			openOnly,
			sort
		}).then((r) => alive && setShops(r)).catch(() => alive && setError("Couldn't load shops. Please try again."));
		return () => {
			alive = false;
		};
	}, [
		search,
		openOnly,
		sort,
		orders
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "loc",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
				size: 16,
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label",
				children: "Current location"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: loc.label })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "h1",
			children: ["Hello, ", user?.name.split(" ")[0]]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted",
			children: "Find the best print shops near you."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "search",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				size: 18,
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "search",
				placeholder: "Search print shops or areas…",
				"aria-label": "Search print shops",
				value: search,
				onChange: (e) => setSearch(e.target.value)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "chips",
			role: "group",
			"aria-label": "Filter and sort",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: cx("chip", openOnly && "is-on"),
				"aria-pressed": openOnly,
				onClick: () => setOpenOnly((v) => !v),
				children: "Open Now"
			}), SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: cx("chip", sort === s.value && "is-on"),
				"aria-pressed": sort === s.value,
				onClick: () => setSort(s.value),
				children: s.label
			}, s.value))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted small",
			children: "Shop data and live wait times become available when the backend is connected."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}),
		!shops && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Finding nearby shops…" }) : shops?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Store,
			title: "No shops found",
			children: "Shop discovery is unavailable until the backend connection is configured."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "list",
			children: shops?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopCard, { shop: s }, s.id))
		})
	] });
}
var SplitComponent = HomePage;
//#endregion
export { SplitComponent as component };
