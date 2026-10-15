// Central frontend configuration. Every value here that is not stated in the SRS
// is a labelled ASSUMPTION (see docs/traceability.md, A1–A9).

/** ASSUMPTION A1 — SRS FR-1.6 requires GST to be shown but gives no rate. */
export const GST_RATE = 0.18;

/** ASSUMPTION A6 — 25 MB limit comes from the UI reference, not the SRS. */
export const MAX_FILE_MB = 25;
export const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

/** SRS FR-1.5 — copy count 1–100. */
export const COPIES_MIN = 1;
export const COPIES_MAX = 100;

/** Upper bound for the frontend page-count estimate (A4). */
export const PAGE_COUNT_MAX = 2000;

/** SRS FR-1.3 — PDF, DOCX, PPT, JPG, PNG. PPTX/JPEG accepted as the same families. */
export const ACCEPTED_FORMATS = [
  { key: "PDF", exts: ["pdf"], mimes: ["application/pdf"] },
  {
    key: "DOCX",
    exts: ["docx"],
    mimes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  },
  {
    key: "PPT",
    exts: ["ppt", "pptx"],
    mimes: [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  },
  { key: "JPG", exts: ["jpg", "jpeg"], mimes: ["image/jpeg"] },
  { key: "PNG", exts: ["png"], mimes: ["image/png"] },
];

export const ACCEPT_ATTR = ACCEPTED_FORMATS.flatMap((f) => [
  ...f.exts.map((e) => "." + e),
  ...f.mimes,
]).join(",");

/** SRS FR-1.5 option sets. */
export const PAPER_SIZES = ["A4", "A3", "Legal"];
export const COLOR_MODES = [
  { value: "bw", label: "Black & White" },
  { value: "color", label: "Color" },
];
export const SIDES = [
  { value: "single", label: "Single-sided" },
  { value: "double", label: "Double-sided" },
];
export const ORIENTATIONS = [
  { value: "portrait", label: "Portrait" },
  { value: "landscape", label: "Landscape" },
];
export const BINDINGS = [
  { value: "none", label: "None" },
  { value: "spiral", label: "Spiral" },
  { value: "staple", label: "Staple" },
  { value: "lamination", label: "Lamination" },
];

/** SRS §7.5 payments.method */
export const PAYMENT_METHODS = [
  { value: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm" },
  { value: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay" },
  { value: "wallet", label: "Wallet", hint: "Paytm, Amazon Pay, Mobikwik" },
  { value: "pay_at_counter", label: "Pay at Counter", hint: "Cash or shop QR" },
];

/** ASSUMPTION A5 — cancellation allowed only in these statuses. */
export const CANCELLABLE_STATUSES = ["pending_payment", "queued"];

export const DEFAULT_SETTINGS = {
  paper: "A4",
  color: "bw",
  sides: "single",
  orientation: "portrait",
  copies: 1,
  pageRange: { mode: "all", value: "" },
  binding: "none",
};
