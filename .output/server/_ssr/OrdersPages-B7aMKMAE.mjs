import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp } from "./AppProvider-Dey2SDbi.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Inbox, O as Download, T as FileText, f as Search, p as Printer, u as Share2 } from "../_libs/lucide-react.mjs";
import { c as EmptyState, f as Row, g as cx, i as Button, o as Card, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { a as dateTime, n as PAYMENT_STATUS, r as STATUS, s as rupees, t as LABELS } from "./format-WCDBxseN.mjs";
import { a as StatusBadge, n as PriceBreakdown, r as SettingsGrid, t as OrderCard } from "./domain-CRhfeU8A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OrdersPages-B7aMKMAE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"all",
	"pending_payment",
	"queued",
	"printing",
	"completed",
	"failed",
	"cancelled"
];
var WEEK = 6048e5;
function OrdersPage() {
	const { orders, user } = useApp();
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const mine = orders.filter((o) => o.customerId === user?.id);
	const list = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		return mine.filter((o) => status === "all" || o.status === status).filter((o) => !s || o.document.name.toLowerCase().includes(s) || o.shopName.toLowerCase().includes(s) || o.id.toLowerCase().includes(s)).sort((a, b) => b.createdAt - a.createdAt);
	}, [
		mine,
		q,
		status
	]);
	const now = Date.now();
	const recent = list.filter((o) => now - o.createdAt < WEEK);
	const older = list.filter((o) => now - o.createdAt >= WEEK);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "My Orders",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 18,
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					placeholder: "Search jobs or shops",
					"aria-label": "Search orders",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips scroll-x",
				role: "group",
				"aria-label": "Filter by status",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: cx("chip", status === f && "is-on"),
					"aria-pressed": status === f,
					onClick: () => setStatus(f),
					children: f === "all" ? "All statuses" : STATUS[f].label
				}, f))
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Inbox,
				title: "No orders found",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "btn btn--primary",
					children: "Find a shop"
				}),
				children: mine.length ? "Try another search or filter." : "Your print jobs will appear here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section-title",
					children: "Recent"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "list",
					children: recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, { order: o }, o.id))
				}),
				older.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section-title",
					children: "Older"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "list",
					children: older.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, { order: o }, o.id))
				})
			] })
		]
	});
}
function receiptText(o) {
	const p = o.price;
	const lines = [
		"CAPS RECEIPT",
		"==========================================",
		`Order / token : #${o.id}`,
		`Shop          : ${o.shopName}`,
		`Date          : ${dateTime(o.createdAt)}`,
		`Document      : ${o.document.name}`,
		`Settings      : ${o.settings.paper}, ${LABELS[o.settings.color]}, ${LABELS[o.settings.sides]}, ${LABELS[o.settings.orientation]}, ${o.settings.copies} copies, ${LABELS[o.settings.binding]}`,
		`Priority      : ${LABELS[o.tier]}`,
		`Status        : ${STATUS[o.status].label}`,
		"------------------------------------------"
	];
	if (p.printPaise !== void 0) {
		lines.push(`Print         : ${rupees(p.printPaise)}`);
		if (p.bindingPaise) lines.push(`Binding       : ${rupees(p.bindingPaise)}`);
		if (p.urgentPaise) lines.push(`Urgent        : ${rupees(p.urgentPaise)}`);
		lines.push(`GST (${Math.round(p.gstRate * 100)}%): ${rupees(p.gstPaise)}`);
	}
	lines.push(`TOTAL         : ${rupees(p.totalPaise)}`);
	lines.push(`Payment       : ${LABELS[o.payment.method]} — ${PAYMENT_STATUS[o.payment.status]}`);
	if (o.payment.ref) lines.push(`Payment ref   : ${o.payment.ref}`);
	lines.push("", "Receipt data supplied by CAPS.");
	return lines.join("\n");
}
function OrderDetailPage({ orderId }) {
	const { orders } = useApp();
	const o = orders.find((x) => x.id === orderId);
	const [msg, setMsg] = (0, import_react.useState)("");
	if (!o) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		back: "/orders",
		title: "Order",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileText,
			title: "Order not found",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/orders",
				className: "btn btn--primary",
				children: "Back to orders"
			})
		})
	});
	const download = () => {
		const blob = new Blob([receiptText(o)], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `CAPS-receipt-${o.id}.txt`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 3e4);
	};
	const share = async () => {
		const text = receiptText(o);
		try {
			if (navigator.share) await navigator.share({
				title: `CAPS receipt #${o.id}`,
				text
			});
			else {
				await navigator.clipboard.writeText(text);
				setMsg("Receipt copied to clipboard.");
			}
		} catch (e) {
			if (e?.name !== "AbortError") setMsg("Couldn't share. Try Download instead.");
		}
	};
	const hasBreakdown = o.price.printPaise !== void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: "/orders",
		title: "Order Details",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shop-card__head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: o.shopName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta",
						children: dateTime(o.createdAt)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "token-box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label",
						children: "Queue token"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "token",
						children: ["#", o.token]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: o.document.name })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "meta",
					children: [o.price.pages ?? o.document.pageCount, " pages"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGrid, {
					settings: o.settings,
					document: o.document
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Priority",
					value: LABELS[o.tier]
				}),
				[
					"queued",
					"printing",
					"pending_payment"
				].includes(o.status) || o.stage === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/track/$orderId",
					params: { orderId: o.id },
					className: "btn btn--primary btn--block",
					children: "Track live status"
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "receipt",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "h3",
						children: "Payment summary"
					}),
					hasBreakdown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBreakdown, {
						price: o.price,
						tier: o.tier
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Total",
						value: rupees(o.price.totalPaise),
						strong: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Method",
						value: LABELS[o.payment.method]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Payment status",
						value: PAYMENT_STATUS[o.payment.status]
					}),
					o.payment.ref && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Payment reference",
						value: o.payment.ref
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted small",
						children: "Receipt availability and payment authority depend on the backend connection."
					})
				]
			}),
			msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: msg }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "btn-row no-print",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
							size: 16,
							"aria-hidden": true
						}), " View / Print"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: download,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							size: 16,
							"aria-hidden": true
						}), " Download"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: share,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
							size: 16,
							"aria-hidden": true
						}), " Share"]
					})
				]
			})
		]
	});
}
//#endregion
export { OrdersPage as n, OrderDetailPage as t };
