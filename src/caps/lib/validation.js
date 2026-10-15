import { ACCEPTED_FORMATS, COPIES_MAX, COPIES_MIN, MAX_FILE_BYTES, MAX_FILE_MB } from "./config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

export function isEmail(v) {
  return EMAIL_RE.test(String(v || "").trim());
}
export function isPhone(v) {
  return PHONE_RE.test(String(v || "").replace(/\s+/g, ""));
}

export function validateLogin({ identifier, password }) {
  const e = {};
  const id = String(identifier || "").trim();
  if (!id) e.identifier = "Enter your phone number or email.";
  // Temporary local login accepts any non-empty identifier until backend auth is connected.
  if (!password) e.password = "Enter your password.";
  return e;
}

export function validateRegister({ name, phone, email, password, confirm, agree }) {
  const e = {};
  const n = String(name || "").trim();
  if (!n) e.name = "Enter your full name.";
  else if (n.length < 2 || n.length > 80) e.name = "Name must be 2–80 characters.";
  if (!phone) e.phone = "Enter your phone number.";
  else if (!isPhone(phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!email) e.email = "Enter your email address.";
  else if (!isEmail(email)) e.email = "Enter a valid email address.";
  if (!password) e.password = "Create a password.";
  else if (password.length < 8) e.password = "Password must be at least 8 characters.";
  if (confirm !== password) e.confirm = "Passwords do not match.";
  if (!agree) e.agree = "You must accept the Terms of Service and Privacy Policy.";
  return e;
}

export function validateProfile({ name, phone, email }) {
  const e = validateRegister({
    name,
    phone,
    email,
    password: "xxxxxxxx",
    confirm: "xxxxxxxx",
    agree: true,
  });
  return e;
}

export function validateCopies(value) {
  const n = Number(value);
  if (value === "" || value === null || value === undefined) return "Enter number of copies.";
  if (!Number.isInteger(n)) return "Copies must be a whole number.";
  if (n < COPIES_MIN || n > COPIES_MAX)
    return `Copies must be between ${COPIES_MIN} and ${COPIES_MAX}.`;
  return null;
}

/**
 * ASSUMPTION A3 — custom range syntax "1-3,5,8-10". Pages must be within
 * 1..total, ranges must be ascending; duplicates are merged.
 * Returns { ok, pages: number[], count, error }.
 */
export function parsePageRange(input, total) {
  const str = String(input || "").replace(/\s+/g, "");
  if (!str) return { ok: false, pages: [], count: 0, error: "Enter a page range, e.g. 1-3,5." };
  if (!/^[0-9,-]+$/.test(str))
    return { ok: false, pages: [], count: 0, error: "Use only numbers, commas and hyphens." };
  const set = new Set();
  for (const part of str.split(",")) {
    if (!part)
      return { ok: false, pages: [], count: 0, error: "Remove the empty entry between commas." };
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m)
      return { ok: false, pages: [], count: 0, error: `"${part}" is not a valid page or range.` };
    const a = Number(m[1]);
    const b = m[2] !== undefined ? Number(m[2]) : a;
    if (a < 1 || b < 1) return { ok: false, pages: [], count: 0, error: "Pages start at 1." };
    if (a > b) return { ok: false, pages: [], count: 0, error: `Range "${part}" is reversed.` };
    if (b > total)
      return {
        ok: false,
        pages: [],
        count: 0,
        error: `Page ${b} exceeds the document's ${total} pages.`,
      };
    for (let i = a; i <= b; i++) set.add(i);
  }
  const pages = [...set].sort((x, y) => x - y);
  return { ok: true, pages, count: pages.length, error: null };
}

export function fileExtension(name) {
  const m = String(name || "")
    .toLowerCase()
    .match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

/** SRS FR-1.3 format check + ASSUMPTION A6 size limit. */
export function validateFile(file) {
  if (!file) return { ok: false, error: "No file selected." };
  const ext = fileExtension(file.name);
  const fmt = ACCEPTED_FORMATS.find((f) => f.exts.includes(ext));
  if (!fmt)
    return {
      ok: false,
      error: `".${ext || "?"}" files are not supported. Use PDF, DOCX, PPT, JPG or PNG.`,
    };
  if (file.type && !fmt.mimes.includes(file.type) && file.type !== "application/octet-stream")
    return {
      ok: false,
      error: `The file content type (${file.type}) doesn't match a ${fmt.key} file.`,
    };
  if (file.size === 0) return { ok: false, error: "This file is empty." };
  if (file.size > MAX_FILE_BYTES)
    return { ok: false, error: `File is larger than ${MAX_FILE_MB} MB.` };
  return { ok: true, format: fmt.key, ext };
}

export function validateUpi(v) {
  if (!v) return "Enter your UPI ID.";
  if (!/^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/.test(v.trim()))
    return "Enter a valid UPI ID, e.g. name@okbank.";
  return null;
}
