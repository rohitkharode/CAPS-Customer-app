import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp } from "./AppProvider-Dey2SDbi.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as FileText } from "../_libs/lucide-react.mjs";
import { c as EmptyState, f as Row, o as Card, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { n as PAYMENT_STATUS, s as rupees, t as LABELS } from "./format-WCDBxseN.mjs";
import { t as Route } from "./payment._orderId-BCvPXAAX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment._orderId-o63u7yQi.js
var import_jsx_runtime = require_jsx_runtime();
function PaymentPage({ orderId }) {
	const { orders } = useApp();
	const order = orders.find((o) => o.id === orderId);
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		back: "/orders",
		title: "Payment",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileText,
			title: "Order not found",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/orders",
				className: "btn btn--primary",
				children: "My orders"
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: "/orders",
		title: "Payment",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: "Payment is unavailable until the backend payment service is connected. No payment was attempted and this order remains unchanged."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Order",
					value: `#${order.id}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Shop",
					value: order.shopName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Priority",
					value: LABELS[order.tier]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Amount payable",
					value: rupees(order.price.totalPaise),
					strong: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Payment status",
					value: PAYMENT_STATUS[order.payment.status]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/orders/$orderId",
				params: { orderId },
				className: "btn btn--secondary btn--block",
				children: "Back to job details"
			})
		]
	});
}
function RoutePage() {
	const { orderId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentPage, { orderId }, orderId);
}
//#endregion
export { RoutePage as component };
