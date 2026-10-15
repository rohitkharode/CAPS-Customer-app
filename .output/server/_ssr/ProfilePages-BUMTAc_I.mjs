import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp, g as read, h as delay, m as clearLocalState, v as write } from "./AppProvider-Dey2SDbi.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ChevronRight, L as Bell, N as CircleQuestionMark, c as Shield, d as Settings, k as CreditCard, r as User, y as LogOut } from "../_libs/lucide-react.mjs";
import { h as Toggle, i as Button, l as Field, o as Card, s as Dialog, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { s as validateProfile } from "./validation-CcsLCRjg.mjs";
import { t as authService } from "./authService-D9fZe_iG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProfilePages-BUMTAc_I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var profileService = {
	async update(patch) {
		await delay(500);
		const db = read();
		if (db.users.some((u) => u.id !== db.session && u.email.toLowerCase() === patch.email.trim().toLowerCase())) throw new Error("Another account already uses this email.");
		write((d) => {
			const u = d.users.find((x) => x.id === d.session);
			Object.assign(u, {
				name: patch.name.trim(),
				email: patch.email.trim(),
				phone: patch.phone.replace(/\s+/g, "").replace(/^\+91/, "")
			});
		});
	},
	prefs: () => read().prefs,
	setPref(key, value) {
		write((d) => d.prefs[key] = value);
	}
};
function useLogout() {
	const nav = useNavigate();
	const { clearDraft } = useApp();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	return {
		open: () => setOpen(true),
		dialog: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			title: "Log out?",
			onClose: () => setOpen(false),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => setOpen(false),
				children: "Stay"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "danger",
				loading: busy,
				onClick: async () => {
					setBusy(true);
					await authService.logout();
					clearDraft();
					nav({ to: "/login" });
				},
				children: "Log out"
			})] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You'll need to sign in again to place or track print jobs." })
		})
	};
}
function NavRow({ to, icon: Icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "nav-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: 20,
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
				size: 18,
				"aria-hidden": true
			})
		]
	});
}
function ProfilePage() {
	const { user } = useApp();
	const logout = useLogout();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Profile",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "profile-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "avatar",
					"aria-hidden": true,
					children: user?.name.split(" ").map((p) => p[0]).slice(0, 2).join("")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "h2",
					children: user?.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted small",
					children: ["ID: ", user?.id]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "h3",
				children: "Account details"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "settings-grid one",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "truncate",
					children: user?.email
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["+91 ", user?.phone] })] })]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "nav-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						to: "/profile/edit",
						icon: User,
						label: "Personal info"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						to: "/settings",
						icon: Bell,
						label: "Notifications"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						to: "/privacy",
						icon: Shield,
						label: "Privacy & Security"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						to: "/settings",
						icon: Settings,
						label: "App settings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						to: "/help",
						icon: CircleQuestionMark,
						label: "Help & Support"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "danger",
				block: true,
				onClick: logout.open,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
					size: 18,
					"aria-hidden": true
				}), " Logout"]
			}),
			logout.dialog
		]
	});
}
function EditProfilePage() {
	const { user } = useApp();
	const nav = useNavigate();
	const [f, setF] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const form = f || (user ? {
		name: user.name,
		email: user.email,
		phone: user.phone
	} : {
		name: "",
		email: "",
		phone: ""
	});
	const set = (k) => (e) => setF({
		...form,
		[k]: e.target.value
	});
	const save = async (e) => {
		e.preventDefault();
		const v = validateProfile(form);
		setErrors(v);
		if (Object.keys(v).length) return;
		setBusy(true);
		setErr("");
		try {
			await profileService.update(form);
			nav({ to: "/profile" });
		} catch (x) {
			setErr(x.message);
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		back: "/profile",
		title: "Edit Profile",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "stack",
			onSubmit: save,
			noValidate: true,
			children: [
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Full Name",
					autoComplete: "name",
					value: form.name,
					onChange: set("name"),
					error: errors.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					type: "email",
					inputMode: "email",
					autoComplete: "email",
					value: form.email,
					onChange: set("email"),
					error: errors.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Phone",
					type: "tel",
					inputMode: "tel",
					autoComplete: "tel",
					value: form.phone,
					onChange: set("phone"),
					error: errors.phone
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					block: true,
					loading: busy,
					children: "Save changes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile",
					className: "btn btn--ghost btn--block",
					children: "Cancel"
				})
			]
		})
	});
}
function SettingsPage() {
	const { prefs } = useApp();
	const logout = useLogout();
	const [reset, setReset] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: "/profile",
		title: "Settings",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "h3",
					children: "Notifications"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					label: "Push notifications",
					description: "Job updates appear in the app only; push delivery isn't connected.",
					checked: !!prefs.push,
					onChange: (v) => profileService.setPref("push", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					label: "Email notifications",
					description: "Saved as a preference only; email delivery isn't connected.",
					checked: !!prefs.email,
					onChange: (v) => profileService.setPref("email", v)
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "nav-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "h3",
						children: "Account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						to: "/profile/edit",
						icon: User,
						label: "Edit profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nav-row static",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
							size: 20,
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Payment methods", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "muted small block",
							children: "No saved methods. CAPS doesn't store card or UPI credentials; you choose a method for each order."
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "h3",
					children: "Privacy & Security"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: "Under the CAPS policy, documents are kept in encrypted storage and deleted automatically after the retention window. Backend enforcement isn't connected in this frontend."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
					to: "/privacy",
					icon: Shield,
					label: "Privacy Policy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
					to: "/terms",
					icon: Shield,
					label: "Terms of Service"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "nav-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
					to: "/help",
					icon: CircleQuestionMark,
					label: "Help & Support"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				block: true,
				onClick: () => setReset(true),
				children: "Clear local data"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "danger",
				block: true,
				onClick: logout.open,
				children: "Logout"
			}),
			logout.dialog,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: reset,
				title: "Clear local data?",
				onClose: () => setReset(false),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setReset(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					onClick: () => {
						clearLocalState();
						window.location.href = "/login";
					},
					children: "Reset"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This clears local accounts, orders and notifications stored in this browser." })
			})
		]
	});
}
//#endregion
export { ProfilePage as n, SettingsPage as r, EditProfilePage as t };
