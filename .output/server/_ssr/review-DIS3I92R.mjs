import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp, f as PAYMENT_METHODS } from "./AppProvider-Dey2SDbi.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as FileText, t as Zap } from "../_libs/lucide-react.mjs";
import { a as CAPS_RUNTIME, c as EmptyState, g as cx, i as Button, o as Card, r as Badge, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { i as bytes, s as rupees } from "./format-WCDBxseN.mjs";
import { t as shopService } from "./shopService-CBJPXhRb.mjs";
import { n as PriceBreakdown, r as SettingsGrid } from "./domain-CRhfeU8A.mjs";
import { i as validateCopies, r as parsePageRange } from "./validation-CcsLCRjg.mjs";
import { t as calculatePrice } from "./pricing-B-v3W0xz.mjs";
import { t as orderService } from "./orderService-MIBQFc8I.mjs";
import { r as urgentAvailable, t as estimateInsertion } from "./queue-55MSx6M_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-DIS3I92R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReviewPage() {
	const { draft, setDraft, clearDraft } = useApp();
	const nav = useNavigate();
	const [placing, setPlacing] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const shop = draft.shopId ? shopService.get(draft.shopId) : null;
	const doc = draft.document;
	const s = draft.settings;
	const settingsOk = doc && !validateCopies(s.copies) && (s.pageRange.mode === "all" || parsePageRange(s.pageRange.value, doc.pageCount).ok);
	if (!shop || !doc || !settingsOk) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		back: "/configure",
		title: "Review & Payment",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileText,
			title: "Your order isn't ready yet",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: doc ? "/configure" : "/upload",
				className: "btn btn--primary",
				children: "Go back"
			}),
			children: "Upload a document and finish the print settings first."
		})
	});
	const urgent = urgentAvailable(shop);
	const flexEst = estimateInsertion(shop.queue, "flexible", shop.avgMinPerJob);
	const urgEst = estimateInsertion(shop.queue, "urgent", shop.avgMinPerJob);
	const tier = draft.tier === "urgent" && !urgent.ok ? null : draft.tier;
	const flexPrice = calculatePrice({
		settings: s,
		pageCount: doc.pageCount,
		shop,
		tier: "flexible"
	});
	const urgPrice = calculatePrice({
		settings: s,
		pageCount: doc.pageCount,
		shop,
		tier: "urgent"
	});
	const price = tier === "urgent" ? urgPrice : flexPrice;
	const methods = PAYMENT_METHODS.map((m) => ({
		...m,
		disabled: m.value === "pay_at_counter" && !shop.payAtCounter
	}));
	const method = methods.find((m) => m.value === draft.paymentMethod && !m.disabled)?.value || null;
	const place = async () => {
		setError("");
		setPlacing(true);
		try {
			const id = await orderService.create({
				shopId: shop.id,
				document: doc,
				settings: s,
				tier,
				paymentMethod: method
			});
			clearDraft();
			if (method === "pay_at_counter") nav({
				to: "/track/$orderId",
				params: { orderId: id }
			});
			else nav({
				to: "/payment/$orderId",
				params: { orderId: id }
			});
		} catch (e) {
			setError(e.message);
			setPlacing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: "/configure",
		title: "Review & Payment",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				block: true,
				disabled: !tier || !method || !CAPS_RUNTIME.backendConfigured,
				loading: placing,
				onClick: place,
				children: method === "pay_at_counter" ? "Place Order" : "Continue to Payment"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small center",
				children: !tier ? "Choose Flexible or Urgent." : !method ? "Choose a payment method." : !CAPS_RUNTIME.backendConfigured ? "Order submission is unavailable until the backend is connected." : `Estimated total ${rupees(price.totalPaise)}`
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label",
					children: "Selected shop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shop-card__head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: shop.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "ok",
						children: "Open"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "meta",
					children: [
						shop.distanceKm,
						" km · ~",
						shop.waitMin,
						" min wait"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "prio",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "prio",
						className: "section-title",
						children: "Priority selection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "tiers",
						role: "radiogroup",
						"aria-label": "Priority",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierOption, {
							value: "flexible",
							selected: tier === "flexible",
							onSelect: () => setDraft({ tier: "flexible" }),
							title: "Flexible",
							price: "No extra cost",
							desc: "Standard first-come, first-served queue.",
							est: flexEst
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierOption, {
							value: "urgent",
							selected: tier === "urgent",
							disabled: !urgent.ok,
							onSelect: () => setDraft({ tier: "urgent" }),
							title: "Urgent",
							icon: Zap,
							price: `+${rupees(urgPrice.urgentPaise)}`,
							desc: "Printed ahead of all Flexible jobs, after the job printing now and any earlier Urgent jobs.",
							est: urgEst,
							extra: urgent.ok ? `Revised total ${rupees(urgPrice.totalPaise)}` : urgent.reason
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted small",
						children: "Queue positions and times are estimates until the backend returns authoritative data."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "h3",
					children: "Order summary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "file-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						size: 24,
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "file-card__body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "truncate",
							children: doc.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "meta",
							children: [
								price.pages,
								" pages · ",
								s.copies,
								" cop",
								s.copies === 1 ? "y" : "ies",
								" · ",
								bytes(doc.size)
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGrid, {
					settings: s,
					document: doc
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/configure",
					className: "link small",
					children: "Edit settings"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "h3",
				children: "Price breakdown"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBreakdown, {
				price,
				tier
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "pay",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "pay",
						className: "section-title",
						children: "Payment method"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pay-list",
						role: "radiogroup",
						"aria-label": "Payment method",
						children: methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: cx("pay-opt", method === m.value && "is-selected", m.disabled && "is-disabled"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "pay",
								checked: method === m.value,
								disabled: m.disabled,
								onChange: () => setDraft({ paymentMethod: m.value })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: m.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "muted small",
								children: m.disabled ? "Not enabled by this shop" : m.hint
							})] })]
						}, m.value))
					}),
					method === "pay_at_counter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "Your job joins the queue now and you pay at the shop when you collect it." })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: error
			})
		]
	});
}
function TierOption({ selected, disabled, onSelect, title, price, desc, est, extra, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cx("tier", selected && "is-selected", disabled && "is-disabled"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "radio",
				name: "tier",
				checked: selected,
				disabled,
				onChange: onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tier__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
					className: Icon ? "tier__title-icon" : void 0,
					children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						size: 18,
						"aria-hidden": true
					}), title]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: price })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small",
				children: desc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tier__est",
				children: [
					"Position #",
					est.position,
					" · ~",
					est.etaMin,
					" min"
				]
			}),
			extra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cx("small", disabled ? "text-danger" : "strong"),
				children: extra
			})
		]
	});
}
var SplitComponent = ReviewPage;
//#endregion
export { SplitComponent as component };
