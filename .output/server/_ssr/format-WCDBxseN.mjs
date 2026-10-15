//#region node_modules/.nitro/vite/services/ssr/assets/format-WCDBxseN.js
var inr = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	minimumFractionDigits: 2
});
var rupees = (paise) => inr.format((paise || 0) / 100);
function bytes(n) {
	if (n < 1024) return `${n} B`;
	if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
	return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
function dateTime(ts) {
	return new Date(ts).toLocaleString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function relative(ts, now = Date.now()) {
	const s = Math.max(0, Math.round((now - ts) / 1e3));
	if (s < 60) return `${s}s ago`;
	const m = Math.round(s / 60);
	if (m < 60) return `${m} min ago`;
	const h = Math.round(m / 60);
	if (h < 24) return `${h} h ago`;
	return dateTime(ts);
}
var STATUS = {
	pending_payment: {
		label: "Pending payment",
		tone: "warn"
	},
	queued: {
		label: "Queued",
		tone: "info"
	},
	printing: {
		label: "Printing",
		tone: "accent"
	},
	completed: {
		label: "Completed",
		tone: "ok"
	},
	failed: {
		label: "Failed",
		tone: "danger"
	},
	cancelled: {
		label: "Cancelled",
		tone: "muted"
	}
};
var PAYMENT_STATUS = {
	initiated: "Initiated",
	success: "Success",
	failed: "Failed",
	refunded: "Refunded"
};
var LABELS = {
	bw: "Black & White",
	color: "Color",
	single: "Single-sided",
	double: "Double-sided",
	portrait: "Portrait",
	landscape: "Landscape",
	none: "No binding",
	spiral: "Spiral",
	staple: "Staple",
	lamination: "Lamination",
	urgent: "Urgent",
	flexible: "Flexible",
	upi: "UPI",
	card: "Card",
	wallet: "Wallet",
	pay_at_counter: "Pay at Counter"
};
//#endregion
export { dateTime as a, bytes as i, PAYMENT_STATUS as n, relative as o, STATUS as r, rupees as s, LABELS as t };
