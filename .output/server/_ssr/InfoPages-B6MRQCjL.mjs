import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { o as Card, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/InfoPages-B6MRQCjL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Public({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "auth",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "integration-banner",
			role: "note",
			children: "CAPS frontend information. Final legal text and backend policies are pending confirmation."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "auth__main wide",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "link link-btn",
					onClick: () => window.history.back(),
					children: "← Back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "h1",
					children: title
				}),
				children
			]
		})]
	});
}
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Public, {
		title: "Privacy Policy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "warn",
			children: "Placeholder. This describes how CAPS is designed to work under the SRS. These protections are not active in this frontend."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "prose",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "h3",
					children: "Your documents"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Uploaded documents are kept in encrypted storage. Only you, the destination shop's authenticated print agent and platform administrators can access them." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Documents are deleted automatically within a configurable retention window (for example 30 minutes after printing, or 24 hours at most), whatever the print outcome. The shop's computer deletes its temporary copy as soon as the printer accepts the job, or if it fails or is cancelled." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "h3",
					children: "Connections"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All traffic between your device and CAPS is encrypted in transit (HTTPS/WSS)." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "h3",
					children: "Payments"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Online payments are handled by a payment gateway. CAPS doesn't store card numbers." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "h3",
					children: "Current frontend behavior"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nothing is uploaded. Accounts, orders and settings are stored only in this browser's local storage and can be cleared from Settings → Clear local data." })
			]
		})]
	});
}
function TermsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Public, {
		title: "Terms of Service",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "warn",
			children: "Placeholder terms. Final terms will be provided by the CAPS team."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "prose",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CAPS connects customers with partner print shops. Shops set their own prices, urgent surcharges and urgent-job limits, and decide whether pay-at-counter is available." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Jobs are released to a shop only after payment is confirmed, unless pay-at-counter is enabled for that order." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Urgent jobs are printed before Flexible jobs. Within each tier, jobs are printed first-come, first-served." })
			]
		})]
	});
}
var FAQ = [
	["What's the difference between Urgent and Flexible?", "Flexible jobs are printed first-come, first-served at no extra cost. Urgent jobs pay a shop-set surcharge and are printed before every Flexible job, after the job printing now and any earlier Urgent jobs."],
	["Which files can I print?", "PDF, DOCX, PPT, JPG and PNG. In the full system, office files are converted to PDF automatically."],
	["When is my job sent to the shop?", "Only after your payment is confirmed, or straight away if you chose pay at counter at a shop that allows it."],
	["Can I cancel?", "You can cancel while a job is waiting for payment or queued. This rule is an assumption until the CAPS team defines it."],
	["Is any of this real?", "This frontend does not connect authentication, uploads, payments, queue authority or push notifications until the backend is available."]
];
function HelpPage() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: "/profile",
		title: "Help & Support",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: FAQ.map(([q, a], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "faq",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "faq__q",
				"aria-expanded": open === i,
				onClick: () => setOpen(open === i ? -1 : i),
				children: q
			}), open === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: a
			})]
		}, q)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "h3",
				children: "Contact support"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small",
				children: "Support contact details haven't been provided yet. This is a placeholder."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "btn btn--secondary",
				href: "mailto:support@caps.example?subject=CAPS%20support",
				children: "Email support (placeholder)"
			})
		] })]
	});
}
//#endregion
export { PrivacyPage as n, TermsPage as r, HelpPage as t };
