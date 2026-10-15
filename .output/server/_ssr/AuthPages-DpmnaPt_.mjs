import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as PasswordField, i as Button, l as Field, n as AuthLayout, s as Dialog, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { c as validateRegister, n as isPhone, o as validateLogin, t as isEmail } from "./validation-CcsLCRjg.mjs";
import { t as authService } from "./authService-D9fZe_iG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthPages-DpmnaPt_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const nav = useNavigate();
	const [f, setF] = (0, import_react.useState)({
		identifier: "",
		password: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [google, setGoogle] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		const errs = validateLogin(f);
		setErrors(errs);
		setFormError("");
		if (Object.keys(errs).length) return;
		setLoading(true);
		try {
			await authService.login(f);
			nav({ to: "/" });
		} catch (err) {
			setFormError(err.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "h1",
			children: "Welcome back"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted",
			children: "Sign in to your print account"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted small",
			children: "Temporary sign-in is enabled while backend authentication is pending."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			noValidate: true,
			className: "stack",
			children: [
				formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: formError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Phone number or Email",
					autoComplete: "username",
					inputMode: "email",
					value: f.identifier,
					onChange: (e) => setF({
						...f,
						identifier: e.target.value
					}),
					error: errors.identifier
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
					label: "Password",
					autoComplete: "current-password",
					value: f.password,
					onChange: (e) => setF({
						...f,
						password: e.target.value
					}),
					error: errors.password
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						className: "link",
						children: "Forgot password?"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					block: true,
					loading,
					children: "Log In"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divider",
			children: "or continue with"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			block: true,
			onClick: () => setGoogle(true),
			children: "Google Sign-In"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "center",
			children: [
				"New to CAPS?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					className: "link",
					children: "Create account"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted small center",
			children: "In the full system, traffic between your device and CAPS will use encrypted transport (HTTPS). Backend authentication is not connected in this frontend."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: google,
			title: "Google Sign-In not connected",
			onClose: () => setGoogle(false),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setGoogle(false),
				children: "OK"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Google Sign-In is not connected yet. Use the temporary sign-in form while backend authentication is pending." })
		})
	] });
}
function RegisterPage() {
	const nav = useNavigate();
	const [f, setF] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		password: "",
		confirm: "",
		agree: false
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const set = (k) => (e) => setF({
		...f,
		[k]: e.target.type === "checkbox" ? e.target.checked : e.target.value
	});
	const submit = async (e) => {
		e.preventDefault();
		const errs = validateRegister(f);
		setErrors(errs);
		setFormError("");
		if (Object.keys(errs).length) return;
		setLoading(true);
		try {
			await authService.register(f);
			nav({ to: "/" });
		} catch (err) {
			setFormError(err.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "h1",
			children: "Create Account"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted",
			children: "Join CAPS to track your print jobs across partner shops."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			noValidate: true,
			className: "stack",
			children: [
				formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: formError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Full Name",
					autoComplete: "name",
					placeholder: "e.g. Priya Patil",
					value: f.name,
					onChange: set("name"),
					error: errors.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Phone Number",
					type: "tel",
					inputMode: "tel",
					autoComplete: "tel",
					placeholder: "98765 43210",
					value: f.phone,
					onChange: set("phone"),
					error: errors.phone
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email Address",
					type: "email",
					inputMode: "email",
					autoComplete: "email",
					placeholder: "priya@example.com",
					value: f.email,
					onChange: set("email"),
					error: errors.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
					label: "Password",
					autoComplete: "new-password",
					hint: "Minimum 8 characters",
					value: f.password,
					onChange: set("password"),
					error: errors.password
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
					label: "Confirm Password",
					autoComplete: "new-password",
					value: f.confirm,
					onChange: set("confirm"),
					error: errors.confirm
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "check",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: f.agree,
							onChange: set("agree"),
							"aria-invalid": !!errors.agree || void 0
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"I agree to the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "link",
								children: "Terms of Service"
							}),
							" ",
							"and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "link",
								children: "Privacy Policy"
							}),
							"."
						] })]
					}), errors.agree && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "field-error",
						children: errors.agree
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					block: true,
					loading,
					children: "Create Account"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "center",
			children: [
				"Already have an account?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "link",
					children: "Log in"
				})
			]
		})
	] });
}
function ForgotPasswordPage() {
	const [id, setId] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		if (!isEmail(id) && !isPhone(id)) return setError("Enter a valid email or 10-digit mobile number.");
		setError("");
		setLoading(true);
		await authService.requestPasswordReset(id);
		setLoading(false);
		setSent(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "h1",
		children: "Reset password"
	}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
		tone: "ok",
		children: [
			"If an account exists for ",
			id,
			", a reset link would be sent after backend authentication is connected."
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "btn btn--primary btn--block",
		children: "Back to login"
	})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		noValidate: true,
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: "Enter the email or phone linked to your account."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Phone number or Email",
				inputMode: "email",
				value: id,
				onChange: (e) => setId(e.target.value),
				error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				block: true,
				loading,
				children: "Send reset link"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "link center",
				children: "Back to login"
			})
		]
	})] });
}
//#endregion
export { LoginPage as n, RegisterPage as r, ForgotPasswordPage as t };
