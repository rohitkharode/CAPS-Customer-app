import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp, d as PAPER_SIZES, i as BINDINGS, l as ORIENTATIONS, o as COLOR_MODES, p as SIDES } from "./AppProvider-Dey2SDbi.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as FileText, _ as Minus, m as Plus } from "../_libs/lucide-react.mjs";
import { c as EmptyState, i as Button, l as Field, o as Card, p as Segmented, t as AppShell } from "./AppShell-B3q1XuMP.mjs";
import { i as bytes, s as rupees } from "./format-WCDBxseN.mjs";
import { t as shopService } from "./shopService-CBJPXhRb.mjs";
import { n as PriceBreakdown } from "./domain-CRhfeU8A.mjs";
import { i as validateCopies, r as parsePageRange } from "./validation-CcsLCRjg.mjs";
import { r as perPageRate, t as calculatePrice } from "./pricing-B-v3W0xz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/configure-BtJTnBLJ.js
var import_jsx_runtime = require_jsx_runtime();
function ConfigurePage() {
	const { draft, setDraft } = useApp();
	const nav = useNavigate();
	const shop = draft.shopId ? shopService.get(draft.shopId) : null;
	const doc = draft.document;
	if (!shop || !doc) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		back: "/upload",
		title: "Configure Print",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileText,
			title: "No document selected",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/upload",
				className: "btn btn--primary",
				children: "Upload a document"
			})
		})
	});
	const s = draft.settings;
	const set = (patch) => setDraft({ settings: {
		...s,
		...patch
	} });
	const copiesErr = validateCopies(s.copies);
	const range = s.pageRange.mode === "custom" ? parsePageRange(s.pageRange.value, doc.pageCount) : { ok: true };
	const price = calculatePrice({
		settings: {
			...s,
			copies: copiesErr ? 0 : s.copies
		},
		pageCount: doc.pageCount,
		shop,
		tier: "flexible"
	});
	const valid = !copiesErr && range.ok && price.pages > 0;
	const paperOpts = PAPER_SIZES.map((p) => ({
		value: p,
		label: p,
		disabled: perPageRate(shop, p, s.color) === null,
		hint: "Not offered at this shop"
	}));
	const bindOpts = BINDINGS.map((b) => ({
		...b,
		disabled: b.value !== "none" && shop.pricing.binding[b.value] == null,
		hint: "Not offered at this shop"
	}));
	const stepCopies = (d) => set({ copies: Math.min(100, Math.max(1, (Number(s.copies) || 1) + d)) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: "/upload",
		title: "Configure Print",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "footer-price",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label",
				children: "Total estimate"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "big",
				children: valid ? rupees(price.totalPaise) : "—"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !valid,
				onClick: () => nav({ to: "/review" }),
				children: "Continue"
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "file-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
					size: 28,
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "file-card__body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "truncate",
						children: doc.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "meta",
						children: [
							doc.pageCount,
							" pages",
							doc.pageCountSource === "estimated" ? " (estimated)" : "",
							" ·",
							" ",
							bytes(doc.size)
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
						label: "Paper Size",
						options: paperOpts,
						value: s.paper,
						onChange: (v) => set({ paper: v }),
						columns: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
						label: "Color",
						options: COLOR_MODES,
						value: s.color,
						onChange: (v) => set({ color: v }),
						columns: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "two-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
							label: "Sides",
							options: SIDES,
							value: s.sides,
							onChange: (v) => set({ sides: v }),
							columns: 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
							label: "Orientation",
							options: ORIENTATIONS,
							value: s.orientation,
							onChange: (v) => set({ orientation: v }),
							columns: 1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field-label",
								htmlFor: "copies",
								children: [
									"Copies (",
									1,
									"–",
									100,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "stepper",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "icon-btn",
										onClick: () => stepCopies(-1),
										disabled: Number(s.copies) <= 1,
										"aria-label": "Decrease copies",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 18 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "copies",
										className: "input",
										type: "number",
										inputMode: "numeric",
										min: 1,
										max: 100,
										value: s.copies,
										onChange: (e) => set({ copies: e.target.value === "" ? "" : Number(e.target.value) }),
										"aria-invalid": !!copiesErr || void 0,
										"aria-describedby": copiesErr ? "copies-err" : void 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "icon-btn",
										onClick: () => stepCopies(1),
										disabled: Number(s.copies) >= 100,
										"aria-label": "Increase copies",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 })
									})
								]
							}),
							copiesErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								id: "copies-err",
								children: copiesErr
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
						label: "Page Range",
						options: [{
							value: "all",
							label: `All (${doc.pageCount})`
						}, {
							value: "custom",
							label: "Custom"
						}],
						value: s.pageRange.mode,
						onChange: (v) => set({ pageRange: {
							...s.pageRange,
							mode: v
						} }),
						columns: 2
					}),
					s.pageRange.mode === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Pages to print",
						placeholder: "e.g. 1-3,5",
						inputMode: "numeric",
						value: s.pageRange.value,
						onChange: (e) => set({ pageRange: {
							mode: "custom",
							value: e.target.value
						} }),
						error: !range.ok ? range.error : null,
						hint: range.ok ? `${range.count} page(s) selected of ${doc.pageCount}` : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
						label: "Binding",
						options: bindOpts,
						value: s.binding,
						onChange: (v) => set({ binding: v }),
						columns: 4
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "h3",
					children: "Price estimate"
				}),
				valid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBreakdown, {
					price,
					tier: "flexible"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: "Fix the highlighted settings to see the price."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: "Current frontend estimate from this shop's price list. Double-sided is charged per printed page, the same as single-sided (assumption). You'll choose Urgent or Flexible on the next screen."
				})
			] })
		]
	});
}
var SplitComponent = ConfigurePage;
//#endregion
export { SplitComponent as component };
