// Frontend price estimate. All money is integer paise to avoid float errors.
// SRS FR-1.6: itemized price (per-page, GST, total) updating instantly.
// SRS FR-4.1c: urgent surcharge configured per shop, flat or percentage.
// ASSUMPTION A2: formula below; ASSUMPTION A7: GST applied after surcharge.
import { GST_RATE } from "./config";
import { parsePageRange } from "./validation";

export function selectedPageCount(settings, pageCount) {
  if (settings.pageRange?.mode === "custom") {
    const r = parsePageRange(settings.pageRange.value, pageCount);
    return r.ok ? r.count : 0;
  }
  return pageCount;
}

export function perPageRate(shop, paper, color) {
  const v = shop?.pricing?.perPage?.[paper]?.[color];
  return typeof v === "number" ? v : null;
}

export function urgentSurchargePaise(shop, subtotalPaise) {
  const cfg = shop.urgentSurcharge;
  if (!cfg) return 0;
  return cfg.type === "flat" ? cfg.value : Math.round((subtotalPaise * cfg.value) / 100);
}

export function calculatePrice({
  settings,
  pageCount,
  shop,
  tier = "flexible",
  gstRate = GST_RATE,
}) {
  const pages = selectedPageCount(settings, pageCount);
  const copies = Number(settings.copies) || 0;
  const rate = perPageRate(shop, settings.paper, settings.color) ?? 0;
  const printedPages = pages * copies;
  const printPaise = printedPages * rate;
  const bindingUnit = shop.pricing.binding[settings.binding] ?? 0;
  const bindingPaise = settings.binding === "none" ? 0 : bindingUnit * copies;
  const subtotalPaise = printPaise + bindingPaise;
  const urgentPaise = tier === "urgent" ? urgentSurchargePaise(shop, subtotalPaise) : 0;
  const taxable = subtotalPaise + urgentPaise;
  const gstPaise = Math.round(taxable * gstRate);
  const totalPaise = taxable + gstPaise;
  return {
    pages,
    copies,
    printedPages,
    ratePaise: rate,
    printPaise,
    bindingUnitPaise: settings.binding === "none" ? 0 : bindingUnit,
    bindingPaise,
    subtotalPaise,
    urgentPaise,
    gstRate,
    gstPaise,
    totalPaise,
  };
}

export function describeSurcharge(shop) {
  const c = shop.urgentSurcharge;
  if (!c) return "No surcharge";
  return c.type === "flat"
    ? `+₹${(c.value / 100).toFixed(2)} flat`
    : `+${c.value}% of print & binding`;
}
