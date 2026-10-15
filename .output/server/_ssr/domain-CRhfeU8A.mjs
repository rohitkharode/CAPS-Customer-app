import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Check, j as Clock, n as X, s as Star, v as MapPin } from "../_libs/lucide-react.mjs";
import { f as Row, g as cx, r as Badge } from "./AppShell-B3q1XuMP.mjs";
import { a as dateTime, r as STATUS, s as rupees, t as LABELS } from "./format-WCDBxseN.mjs";
import { t as shopService } from "./shopService-CBJPXhRb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/domain-CRhfeU8A.js
var import_jsx_runtime = require_jsx_runtime();
function ShopCard({ shop }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card shop-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shop-card__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shops/$shopId",
					params: { shopId: shop.id },
					className: "stretched",
					children: shop.name
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: shop.open ? "ok" : "muted",
					children: shop.open ? "Open" : "Closed"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "meta",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
						size: 14,
						"aria-hidden": true,
						className: "star"
					}),
					" ",
					shop.rating,
					" ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						size: 14,
						"aria-hidden": true
					}),
					" ",
					shop.distanceKm,
					" km away"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shop-card__stats",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label",
					children: "Est. wait"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: shop.open ? `${shop.waitMin} min` : "—" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label",
					children: "Starting at"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [rupees(shopService.startingPrice(shop)), "/page"] })] })]
			}),
			!shop.open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "muted small",
				children: ["Opens at ", shop.opensAt]
			})
		]
	});
}
function StatusBadge({ status }) {
	const s = STATUS[status] || {
		label: status,
		tone: "muted"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: s.tone,
		children: s.label
	});
}
function OrderCard({ order }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card order-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-card__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "truncate",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders/$orderId",
						params: { orderId: order.id },
						className: "stretched",
						children: order.document.name
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: order.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta truncate",
				children: order.shopName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta",
				children: dateTime(order.createdAt)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-card__foot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					order.price.pages ?? order.document.pageCount,
					" pages ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: order.tier === "urgent" ? "warn" : "info",
						children: LABELS[order.tier]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: rupees(order.price.totalPaise) })]
			})
		]
	});
}
function PriceBreakdown({ price, tier, compact }) {
	const pct = Math.round(price.gstRate * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "breakdown",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: `Print (${price.pages} pg × ${price.copies} cop${price.copies === 1 ? "y" : "ies"} × ${rupees(price.ratePaise)})`,
				value: rupees(price.printPaise)
			}),
			price.bindingPaise > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: `Binding (${rupees(price.bindingUnitPaise)} × ${price.copies})`,
				value: rupees(price.bindingPaise)
			}),
			tier === "urgent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Urgent surcharge",
				value: rupees(price.urgentPaise)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"GST (",
					pct,
					"%)"
				] }),
				value: rupees(price.gstPaise)
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Estimated total",
				value: rupees(price.totalPaise),
				strong: true
			})
		]
	});
}
function SettingsGrid({ settings, document }) {
	const range = settings.pageRange.mode === "all" ? `All (${document.pageCount})` : settings.pageRange.value;
	const items = [
		["Paper", settings.paper],
		["Color", LABELS[settings.color]],
		["Sides", LABELS[settings.sides]],
		["Orientation", LABELS[settings.orientation]],
		["Copies", settings.copies],
		["Pages", range],
		["Binding", LABELS[settings.binding]]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "settings-grid",
		children: items.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: k }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: v })] }, k))
	});
}
var STEPS = [
	{
		key: "queued",
		label: "Queued"
	},
	{
		key: "downloading",
		label: "Sent to shop printer"
	},
	{
		key: "printing",
		label: "Printing"
	},
	{
		key: "completed",
		label: "Completed"
	},
	{
		key: "ready",
		label: "Ready for pickup"
	}
];
function StatusTimeline({ order }) {
	const terminal = order.status === "failed" || order.status === "cancelled";
	const idx = order.stage === "pending_payment" ? -1 : STEPS.findIndex((s) => s.key === order.stage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
		className: "timeline",
		children: [
			order.status === "pending_payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "timeline__item is-current",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "timeline__dot",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pending payment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: "Not sent to the shop until payment is confirmed."
				})] })]
			}),
			STEPS.map((s, i) => {
				const done = !terminal && (i < idx || s.key === "ready" && idx === i);
				const current = !terminal && i === idx && s.key !== "ready";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cx("timeline__item", done && "is-done", current && "is-current"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "timeline__dot",
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 }) : null
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: s.label }), current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted small",
						children: s.key === "printing" ? `${order.progress}% printed` : "In progress…"
					})] })]
				}, s.key);
			}),
			terminal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "timeline__item is-failed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "timeline__dot",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.status === "failed" ? "Print failed" : "Cancelled" }), order.payment?.status === "refunded" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: "Refund status: refunded"
				})] })]
			})
		]
	});
}
//#endregion
export { StatusBadge as a, ShopCard as i, PriceBreakdown as n, StatusTimeline as o, SettingsGrid as r, OrderCard as t };
