import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppProvider-Dey2SDbi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "caps_local_state_v2";
var listeners = /* @__PURE__ */ new Set();
var hasWindow = () => typeof window !== "undefined" && !!window.localStorage;
function seed() {
	return {
		users: [],
		session: null,
		prefs: {
			push: true,
			email: false
		},
		orders: [],
		notifications: [],
		counter: 1
	};
}
function removeLegacyData(db) {
	let changed = false;
	db.users?.forEach((user) => {
		if (Object.hasOwn(user, "password")) {
			delete user.password;
			changed = true;
		}
	});
	if (db.users?.some((user) => user.id === "demo-user")) {
		db.users = db.users.filter((user) => user.id !== "demo-user");
		changed = true;
	}
	if (db.session === "demo-user") {
		db.session = null;
		changed = true;
	}
	if (db.orders?.some((order) => order.seeded)) {
		db.orders = db.orders.filter((order) => !order.seeded);
		changed = true;
	}
	if (db.notifications?.some((notification) => notification.id?.startsWith("n-seed"))) {
		db.notifications = db.notifications.filter((notification) => !notification.id?.startsWith("n-seed"));
		changed = true;
	}
	return changed;
}
var cache = null;
function read() {
	if (cache) return cache;
	if (!hasWindow()) return seed();
	try {
		const raw = window.localStorage.getItem(KEY);
		cache = raw ? JSON.parse(raw) : seed();
		if (removeLegacyData(cache)) window.localStorage.setItem(KEY, JSON.stringify(cache));
	} catch {
		cache = seed();
	}
	return cache;
}
function write(mutator) {
	const next = structuredClone(read());
	mutator(next);
	cache = next;
	if (hasWindow()) window.localStorage.setItem(KEY, JSON.stringify(next));
	listeners.forEach((l) => l(next));
	return next;
}
function subscribe(fn) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}
function clearLocalState() {
	cache = null;
	if (hasWindow()) window.localStorage.removeItem(KEY);
	const s = read();
	write(() => {});
	return s;
}
var delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
/** ASSUMPTION A1 — SRS FR-1.6 requires GST to be shown but gives no rate. */
var GST_RATE = .18;
/** Upper bound for the frontend page-count estimate (A4). */
var PAGE_COUNT_MAX = 2e3;
/** SRS FR-1.3 — PDF, DOCX, PPT, JPG, PNG. PPTX/JPEG accepted as the same families. */
var ACCEPTED_FORMATS = [
	{
		key: "PDF",
		exts: ["pdf"],
		mimes: ["application/pdf"]
	},
	{
		key: "DOCX",
		exts: ["docx"],
		mimes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
	},
	{
		key: "PPT",
		exts: ["ppt", "pptx"],
		mimes: ["application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
	},
	{
		key: "JPG",
		exts: ["jpg", "jpeg"],
		mimes: ["image/jpeg"]
	},
	{
		key: "PNG",
		exts: ["png"],
		mimes: ["image/png"]
	}
];
var ACCEPT_ATTR = ACCEPTED_FORMATS.flatMap((f) => [...f.exts.map((e) => "." + e), ...f.mimes]).join(",");
/** SRS FR-1.5 option sets. */
var PAPER_SIZES = [
	"A4",
	"A3",
	"Legal"
];
var COLOR_MODES = [{
	value: "bw",
	label: "Black & White"
}, {
	value: "color",
	label: "Color"
}];
var SIDES = [{
	value: "single",
	label: "Single-sided"
}, {
	value: "double",
	label: "Double-sided"
}];
var ORIENTATIONS = [{
	value: "portrait",
	label: "Portrait"
}, {
	value: "landscape",
	label: "Landscape"
}];
var BINDINGS = [
	{
		value: "none",
		label: "None"
	},
	{
		value: "spiral",
		label: "Spiral"
	},
	{
		value: "staple",
		label: "Staple"
	},
	{
		value: "lamination",
		label: "Lamination"
	}
];
/** SRS §7.5 payments.method */
var PAYMENT_METHODS = [
	{
		value: "upi",
		label: "UPI",
		hint: "GPay, PhonePe, Paytm"
	},
	{
		value: "card",
		label: "Credit / Debit Card",
		hint: "Visa, Mastercard, RuPay"
	},
	{
		value: "wallet",
		label: "Wallet",
		hint: "Paytm, Amazon Pay, Mobikwik"
	},
	{
		value: "pay_at_counter",
		label: "Pay at Counter",
		hint: "Cash or shop QR"
	}
];
/** ASSUMPTION A5 — cancellation allowed only in these statuses. */
var CANCELLABLE_STATUSES = ["pending_payment", "queued"];
var DEFAULT_SETTINGS = {
	paper: "A4",
	color: "bw",
	sides: "single",
	orientation: "portrait",
	copies: 1,
	pageRange: {
		mode: "all",
		value: ""
	},
	binding: "none"
};
var AppCtx = globalThis.__capsAppCtx || (globalThis.__capsAppCtx = (0, import_react.createContext)(null));
var DRAFT_KEY = "caps_draft_v1";
var emptyDraft = {
	shopId: null,
	document: null,
	settings: DEFAULT_SETTINGS,
	tier: null,
	paymentMethod: null
};
function AppProvider({ children }) {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [db, setDb] = (0, import_react.useState)(null);
	const [draft, setDraftState] = (0, import_react.useState)(emptyDraft);
	(0, import_react.useEffect)(() => {
		setDb(read());
		try {
			const d = sessionStorage.getItem(DRAFT_KEY);
			if (d) setDraftState({
				...emptyDraft,
				...JSON.parse(d)
			});
		} catch {}
		setHydrated(true);
		return subscribe((next) => setDb(next));
	}, []);
	const setDraft = (0, import_react.useCallback)((patch) => {
		setDraftState((prev) => {
			const next = typeof patch === "function" ? patch(prev) : {
				...prev,
				...patch
			};
			sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next));
			return next;
		});
	}, []);
	const clearDraft = (0, import_react.useCallback)(() => {
		sessionStorage.removeItem(DRAFT_KEY);
		setDraftState(emptyDraft);
	}, []);
	const value = (0, import_react.useMemo)(() => {
		const user = db ? db.users.find((u) => u.id === db.session) || null : null;
		const notifications = db?.notifications || [];
		return {
			hydrated,
			user,
			orders: db?.orders || [],
			notifications,
			unread: notifications.filter((n) => !n.read).length,
			prefs: db?.prefs || {},
			draft,
			setDraft,
			clearDraft
		};
	}, [
		hydrated,
		db,
		draft,
		setDraft,
		clearDraft
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppCtx.Provider, {
		value,
		children
	});
}
function useApp() {
	const v = (0, import_react.useContext)(AppCtx);
	if (!v) throw new Error("useApp must be used inside AppProvider");
	return v;
}
//#endregion
export { useApp as _, CANCELLABLE_STATUSES as a, GST_RATE as c, PAPER_SIZES as d, PAYMENT_METHODS as f, read as g, delay as h, BINDINGS as i, ORIENTATIONS as l, clearLocalState as m, ACCEPT_ATTR as n, COLOR_MODES as o, SIDES as p, AppProvider as r, DEFAULT_SETTINGS as s, ACCEPTED_FORMATS as t, PAGE_COUNT_MAX as u, write as v };
