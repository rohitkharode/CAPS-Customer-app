import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useApp, n as ACCEPT_ATTR, s as DEFAULT_SETTINGS, t as ACCEPTED_FORMATS, u as PAGE_COUNT_MAX } from "./AppProvider-Dey2SDbi.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CloudUpload, T as FileText, a as Trash2, l as ShieldCheck, m as Plus, o as Store } from "../_libs/lucide-react.mjs";
import { _ as integrationPending, a as CAPS_RUNTIME, c as EmptyState, g as cx, i as Button, l as Field, o as Card, t as AppShell, u as Notice } from "./AppShell-B3q1XuMP.mjs";
import { i as bytes } from "./format-WCDBxseN.mjs";
import { t as shopService } from "./shopService-CBJPXhRb.mjs";
import { a as validateFile } from "./validation-CcsLCRjg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-DOTaSRoz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Count pages in a PDF by scanning page objects (best-effort, browser only). */
async function countPdfPages(file) {
	try {
		const m = new TextDecoder("latin1").decode(await file.arrayBuffer()).match(/\/Type\s*\/Page(?!s)/g);
		return m && m.length > 0 ? m.length : null;
	} catch {
		return null;
	}
}
/** ASSUMPTION A4: estimated page count for non-PDF office files. */
function estimatePages(format, size) {
	if (format === "JPG" || format === "PNG") return 1;
	if (format === "DOCX") return Math.max(1, Math.round(size / 3e4));
	if (format === "PPT") return Math.max(1, Math.round(size / 15e4));
	return Math.max(1, Math.round(size / 1e5));
}
var uploadService = {
	validate: validateFile,
	documents(document) {
		return document?.documents || (document ? [document] : []);
	},
	/** Keep the existing print flow compatible with a collection of files. */
	collection(documents) {
		if (!documents.length) return null;
		const first = documents[0];
		if (documents.length === 1) return first;
		return {
			...first,
			name: documents.map((doc) => doc.name).join(", "),
			size: documents.reduce((sum, doc) => sum + doc.size, 0),
			pageCount: documents.reduce((sum, doc) => sum + doc.pageCount, 0),
			pageCountSource: documents.every((doc) => doc.pageCountSource === "detected") ? "detected" : "estimated",
			needsConversion: documents.some((doc) => doc.needsConversion),
			documents
		};
	},
	/** Local metadata preparation; no upload or fake network progress occurs. */
	async upload(file, { onProgress, signal } = {}) {
		const v = validateFile(file);
		if (!v.ok) throw new Error(v.error);
		if (CAPS_RUNTIME.backendConfigured) throw integrationPending("Document upload");
		if (signal?.aborted) throw new DOMException("Upload cancelled", "AbortError");
		let pageCount = null;
		let pageCountSource = "estimated";
		if (v.format === "PDF") {
			pageCount = await countPdfPages(file);
			if (pageCount) pageCountSource = "detected";
		}
		if (!pageCount) pageCount = estimatePages(v.format, file.size);
		if (v.format === "JPG" || v.format === "PNG") pageCountSource = "image";
		return {
			name: file.name,
			size: file.size,
			format: v.format,
			ext: v.ext,
			pageCount,
			pageCountSource,
			needsConversion: v.format === "DOCX" || v.format === "PPT",
			uploadedAt: Date.now(),
			localMetadataOnly: true
		};
	}
};
function UploadPage() {
	const { draft, setDraft } = useApp();
	const nav = useNavigate();
	const input = (0, import_react.useRef)(null);
	const abort = (0, import_react.useRef)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(null);
	const shop = draft.shopId ? shopService.get(draft.shopId) : null;
	const doc = draft.document;
	const documents = uploadService.documents(doc);
	if (!shop) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		back: "/",
		title: "Upload Document",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Store,
			title: "Choose a shop first",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "btn btn--primary",
				children: "Browse shops"
			}),
			children: "Pick the print shop where you want to print."
		})
	});
	const handle = async (file) => {
		setError("");
		const v = uploadService.validate(file);
		if (!v.ok) return setError(v.error);
		abort.current = new AbortController();
		setPending(file.name);
		setProgress(0);
		try {
			const meta = await uploadService.upload(file, {
				onProgress: setProgress,
				signal: abort.current.signal
			});
			setDraft((previous) => ({
				...previous,
				document: uploadService.collection([...uploadService.documents(previous.document), meta]),
				settings: previous.document ? {
					...previous.settings,
					pageRange: {
						mode: "all",
						value: ""
					}
				} : { ...DEFAULT_SETTINGS }
			}));
		} catch (e) {
			if (e.name !== "AbortError") setError(e.message);
		} finally {
			setProgress(null);
			setPending(null);
		}
	};
	const onDrop = (e) => {
		e.preventDefault();
		setDrag(false);
		const f = e.dataTransfer.files?.[0];
		if (f) handle(f);
	};
	const updateDocuments = (next) => {
		setDraft({
			document: uploadService.collection(next),
			settings: {
				...draft.settings,
				pageRange: {
					mode: "all",
					value: ""
				}
			}
		});
	};
	const setPages = (index, v) => {
		const n = Math.max(1, Math.min(PAGE_COUNT_MAX, parseInt(v, 10) || 1));
		updateDocuments(documents.map((document, i) => i === index ? {
			...document,
			pageCount: n,
			pageCountSource: "edited"
		} : document));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		back: `/shops/${shop.id}`,
		title: "Upload Document",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			block: true,
			disabled: !doc || progress !== null,
			onClick: () => nav({ to: "/configure" }),
			children: "Continue"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label",
					children: "Printing at"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: shop.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "meta truncate",
					children: [
						shop.address,
						" · ",
						shop.distanceKm,
						" km"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: input,
				type: "file",
				accept: ACCEPT_ATTR,
				hidden: true,
				onChange: (e) => {
					const file = e.target.files?.[0];
					e.target.value = "";
					if (file) handle(file);
				}
			}),
			progress !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pending })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "progress",
					role: "progressbar",
					"aria-valuenow": progress,
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-label": "Upload progress",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${progress}%` } })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: "Preparing local file metadata. No upload has occurred."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => abort.current?.abort(),
					children: "Cancel upload"
				})
			] }) : doc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [documents.map((document, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "file-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						size: 32,
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "file-card__body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "truncate",
								title: document.name,
								children: document.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "meta",
								children: [
									document.format,
									" · ",
									bytes(document.size)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: `Pages ${document.pageCountSource === "detected" ? "(detected from PDF)" : document.pageCountSource === "image" ? "(image = 1 page)" : "(estimated — please check)"}`,
								type: "number",
								inputMode: "numeric",
								min: 1,
								max: PAGE_COUNT_MAX,
								value: document.pageCount,
								onChange: (e) => setPages(index, e.target.value),
								hint: "Estimated page count. The backend will provide the authoritative count."
							}),
							document.needsConversion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, { children: [
								"This ",
								document.format,
								" file requires backend conversion before it can be sent to a shop."
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "document-delete",
						"aria-label": `Delete ${document.name}`,
						title: `Delete ${document.name}`,
						onClick: () => updateDocuments(documents.filter((_, i) => i !== index)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							size: 20,
							"aria-hidden": true
						})
					})
				]
			}, `${document.uploadedAt}-${index}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				onClick: () => input.current?.click(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					size: 18,
					"aria-hidden": true
				}), " Add more"]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: cx("dropzone", drag && "is-drag"),
				onClick: () => input.current?.click(),
				onDragOver: (e) => {
					e.preventDefault();
					setDrag(true);
				},
				onDragLeave: () => setDrag(false),
				onDrop,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
						size: 36,
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tap to upload or drag & drop" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "muted",
						children: "Select a file from your device to begin."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "formats",
						children: ACCEPTED_FORMATS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge--muted",
							children: f.key
						}, f.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "muted small",
						children: [
							"Maximum file size: ",
							25,
							" MB"
						]
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				icon: ShieldCheck,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Secure processing (policy)." }), " In the full CAPS system, documents are kept in encrypted storage and deleted automatically within a set retention window (for example 30 minutes after printing, or 24 hours at most), whatever the print outcome. This frontend does not upload or store your file."]
			})
		]
	});
}
var SplitComponent = UploadPage;
//#endregion
export { SplitComponent as component };
