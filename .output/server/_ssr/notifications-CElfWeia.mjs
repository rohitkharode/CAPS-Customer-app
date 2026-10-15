import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp, v as write } from "./AppProvider-Dey2SDbi.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Bell, M as CircleX, P as CircleCheck, R as BellOff, S as Info, h as PackageCheck, i as TriangleAlert, k as CreditCard, p as Printer, x as ListOrdered } from "../_libs/lucide-react.mjs";
import { c as EmptyState, g as cx, i as Button, t as AppShell } from "./AppShell-B3q1XuMP.mjs";
import { o as relative } from "./format-WCDBxseN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-CElfWeia.js
var import_jsx_runtime = require_jsx_runtime();
var notificationService = {
	push(n) {
		write((db) => {
			if (db.prefs?.push === false && n.type !== "failed") return;
			db.notifications.unshift({
				id: "n-" + Date.now() + Math.random().toString(36).slice(2, 6),
				read: false,
				createdAt: Date.now(),
				...n
			});
		});
	},
	markRead(id) {
		write((db) => {
			const n = db.notifications.find((x) => x.id === id);
			if (n) n.read = true;
		});
	},
	markAllRead() {
		write((db) => db.notifications.forEach((n) => n.read = true));
	}
};
var ICONS = {
	queued: ListOrdered,
	payment: CreditCard,
	printing: Printer,
	completed: CircleCheck,
	ready: PackageCheck,
	failed: TriangleAlert,
	cancelled: CircleX,
	info: Info
};
var DAY = 864e5;
function NotificationsPage() {
	const { notifications, unread } = useApp();
	const nav = useNavigate();
	const today = notifications.filter((n) => Date.now() - n.createdAt < DAY);
	const earlier = notifications.filter((n) => Date.now() - n.createdAt >= DAY);
	const open = (n) => {
		notificationService.markRead(n.id);
		if (n.orderId) nav({
			to: "/orders/$orderId",
			params: { orderId: n.orderId }
		});
	};
	const Group = ({ title, items }) => items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "section-title",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "notif-list",
		children: items.map((n) => {
			const Icon = ICONS[n.type] || Bell;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: cx("notif", !n.read && "is-unread", n.type === "failed" && "is-danger"),
				onClick: () => open(n),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						size: 20,
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "notif__body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "notif__head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: n.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "muted small",
								children: relative(n.createdAt)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "muted small",
							children: n.body
						})]
					}),
					!n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "unread-dot",
						"aria-label": "Unread"
					})
				]
			}) }, n.id);
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Notifications",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "muted small",
				children: [unread, " unread · in-app notifications (push isn't connected)"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				disabled: unread === 0,
				onClick: () => notificationService.markAllRead(),
				children: "Mark all read"
			})]
		}), notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: BellOff,
			title: "No notifications yet",
			children: "Updates about your print jobs will appear here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			title: "Today",
			items: today
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
			title: "Earlier",
			items: earlier
		})] })]
	});
}
var SplitComponent = NotificationsPage;
//#endregion
export { SplitComponent as component };
