import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { r as AppProvider } from "./AppProvider-Dey2SDbi.mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as pageHead } from "./meta-4UnJSb34.mjs";
import { t as Route$16 } from "./orders._orderId-B7JorVCo.mjs";
import { t as Route$17 } from "./payment._orderId-BCvPXAAX.mjs";
import { t as Route$18 } from "./shops._shopId-BQ-0rbwh.mjs";
import { t as Route$19 } from "./track._orderId-BOYEPCSv.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BeQH1bnM.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Z8CLynr6.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CAPS — Cloud Automated Printing Solution" },
			{
				name: "description",
				content: "Upload, configure, pay and track print jobs at nearby shops."
			},
			{
				name: "theme-color",
				content: "#13234a"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$14 = () => import("./routes-DXa-RdxM.mjs");
var Route$14 = createFileRoute("/")({
	head: () => pageHead("Find print shops", "Find nearby CAPS print shops with distance, rating, wait time and prices."),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./configure-BtJTnBLJ.mjs");
var Route$13 = createFileRoute("/configure")({
	head: () => pageHead("Configure print", "Choose paper size, color, sides, copies, page range and binding with live pricing."),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./forgot-password-pC-Lm36c.mjs");
var Route$12 = createFileRoute("/forgot-password")({
	head: () => pageHead("Reset password", "Reset your CAPS account password."),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./help-BWf3siu4.mjs");
var Route$11 = createFileRoute("/help")({
	head: () => pageHead("Help & Support", "Answers to common CAPS questions."),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./login-DJGmQacp.mjs");
var Route$10 = createFileRoute("/login")({
	head: () => pageHead("Log in", "Sign in to CAPS to print documents at nearby shops."),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./notifications-CElfWeia.mjs");
var Route$9 = createFileRoute("/notifications")({
	head: () => pageHead("Notifications", "Updates about your CAPS print jobs."),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./privacy-B_tNLwSU.mjs");
var Route$8 = createFileRoute("/privacy")({
	head: () => pageHead("Privacy Policy", "How CAPS handles your documents and data."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./register-DapviKSa.mjs");
var Route$7 = createFileRoute("/register")({
	head: () => pageHead("Create account", "Create a CAPS account to upload, configure and track print jobs."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./review-DIS3I92R.mjs");
var Route$6 = createFileRoute("/review")({
	head: () => pageHead("Review & payment", "Choose Urgent or Flexible priority, review price and pick a payment method."),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./settings-DGHtLnLY.mjs");
var Route$5 = createFileRoute("/settings")({
	head: () => pageHead("Settings", "Notification preferences, privacy and account settings."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./terms-DTQbASa1.mjs");
var Route$4 = createFileRoute("/terms")({
	head: () => pageHead("Terms of Service", "CAPS terms of service."),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./upload-DOTaSRoz.mjs");
var Route$3 = createFileRoute("/upload")({
	head: () => pageHead("Upload document", "Upload a PDF, DOCX, PPT, JPG or PNG document to print."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./orders.index-DZQlNI3B.mjs");
var Route$2 = createFileRoute("/orders/")({
	head: () => pageHead("My orders", "Search and filter your CAPS print job history."),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./profile.index-DoRoRrqp.mjs");
var Route$1 = createFileRoute("/profile/")({
	head: () => pageHead("Profile", "Your CAPS account and preferences."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./profile.edit-6cZEskFy.mjs");
var Route = createFileRoute("/profile/edit")({
	head: () => pageHead("Edit profile", "Update your CAPS name, email and phone."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var ConfigureRoute = Route$13.update({
	id: "/configure",
	path: "/configure",
	getParentRoute: () => Route$15
});
var ForgotPasswordRoute = Route$12.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$15
});
var HelpRoute = Route$11.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$15
});
var LoginRoute = Route$10.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$15
});
var NotificationsRoute = Route$9.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => Route$15
});
var PrivacyRoute = Route$8.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$15
});
var RegisterRoute = Route$7.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$15
});
var ReviewRoute = Route$6.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$15
});
var SettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$15
});
var TermsRoute = Route$4.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$15
});
var UploadRoute = Route$3.update({
	id: "/upload",
	path: "/upload",
	getParentRoute: () => Route$15
});
var OrdersIndexRoute = Route$2.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => Route$15
});
var OrdersOrderIdRoute = Route$16.update({
	id: "/orders/$orderId",
	path: "/orders/$orderId",
	getParentRoute: () => Route$15
});
var PaymentOrderIdRoute = Route$17.update({
	id: "/payment/$orderId",
	path: "/payment/$orderId",
	getParentRoute: () => Route$15
});
var ProfileIndexRoute = Route$1.update({
	id: "/profile/",
	path: "/profile/",
	getParentRoute: () => Route$15
});
var rootRouteChildren = {
	IndexRoute,
	ConfigureRoute,
	ForgotPasswordRoute,
	HelpRoute,
	LoginRoute,
	NotificationsRoute,
	PrivacyRoute,
	RegisterRoute,
	ReviewRoute,
	SettingsRoute,
	TermsRoute,
	UploadRoute,
	OrdersOrderIdRoute,
	PaymentOrderIdRoute,
	ProfileEditRoute: Route.update({
		id: "/profile/edit",
		path: "/profile/edit",
		getParentRoute: () => Route$15
	}),
	ShopsShopIdRoute: Route$18.update({
		id: "/shops/$shopId",
		path: "/shops/$shopId",
		getParentRoute: () => Route$15
	}),
	TrackOrderIdRoute: Route$19.update({
		id: "/track/$orderId",
		path: "/track/$orderId",
		getParentRoute: () => Route$15
	}),
	OrdersIndexRoute,
	ProfileIndexRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
