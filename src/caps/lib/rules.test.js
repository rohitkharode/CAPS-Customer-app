import { describe, expect, it } from "vitest";
import { calculatePrice } from "./pricing";
import { estimateInsertion, orderQueue, urgentAvailable } from "./queue";
import {
  parsePageRange,
  validateCopies,
  validateFile,
  validateRegister,
  validateLogin,
} from "./validation";
import { DEFAULT_SETTINGS, GST_RATE } from "./config";

const shop = (over = {}) => ({
  pricing: {
    perPage: {
      A4: { bw: 200, color: 1000 },
      A3: { bw: 500, color: 2500 },
      Legal: { bw: 240, color: 1200 },
    },
    binding: { none: 0, spiral: 3000, staple: 500, lamination: 2000 },
  },
  urgentSurcharge: { type: "flat", value: 2000 },
  ...over,
});
const s = (o = {}) => ({ ...DEFAULT_SETTINGS, ...o });

describe("pricing (FR-1.6, FR-4.1c; formula = assumption A2/A7)", () => {
  it("charges pages × copies × per-page rate for the chosen paper and color", () => {
    const p = calculatePrice({ settings: s({ copies: 2 }), pageCount: 12, shop: shop() });
    expect(p.printPaise).toBe(12 * 2 * 200);
  });
  it("updates the price when color or paper changes", () => {
    const bw = calculatePrice({ settings: s(), pageCount: 10, shop: shop() }).totalPaise;
    const color = calculatePrice({
      settings: s({ color: "color" }),
      pageCount: 10,
      shop: shop(),
    }).totalPaise;
    const a3 = calculatePrice({
      settings: s({ paper: "A3" }),
      pageCount: 10,
      shop: shop(),
    }).totalPaise;
    expect(color).toBeGreaterThan(bw);
    expect(a3).toBeGreaterThan(bw);
  });
  it("adds binding per copy", () => {
    const p = calculatePrice({
      settings: s({ binding: "spiral", copies: 3 }),
      pageCount: 1,
      shop: shop(),
    });
    expect(p.bindingPaise).toBe(9000);
  });
  it("adds a flat urgent surcharge only for urgent", () => {
    const f = calculatePrice({ settings: s(), pageCount: 10, shop: shop(), tier: "flexible" });
    const u = calculatePrice({ settings: s(), pageCount: 10, shop: shop(), tier: "urgent" });
    expect(f.urgentPaise).toBe(0);
    expect(u.urgentPaise).toBe(2000);
  });
  it("applies a percentage urgent surcharge on print + binding", () => {
    const u = calculatePrice({
      settings: s({ binding: "staple" }),
      pageCount: 10,
      shop: shop({ urgentSurcharge: { type: "percent", value: 25 } }),
      tier: "urgent",
    });
    expect(u.urgentPaise).toBe(Math.round((2000 + 500) * 0.25));
  });
  it("applies GST at the configured rate after the surcharge", () => {
    const u = calculatePrice({ settings: s(), pageCount: 10, shop: shop(), tier: "urgent" });
    expect(u.gstPaise).toBe(Math.round((2000 + 2000) * GST_RATE));
    expect(u.totalPaise).toBe(4000 + u.gstPaise);
  });
  it("prices only the custom page range", () => {
    const p = calculatePrice({
      settings: s({ pageRange: { mode: "custom", value: "1-3,5" } }),
      pageCount: 10,
      shop: shop(),
    });
    expect(p.pages).toBe(4);
  });
  it("recalculates well within 300 ms (NFR 8.1)", () => {
    const t = performance.now();
    for (let i = 0; i < 1000; i++)
      calculatePrice({ settings: s({ copies: (i % 100) + 1 }), pageCount: 50, shop: shop() });
    expect(performance.now() - t).toBeLessThan(300);
  });
});

describe("copies 1–100 (FR-1.5)", () => {
  it("accepts the boundaries 1 and 100", () => {
    expect(validateCopies(1)).toBeNull();
    expect(validateCopies(100)).toBeNull();
  });
  it("rejects 0, 101, decimals and empty", () => {
    expect(validateCopies(0)).not.toBeNull();
    expect(validateCopies(101)).not.toBeNull();
    expect(validateCopies(2.5)).not.toBeNull();
    expect(validateCopies("")).not.toBeNull();
  });
});

describe("custom page range (assumption A3)", () => {
  it("parses ranges and merges duplicates", () => {
    expect(parsePageRange("1-3,5,3", 10).pages).toEqual([1, 2, 3, 5]);
  });
  it("rejects reversed ranges, out-of-bounds pages, zero and junk", () => {
    expect(parsePageRange("5-3", 10).ok).toBe(false);
    expect(parsePageRange("1-11", 10).ok).toBe(false);
    expect(parsePageRange("0", 10).ok).toBe(false);
    expect(parsePageRange("a-b", 10).ok).toBe(false);
    expect(parsePageRange("1,,2", 10).ok).toBe(false);
    expect(parsePageRange("", 10).ok).toBe(false);
  });
});

describe("two-tier queue (FR-4.1, FR-4.1a)", () => {
  const jobs = [
    { id: "F1", tier: "flexible", status: "queued", createdAt: 1 },
    { id: "P", tier: "flexible", status: "printing", createdAt: 0 },
    { id: "U1", tier: "urgent", status: "queued", createdAt: 5 },
    { id: "F2", tier: "flexible", status: "queued", createdAt: 2 },
    { id: "U2", tier: "urgent", status: "queued", createdAt: 3 },
  ];
  it("keeps the printing job first, urgent before flexible, FIFO within each tier", () => {
    expect(orderQueue(jobs).map((j) => j.id)).toEqual(["P", "U2", "U1", "F1", "F2"]);
  });
  it("inserts a new urgent job after printing + earlier urgent jobs", () => {
    expect(estimateInsertion(jobs, "urgent", 3)).toMatchObject({ position: 4, jobsAhead: 3 });
  });
  it("inserts a new flexible job at the end", () => {
    expect(estimateInsertion(jobs, "flexible", 3)).toMatchObject({ position: 6, jobsAhead: 5 });
  });
  it("blocks urgent when the shop's cap is reached (FR-4.1d)", () => {
    expect(urgentAvailable({ urgentCap: { maxPerHour: 3, acceptedThisHour: 3 } }).ok).toBe(false);
    expect(urgentAvailable({ urgentCap: { maxPerHour: 3, acceptedThisHour: 2 } }).ok).toBe(true);
  });
});

describe("file upload (FR-1.3; 25 MB = assumption A6)", () => {
  const f = (name, type, size = 1000) => ({ name, type, size });
  it("accepts PDF, DOCX, PPT, JPG and PNG", () => {
    expect(validateFile(f("a.pdf", "application/pdf")).ok).toBe(true);
    expect(
      validateFile(
        f("a.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      ).ok,
    ).toBe(true);
    expect(validateFile(f("a.ppt", "application/vnd.ms-powerpoint")).ok).toBe(true);
    expect(validateFile(f("a.jpg", "image/jpeg")).ok).toBe(true);
    expect(validateFile(f("a.png", "image/png")).ok).toBe(true);
  });
  it("rejects other formats, empty files and files over 25 MB", () => {
    expect(validateFile(f("a.exe", "application/x-msdownload")).ok).toBe(false);
    expect(validateFile(f("a.pdf", "application/pdf", 0)).ok).toBe(false);
    expect(validateFile(f("a.pdf", "application/pdf", 25 * 1024 * 1024 + 1)).ok).toBe(false);
  });
});

describe("account forms (FR-1.1)", () => {
  it("requires password of 8+ chars, matching confirm and terms", () => {
    const e = validateRegister({
      name: "Priya",
      phone: "9876543210",
      email: "p@x.in",
      password: "short",
      confirm: "x",
      agree: false,
    });
    expect(Object.keys(e).sort()).toEqual(["agree", "confirm", "password"]);
  });
  it("accepts any non-empty temporary login identifier", () => {
    expect(validateLogin({ identifier: "9876543210", password: "x" })).toEqual({});
    expect(validateLogin({ identifier: "a@b.in", password: "x" })).toEqual({});
    expect(validateLogin({ identifier: "12345", password: "x" })).toEqual({});
  });
});
