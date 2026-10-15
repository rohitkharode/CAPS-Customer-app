import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp } from "./AppProvider-Dey2SDbi.mjs";
import { b as useNavigate, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as EyeOff, E as Eye, L as Bell, S as Info, T as FileText, b as LoaderCircle, n as X, p as Printer, r as User, w as House, z as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-B3q1XuMP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var configuredBaseUrl = String("").trim().replace(/\/+$/, "");
var CAPS_RUNTIME = Object.freeze({
	apiBaseUrl: configuredBaseUrl,
	backendConfigured: Boolean(configuredBaseUrl),
	mode: configuredBaseUrl ? "backend-pending" : "local-only"
});
function integrationPending(capability) {
	const error = /* @__PURE__ */ new Error(`${capability} is not connected. Set VITE_CAPS_API_BASE_URL after the backend contract is agreed.`);
	error.code = "CAPS_INTEGRATION_PENDING";
	return error;
}
var cx = (...c) => c.filter(Boolean).join(" ");
function Button({ variant = "primary", block, loading, className, children, disabled, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: cx("btn", `btn--${variant}`, block && "btn--block", className),
		disabled: disabled || loading,
		"aria-busy": loading || void 0,
		...rest,
		children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "spin",
			size: 18,
			"aria-hidden": true
		}), children]
	});
}
function Card({ as: Tag = "section", className, children, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className: cx("card", className),
		...rest,
		children
	});
}
function Badge({ tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("badge", `badge--${tone}`),
		children
	});
}
function Notice({ tone = "info", icon: Icon = Info, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cx("notice", `notice--${tone}`),
		role: tone === "danger" ? "alert" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: 18,
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children })]
	});
}
/** Accessible radio group rendered as pills/cards. */
function Segmented({ label, name, options, value, onChange, columns, size }) {
	const id = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "seg-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "field-label",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cx("seg", size === "lg" && "seg--lg"),
			style: columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` } : void 0,
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: cx("seg__opt", value === o.value && "is-selected", o.disabled && "is-disabled"),
				title: o.disabled ? o.hint : void 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						name: name || id,
						value: o.value,
						checked: value === o.value,
						disabled: o.disabled,
						onChange: () => onChange(o.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "seg__label",
						children: o.label
					}),
					o.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "seg__hint",
						children: o.hint
					})
				]
			}, o.value))
		})]
	});
}
function Field({ label, error, hint, id: idProp, as = "input", className, ...rest }) {
	const auto = (0, import_react.useId)();
	const id = idProp || auto;
	const Tag = as;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cx("field", className),
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "field-label",
				htmlFor: id,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				id,
				className: cx("input", error && "input--error"),
				"aria-invalid": !!error || void 0,
				"aria-describedby": error ? id + "-err" : hint ? id + "-hint" : void 0,
				...rest
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field-error",
				id: id + "-err",
				children: error
			}) : hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field-hint",
				id: id + "-hint",
				children: hint
			}) : null
		]
	});
}
function PasswordField(props) {
	const [show, setShow] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pw",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			type: show ? "text" : "password",
			...props
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "pw__toggle",
			onClick: () => setShow((s) => !s),
			"aria-label": show ? "Hide password" : "Show password",
			"aria-pressed": show,
			children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
		})]
	});
}
function Toggle({ label, description, checked, onChange }) {
	const id = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "toggle-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "toggle-row__label",
			children: label
		}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted small",
			children: description
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			id,
			type: "button",
			role: "switch",
			"aria-checked": checked,
			className: cx("switch", checked && "is-on"),
			onClick: () => onChange(!checked),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
		})]
	});
}
function Dialog({ open, title, children, onClose, actions }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.activeElement;
		ref.current?.querySelector("button, [href], input")?.focus();
		const onKey = (e) => e.key === "Escape" && onClose?.();
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("keydown", onKey);
			prev?.focus?.();
		};
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dialog-backdrop",
		onMouseDown: (e) => e.target === e.currentTarget && onClose?.(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "dlg-title",
			ref,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dialog__head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "dlg-title",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-btn",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dialog__body",
					children
				}),
				actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dialog__actions",
					children: actions
				})
			]
		})
	});
}
function Spinner({ label = "Loading…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "spinner",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "spin",
			size: 28,
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function EmptyState({ icon: Icon, title, children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "empty",
		children: [
			Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: 36,
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
			children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children
			}),
			action
		]
	});
}
function Row({ label, value, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cx("row", strong && "row--strong"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value })]
	});
}
var TABS = [
	{
		to: "/",
		label: "Home",
		icon: House,
		exact: true
	},
	{
		to: "/orders",
		label: "Orders",
		icon: FileText
	},
	{
		to: "/notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		to: "/profile",
		label: "Profile",
		icon: User
	}
];
/** Authenticated page layout with header, integration status and navigation. */
function AppShell({ title, back, children, footer, hideNav }) {
	const { hydrated, user, unread } = useApp();
	const navigate = useNavigate();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		if (hydrated && !user) navigate({
			to: "/login",
			replace: true
		});
	}, [
		hydrated,
		user,
		navigate
	]);
	const goBack = () => {
		if (typeof back === "string") navigate({ to: back });
		else router.history.back();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "sidenav",
			"aria-label": "Main",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
					size: 22,
					"aria-hidden": true
				}), " CAPS"]
			}), TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
				tab: t,
				unread
			}, t.to))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell__main",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "integration-banner",
					role: "note",
					children: CAPS_RUNTIME.backendConfigured ? "Backend URL configured — endpoint integration is pending confirmation." : "Backend integration pending — local-only features remain available."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "topbar",
					children: [
						back ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "icon-btn",
							onClick: goBack,
							"aria-label": "Go back",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 22 })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "topbar__brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
								size: 20,
								"aria-hidden": true
							}), " CAPS"]
						}),
						title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "topbar__title",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "topbar__spacer" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "content",
					id: "main",
					children: !hydrated || !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : children
				}),
				footer && hydrated && user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky-footer",
					children: footer
				}),
				!hideNav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "bottomnav",
					"aria-label": "Main",
					children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
						tab: t,
						unread
					}, t.to))
				})
			]
		})]
	});
}
function NavItem({ tab, unread }) {
	const Icon = tab.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: tab.to,
		className: "navitem",
		activeProps: {
			className: "navitem is-active",
			"aria-current": "page"
		},
		activeOptions: { exact: !!tab.exact },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "navitem__icon",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: 22,
				"aria-hidden": true
			}), tab.to === "/notifications" && unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "dot",
				"aria-label": `${unread} unread`,
				children: unread
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
	});
}
/** Layout for signed-out screens. */
function AuthLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "auth",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "integration-banner",
			role: "note",
			children: "Backend authentication is pending. This temporary session is not production authentication."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "auth__main",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "auth__brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
					size: 28,
					"aria-hidden": true
				}), " CAPS"]
			}), children]
		})]
	});
}
//#endregion
export { integrationPending as _, CAPS_RUNTIME as a, EmptyState as c, PasswordField as d, Row as f, cx as g, Toggle as h, Button as i, Field as l, Spinner as m, AuthLayout as n, Card as o, Segmented as p, Badge as r, Dialog as s, AppShell as t, Notice as u };
