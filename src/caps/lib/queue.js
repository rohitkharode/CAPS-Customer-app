// Pure two-tier queue ordering (SRS FR-4.1, FR-4.1a, UC-3).
// Used only to compute frontend queue estimates. The
// authoritative queue lives on the backend in the real system.
//
// Rules: the job currently printing is never displaced; queued Urgent jobs
// precede all queued Flexible jobs; FIFO (createdAt) within each tier.

const byTime = (a, b) => a.createdAt - b.createdAt;

export function orderQueue(jobs) {
  const printing = jobs.filter((j) => j.status === "printing");
  const queued = jobs.filter((j) => j.status === "queued");
  return [
    ...printing,
    ...queued.filter((j) => j.tier === "urgent").sort(byTime),
    ...queued.filter((j) => j.tier === "flexible").sort(byTime),
  ];
}

/** Where a NEW job of `tier` would be inserted. */
export function estimateInsertion(jobs, tier, avgMinPerJob) {
  const ordered = orderQueue(jobs);
  const ahead =
    tier === "urgent"
      ? ordered.filter((j) => j.status === "printing" || j.tier === "urgent").length
      : ordered.length;
  return { position: ahead + 1, jobsAhead: ahead, etaMin: (ahead + 1) * avgMinPerJob };
}

/** 1-based position of job id in the ordered queue, or null. */
export function positionOf(jobs, id) {
  const i = orderQueue(jobs).findIndex((j) => j.id === id);
  return i === -1 ? null : i + 1;
}

/** ASSUMPTION A9: wait = active jobs × average minutes per job. */
export function waitMinutes(jobs, avgMinPerJob) {
  return orderQueue(jobs).length * avgMinPerJob;
}

/** SRS FR-4.1d: shop-level cap on Urgent jobs. */
export function urgentAvailable(shop) {
  const cap = shop.urgentCap;
  if (!cap) return { ok: true };
  if (cap.acceptedThisHour >= cap.maxPerHour)
    return {
      ok: false,
      reason: `This shop has reached its limit of ${cap.maxPerHour} urgent jobs this hour.`,
    };
  return { ok: true, remaining: cap.maxPerHour - cap.acceptedThisHour };
}
