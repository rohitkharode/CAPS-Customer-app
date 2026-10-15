# CAPS Customer Web App — Frontend-Only Plan

## Must-read: platform constraint (needs your approval)

This project runs on a fixed platform template: **React 19 + TanStack Router/Start + Vite**, with a few config files in TypeScript. That template can't be swapped for plain React or Vite.

To follow your rules as closely as the platform allows:

- All CAPS app code (pages, components, services, mock data, pricing, validation) will be **JavaScript/JSX** (`.jsx`/`.js`) with **standard CSS** (one global design-system file plus CSS Modules). I won't write any new TypeScript.
- Existing template files (`router.tsx`, `__root.tsx`, `start.ts`, `server.ts`, vite/ts config) stay as they are, with only the edits needed to mount the app (title/meta, nav shell). `__root.tsx` is the one exception that has to stay `.tsx`.
- Routing uses the built-in TanStack Router (the React routing library already in the template). No Next.js/Vue/etc. **No server functions, API routes, backend, or database** will be added. The template's own server-side rendering stays, but no CAPS logic will run on the server.
- No new dependencies are planned.

If you won't accept this, the only alternative is a separate plain-React project created outside the existing template.

## SRS conflicts and gaps (flagged, not silently resolved)

1. **GST rate**: the SRS says "per-page, GST, total" but doesn't give a rate. The mockups show both 5% and 18%. I'll set it in one config place, default **18%**, and label it as a demo value.
2. **Urgent surcharge**: FR-4.1c says it's set per shop (flat or %). Mock shops will cover both types, e.g. +₹20 flat and +25%.
3. **Pay-at-counter**: offered only for shops where it's turned on (FR-1.7, FR-4.2). Some mock shops will have it turned off.
4. **Wallet**: it's in the SRS (FR-1.7) but not in the mockup. I'll add it.
5. **Retention wording**: the mockups say "deleted immediately after pickup" and "end-to-end encrypted", which goes beyond the SRS. I'll use the SRS wording instead: encrypted storage, deleted automatically within a set window (for example 30 min after printing, 24 h at most), whatever the print outcome. I'll also add a note that this is a policy description, not something the demo enforces.
6. **"Bank-grade encryption"** (on the login mockup) isn't in the SRS, so I'll replace it with the SRS statement about encrypted connections.
7. **Order received / pending_payment** statuses come from the SRS data model, so I'll include them. "Downloading" and "Ready for pickup" will appear as steps on the tracking timeline.
8. **FR-1.4 automatic conversion**: this happens on the server, so the screen will only show a "will be converted to PDF" note for DOCX/PPT files.
9. **Page count**: reading a document's pages needs the server or a library. Demo page counts will be estimated and labelled "estimated (demo)".
10. **Cancelling a job**: the SRS doesn't define this. I'll allow it only while a job is queued or awaiting payment, and flag that rule as an assumption.
11. **Printer selection**: `settings.printer` exists in the data model, but no customer requirement mentions it. I'll leave it out of the customer screens and flag it.
12. The mockups' US addresses, $ prices, 2023 dates and "Alex Morgan" won't be used. Mock data will be Indian (₹, Kolhapur and nearby shops).

## Screens (pages)

```text
/login  /register  /forgot-password
/            Home: location (simulated), greeting, search, filters (Open now, Closest, Fastest, Highest rated), shop cards
/shops/$id   Shop details: rating, distance, open status, queue, services & prices, directions (opens external maps link), Start printing
/upload      PDF/DOCX/PPT/JPG/PNG, drag & drop, 25MB limit, progress bar, remove/replace, retention note
/configure   Paper A4/A3/Legal, colour, sides, orientation, copies 1–100, all/custom page range, binding none/spiral/staple/lamination, live itemized price
/review      Shop, document, settings, Flexible vs Urgent (surcharge, revised total, simulated position/ETA), price breakdown, payment method
/payment     Demo payment: processing, success, failure, retry. Clearly marked DEMO, no card details stored
/track/$id   Queue token, tier, position, jobs ahead, ETA, progress, timeline, last updated, cancel, failed/cancelled states
/orders      Search, status filters, recent/older groups
/orders/$id  Details, payment summary, demo receipt (print/download/share through the browser)
/notifications  Read/unread, mark all read, refund status for failed jobs
/profile  /profile/edit  /settings  /privacy  /terms  /help   Logout confirmation
```

Bottom tab bar on mobile (Home, Orders, Notifications, Profile); it becomes a side or top nav on wider screens. Sign-in is checked by a mock auth guard, with the session kept in the browser.

## Design direction

Taken from the mockups: clean white cards, a deep navy primary colour with one accent, rounded cards, and pill-style toggles for options. Status colours: queued, printing, completed, failed, cancelled, ready. Built mobile-first and checked at 320, 360, 390 and 430 px, tablet and desktop.

## Deliverables beyond code

- `docs/traceability.md`: every FR/NFR, which screen covers it, what the frontend does, whether it's mock or needs the backend later, status, and how it was verified.
- `docs/backend-integration.md`: each mock service and what will replace it later (sign-in, storage, realtime, payments, push notifications, maps).

## Testing

- Unit tests (vitest) for each rule: price calculation (per page × sides × copies, binding, urgent flat/%, GST), copy limits 1 and 100, page-range validation, file type and size checks, form validation, and the queue tier rule (Urgent goes after earlier Urgent jobs but ahead of all Flexible ones, used only for simulated positions).
- Browser walkthrough at 390px and 320px: Home → Shop → Upload → Configure → Review → Payment (fail, retry, success) → Track → Job details → Orders, plus sign-in, notifications and profile, with a check for console errors. I'll report the actual results.

## Technical details

```text
src/caps/
  styles/      tokens.css (imported by styles.css), *.module.css
  components/  Button, Card, Badge, Segmented, Stepper, Field, PasswordField, Dialog, Spinner, EmptyState, BottomNav, AppShell, PriceBreakdown, StatusTimeline, ShopCard, OrderCard, DemoBanner
  context/     AuthContext, OrderDraftContext (sessionStorage so a refresh keeps the order), NotificationsContext
  services/    authService, shopService, uploadService, pricingService, orderService, paymentService, queueService (subscribe/unsubscribe event emitter, Realtime-shaped), notificationService, profileService — each with a mock implementation behind one exported interface
  mock/        shops, orders, notifications, user
  lib/         validation.js, pricing.js (pure), queue.js (pure tier ordering), format.js (₹ via Intl en-IN)
src/routes/*.jsx   thin route files that render the caps pages, each with its own head() meta
```

Data shapes follow SRS §7 (print_jobs.settings, priority_tier, status enum, payments.method/status). Price recalculation is a pure function that runs on every render, well under the SRS's 300 ms target.

## Final requirement-to-screen mapping (reviewed against the SRS text)

| SRS ID              | Requirement (SRS wording, shortened)                                                                                      | Screen(s)                                               | How it's handled in this phase                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| FR-1.1              | Register/log in, manage a basic profile                                                                                   | Login, Register, Forgot password, Profile, Edit profile | Simulated sign-in (demo)                                                                       |
| FR-1.2              | Nearby shops with distance, rating, open/closed status, live wait time                                                    | Home, Shop details                                      | Mock data; location and wait times labelled "simulated"                                        |
| FR-1.3              | Upload PDF, DOCX, PPT, JPG, PNG                                                                                           | Upload                                                  | Real file picking and checks in the browser; upload progress simulated                         |
| FR-1.4 (S)          | Convert office files to PDF automatically                                                                                 | Upload (notice only)                                    | Needs the backend; shown as a note, not performed                                              |
| FR-1.5              | Paper A4/A3/Legal, colour, sides, orientation, copies 1–100, page range all/custom, binding none/spiral/staple/lamination | Configure                                               | Fully built in the browser                                                                     |
| FR-1.6              | Itemized price (per-page, GST, total), updates instantly                                                                  | Configure, Review                                       | Demo pricing from each shop's mock price table                                                 |
| FR-1.6a             | Choose Urgent or Flexible for every job, before payment                                                                   | Review                                                  | Built; can't continue until one is chosen                                                      |
| FR-1.6b             | Show urgent surcharge, revised total, estimated position/ETA before confirming                                            | Review                                                  | Built; position and ETA labelled simulated                                                     |
| FR-1.7              | UPI, card, wallet; pay-at-counter where the shop enables it                                                               | Review, Payment                                         | Demo payment; pay-at-counter only for shops that enable it                                     |
| FR-1.8              | Queue token, live position, ETA, reflecting tier                                                                          | Track, Job details                                      | Simulated updates through a stand-in for live updates                                          |
| FR-1.9              | Push notifications: started, complete, ready for pickup                                                                   | Notifications                                           | In-app demo notifications only; no real push notifications                                     |
| FR-1.10 (S)         | Job history and receipts                                                                                                  | Orders, Order details                                   | Mock orders; receipts marked "Demo, not a financial record"                                    |
| FR-4.1/4.1a         | Two tiers: FIFO inside each tier, Urgent ahead of all Flexible, behind the job printing now and earlier Urgent jobs       | Review (simulated position), Track                      | Pure ordering function used only for estimates, with unit tests                                |
| FR-4.1b             | Tell customers in real time when an Urgent job is placed ahead of them                                                    | Track, Notifications                                    | Simulated event: "an urgent job was added ahead of you"                                        |
| FR-4.1c (S)         | Urgent surcharge set per shop, flat or percentage                                                                         | Review, Configure                                       | Per-shop mock settings cover both types                                                        |
| FR-4.1d (S)         | Shop caps on Urgent jobs                                                                                                  | Review                                                  | Shows "Urgent unavailable (limit reached)" when a mock shop is at its limit                    |
| FR-4.2              | Job isn't released until paid, unless pay-at-counter                                                                      | Payment, Track                                          | Status "Pending payment" until the demo payment succeeds; for pay-at-counter the job is queued |
| FR-4.3              | Encrypted storage, auto-delete within a window                                                                            | Upload, Privacy                                         | Policy text only, labelled as not enforced in the demo                                         |
| FR-4.4              | Status changes reach the customer in real time                                                                            | Track, Orders                                           | Simulated                                                                                      |
| §7.4 status enum    | pending_payment, queued, printing, completed, failed, cancelled                                                           | Track, Orders, filters                                  | All shown; "ready for pickup" appears as a step after completed                                |
| §7.5 payment status | initiated, success, failed, refunded                                                                                      | Payment, Notifications                                  | Shown, including refunded for failed jobs                                                      |
| NFR 8.1             | Price updates within 300 ms                                                                                               | Configure                                               | Calculated instantly in the browser; checked in tests                                          |
| NFR 8.5             | Upload → configure → pay in under 2 minutes                                                                               | Whole flow                                              | A design target, timed once in the walkthrough; not claimed as proven                          |
| NFR 8.2             | Encrypted connections, access control                                                                                     | Privacy                                                 | Described as how the real system will work, not claimed for the demo                           |

Not applicable to the customer app (FR-2.x, FR-3.x, FR-4.5, FR-4.6, Print Agent NFRs): these will be listed in the traceability doc as out of scope.

## Unresolved assumptions (labelled ASSUMPTION in the app and docs)

- A1 GST rate: the SRS doesn't give one. It's set in one config place, demo value 18%.
- A2 Pricing formula: the SRS only says "per-page / per-setting price table" for each shop. Demo formula: pages in range × copies × per-page rate (by paper size and colour), plus binding per copy, plus urgent surcharge (flat, or % of the printing subtotal), then GST on that subtotal. Double-sided printing is charged per printed side, which is the same as single-sided per page. All rates are in the mock shop table.
- A3 Custom page range: format like "1-3,5", every page between 1 and the page count, no reversed ranges (like 5-3), duplicates merged. The SRS just says "all/custom".
- A4 Demo page count: estimated by file type and size and labelled. The user can edit it.
- A5 Cancelling: allowed only while a job is pending payment or queued.
- A6 Max file size 25 MB: comes from the mockup, not the SRS.
- A7 GST is applied on top of the urgent surcharge.
- A8 Printer selection is left out of the customer flow; no customer requirement mentions it.
- A9 Wait time on the Home screen comes from mock queue length × the shop's average minutes per job.

## Confirmed scope and conditions (from your approval)

- Frontend only, using JS/JSX and standard CSS inside the existing template. No backend, database, server functions, Cloud, real sign-in, real payments, or Print Agent.
- Every simulated item is labelled as such: location, page counts, uploads, sign-in, payments, queue positions, notifications, receipts.
- GST, shop prices and the urgent surcharge live in config files and are marked ASSUMPTION (A1–A9 above).
- Queue rule: the job printing now is never displaced. Urgent jobs go after earlier Urgent jobs and ahead of all Flexible jobs. Order within each tier stays first-come, first-served.
- The shop's urgent limit is checked before Urgent can be selected.
- A failed payment keeps the job at pending_payment, so it's never released. Pay-at-counter is shown only for shops that allow it.
- The two docs files separate requirements into: built in the browser / simulated / needs the backend / out of scope / not built.
- Test results will be reported exactly as they come out, including any test that couldn't run.
