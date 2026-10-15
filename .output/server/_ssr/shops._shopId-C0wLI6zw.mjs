import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp } from "./AppProvider-Dey2SDbi.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Navigation, j as Clock, o as Store, s as Star, v as MapPin } from "../_libs/lucide-react.mjs";
import { c as EmptyState, i as Button, o as Card, r as Badge, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { s as rupees } from "./format-WCDBxseN.mjs";
import { t as shopService } from "./shopService-CBJPXhRb.mjs";
import { n as describeSurcharge } from "./pricing-B-v3W0xz.mjs";
import { n as orderQueue, r as urgentAvailable } from "./queue-55MSx6M_.mjs";
import { t as Route } from "./shops._shopId-BQ-0rbwh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shops._shopId-C0wLI6zw.js
var import_jsx_runtime = require_jsx_runtime();
function ShopPage({ shopId }) {
	const { setDraft, draft } = useApp();
	const nav = useNavigate();
	const shop = shopService.get(shopId);
	if (!shop) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		back: "/",
		title: "Shop",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Store,
			title: "Shop not found"
		})
	});
	const q = orderQueue(shop.queue);
	const urgent = urgentAvailable(shop);
	const p = shop.pricing;
	const start = () => {
		setDraft({
			shopId: shop.id,
			tier: null,
			paymentMethod: null,
			...draft.shopId !== shop.id ? {} : {}
		});
		nav({ to: "/upload" });
	};
	const maps = `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: "/",
		title: "Shop Details",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			block: true,
			onClick: start,
			disabled: !shop.open,
			children: shop.open ? "Start Printing" : `Closed — opens at ${shop.opensAt}`
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shop-card__head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "h2",
						children: shop.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: shop.open ? "ok" : "muted",
						children: shop.open ? "Open" : "Closed"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 14,
							className: "star",
							"aria-hidden": true
						}),
						" ",
						shop.rating,
						" (",
						shop.reviews,
						") ·",
						" ",
						shop.distanceKm,
						" km · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							size: 14,
							"aria-hidden": true
						}),
						" ",
						shop.hours
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 14,
							"aria-hidden": true
						}),
						" ",
						shop.address
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "btn btn--secondary",
					href: maps,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {
						size: 16,
						"aria-hidden": true
					}), " Get Directions"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: "Opens Google Maps in a new tab."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "queue-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "h3",
					children: "Current Queue"
				}), shop.open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "big",
					children: [
						q.length,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "muted",
							children: "jobs in queue"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: [
						"Estimated wait: ~",
						shop.waitMin,
						" min · Urgent jobs are served before Flexible jobs."
					]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: [
						"The shop is closed. The queue opens at ",
						shop.opensAt,
						"."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "h3",
					children: "Services & Pricing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: "Paper"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: "B&W / page"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: "Color / page"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Object.entries(p.perPage).map(([size, r]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "row",
							children: size
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r ? rupees(r.bw) : "Not offered" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r ? rupees(r.color) : "Not offered" })
					] }, size)) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "breakdown",
					children: [
						[
							"spiral",
							"staple",
							"lamination"
						].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "cap",
								children: [b, " (per copy)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.binding[b] == null ? "Not offered" : rupees(p.binding[b]) })]
						}, b)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Urgent surcharge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: describeSurcharge(shop) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pay at counter" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shop.payAtCounter ? "Available" : "Not available" })]
						})
					]
				}),
				!urgent.ok && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
					tone: "warn",
					children: [urgent.reason, " Flexible printing is still available."]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small",
				children: "Under the CAPS policy, documents are kept in encrypted storage and deleted automatically within the retention window. Backend enforcement isn't connected in this frontend."
			})
		]
	});
}
function RoutePage() {
	const { shopId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopPage, { shopId }, shopId);
}
//#endregion
export { RoutePage as component };
