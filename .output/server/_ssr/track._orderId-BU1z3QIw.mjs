import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp } from "./AppProvider-Dey2SDbi.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as FileText } from "../_libs/lucide-react.mjs";
import { c as EmptyState, i as Button, o as Card, r as Badge, s as Dialog, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { o as relative, t as LABELS } from "./format-WCDBxseN.mjs";
import { a as StatusBadge, o as StatusTimeline } from "./domain-CRhfeU8A.mjs";
import { t as orderService } from "./orderService-MIBQFc8I.mjs";
import { t as Route } from "./track._orderId-BOYEPCSv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track._orderId-BU1z3QIw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrackPage({ orderId }) {
	const { orders } = useApp();
	const order = orders.find((o) => o.id === orderId);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		back: "/orders",
		title: "Track Job",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileText,
			title: "Job not found",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/orders",
				className: "btn btn--primary",
				children: "My orders"
			})
		})
	});
	const cancel = async () => {
		setBusy(true);
		setErr("");
		try {
			await orderService.cancel(orderId);
			setConfirm(false);
		} catch (e) {
			setErr(e.message);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: "/orders",
		title: "Track Job",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shop-card__head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "truncate",
						children: order.shopName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: order.tier === "urgent" ? "warn" : "info",
						children: LABELS[order.tier]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "token-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label",
						children: "Queue token"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "token",
						children: ["#", order.token]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: order.status })]
					})]
				}),
				(order.status === "queued" || order.status === "printing") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stats3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.queuePosition }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current position" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.status === "printing" ? 0 : order.jobsAhead }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jobs ahead" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [order.etaMin, "m"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Est. completion" })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "file-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						size: 22,
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "file-card__body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "truncate",
							children: order.document.name
						}), order.stage === "printing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress",
							role: "progressbar",
							"aria-valuenow": order.progress,
							"aria-valuemin": 0,
							"aria-valuemax": 100,
							"aria-label": "Print progress",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${order.progress}%` } })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted small",
					"aria-live": "polite",
					children: [
						"Last updated ",
						relative(order.updatedAt, Date.now()),
						". Live status updates require the backend connection."
					]
				})
			] }),
			order.status === "pending_payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				tone: "warn",
				children: [
					"Awaiting payment. Your job isn't sent to the shop until payment is confirmed.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/payment/$orderId",
						params: { orderId },
						className: "link",
						children: "Complete payment"
					})
				]
			}),
			order.stage === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				tone: "ok",
				children: [
					"Ready for pickup at ",
					order.shopName,
					". Show token #",
					order.token,
					".",
					order.payment.method === "pay_at_counter" ? " Pay at the counter." : ""
				]
			}),
			order.status === "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				tone: "danger",
				children: [
					"This job failed at the shop. Refund status:",
					" ",
					order.payment.status === "refunded" ? "refunded" : "no online payment was taken",
					"."
				]
			}),
			order.status === "cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "This job was cancelled." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "h3",
				children: "Timeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusTimeline, { order })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders/$orderId",
						params: { orderId },
						className: "btn btn--secondary btn--block",
						children: "View Job Details"
					}),
					orderService.canCancel(order) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						block: true,
						onClick: () => setConfirm(true),
						children: "Cancel Job"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted small center",
						children: "Cancelling is allowed only while a job is waiting for payment or queued (assumption; the SRS doesn't define this)."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: confirm,
				title: "Cancel this job?",
				onClose: () => setConfirm(false),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setConfirm(false),
					children: "Keep job"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					loading: busy,
					onClick: cancel,
					children: "Cancel job"
				})] }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.payment.status === "success" ? "A refund would be issued according to the backend payment policy." : "Nothing has been charged." }), err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: err
				})]
			})
		]
	});
}
function RoutePage() {
	const { orderId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackPage, { orderId }, orderId);
}
//#endregion
export { RoutePage as component };
