# CAPS Customer Frontend

CAPS is a React 19 customer-facing print-order frontend built with TanStack Start, TanStack Router, Vite, and plain CSS.

## Scope

This repository contains the customer experience only. Authentication, shop data, document storage and conversion, authoritative pricing, payment, queue status, notifications, and Print Agent behavior require backend services and are intentionally not implemented here.

The current frontend keeps local validation, print-setting state, price estimates, and navigation usable. Integration-dependent screens report unavailable or pending states without fabricating successful uploads, payments, orders, queue changes, or receipts.

## Development

Prerequisites: Node.js 20+ and npm. The repository includes `package-lock.json`; use npm for the reproducible setup. The existing `bun.lock` is retained as repository history but is not the primary setup lockfile.

```sh
npm ci
npm run dev
```

The development server uses Vite. Open the URL printed by the command, normally `http://localhost:5173`.

## Environment configuration

Copy `.env.example` to `.env` only when you need to point the frontend at a backend:

```sh
Copy-Item .env.example .env
```

`VITE_CAPS_API_BASE_URL` is optional. When unset, the frontend keeps local validation, preferences, settings, estimates, and navigation available while integration-dependent operations report that the backend is unavailable. Do not place credentials, tokens, or passwords in `.env`.

Useful checks:

```sh
npm test -- --run
npm run lint
npm run build
```

`npm run lint` currently completes with six existing Fast Refresh warnings in template UI files and no errors. `npm test -- --run` runs the non-watch test suite.

## Project rules

- CAPS application code lives in `src/caps/` as JavaScript/JSX with plain CSS in `src/caps/styles/caps.css`.
- Route files in `src/routes/` are thin wrappers around reusable CAPS pages.
- Pages call services in `src/caps/services/`; backend replacements should preserve those boundaries.
- Pricing and queue estimates are pure functions in `src/caps/lib/` and remain labelled as frontend assumptions.
- No backend, server functions, new dependencies, or payment/auth providers are included in this phase.

## Team handover

1. Clone or download this repository.
2. Install Node.js 20 or later and npm.
3. Run `npm ci` from the repository root.
4. Copy `.env.example` to `.env` only if a backend URL is available.
5. Run `npm run dev` and open the local URL printed by Vite.
6. Read [`docs/backend-integration.md`](docs/backend-integration.md) before backend wiring and agree on the API, authentication, payment, storage, queue, realtime, and notification contracts.
7. Run `npm test -- --run`, `npm run lint`, and `npm run build` before sharing changes.

CAPS application code is under `src/caps/`; route wrappers are under `src/routes/`; backend replacement boundaries are under `src/caps/services/`; pure pricing and queue rules are under `src/caps/lib/`.

The frontend is intentionally backend-free. Temporary sign-in is not real authentication, and payment, order creation, document upload, queue updates, notifications, and production receipts remain unavailable until backend services are connected.
