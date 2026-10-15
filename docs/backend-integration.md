# CAPS Backend Integration Handover

The customer frontend currently has no connected backend. Pages call service boundaries in `src/caps/services/`; backend work should replace those implementations without moving transport or business authority into pages.

## Runtime configuration

Set `VITE_CAPS_API_BASE_URL` only after the backend contract is agreed. `src/caps/services/apiClient.js` provides JSON and multipart request helpers. When the variable is absent, integration-dependent operations return a typed `CAPS_INTEGRATION_PENDING` error and the UI shows an unavailable state.

## Service boundaries

| Service                  | Current frontend behavior                                                            | Backend replacement                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `authService.js`         | Temporary local session accepts non-empty sign-in input; passwords are never stored. | Managed authentication with secure sessions, registration, OAuth, reset, authorization, and account deletion.         |
| `shopService.js`         | Returns no shops or location when the API is not connected.                          | `GET /shops`, `GET /shops/:id`, geolocation, opening state, pricing configuration, and queue summary.                 |
| `uploadService.js`       | Validates files and prepares local metadata only.                                    | Multipart upload to protected storage, office conversion, authoritative page count, retention and deletion.           |
| `orderService.js`        | Does not create or mutate orders without the backend.                                | Create and retrieve `print_jobs`; server owns price, payment gate, status transitions, token, queue position and ETA. |
| `paymentService.js`      | Does not initiate payments without the backend.                                      | Gateway handoff, webhook verification, retries, refunds, and persisted payment lifecycle.                             |
| `queueService.js`        | No local timer or fabricated status transition.                                      | Realtime subscription for order status, queue position, ETA and urgent insertion events.                              |
| `notificationService.js` | Local preference and in-app adapter only.                                            | Persisted notification history, device registration, push delivery and read state.                                    |
| `profileService.js`      | Local profile/preferences adapter.                                                   | Authenticated user profile and notification preferences.                                                              |

## Proposed endpoint contract

These endpoints are a handover proposal, not claims that a server already exists.

| Capability    | Proposed operation                                                          | Minimum response authority                                                                           |
| ------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Shops         | `GET /shops`, `GET /shops/:id`                                              | Shop identity, coordinates, open state, pricing, queue summary, pay-at-counter flag and urgent cap.  |
| Auth          | Managed provider or `/auth/*` contract                                      | Session, user identity, expiry, reset and OAuth result.                                              |
| Documents     | `POST /documents`, `DELETE /documents/:id`                                  | Document ID, storage reference, normalized format, conversion result and page count.                 |
| Orders        | `POST /orders`, `GET /orders`, `GET /orders/:id`, `POST /orders/:id/cancel` | Authoritative price, payment status, order status, token, position, ETA and valid transition errors. |
| Payments      | `POST /orders/:id/payment`, `GET /orders/:id/payment`                       | Gateway handoff plus webhook-verified `initiated`, `success`, `failed`, or `refunded`.               |
| Realtime      | `print_jobs`/shop queue channel                                             | Ordered status, queue, payment and urgent-insertion events; target propagation under two seconds.    |
| Notifications | `GET /notifications`, `POST /notifications/:id/read`                        | Persisted event history and read state; push delivery handled by the backend.                        |

## Required backend rules

- The currently printing job is never displaced.
- Urgent jobs precede Flexible jobs; FIFO applies within each tier.
- Urgent-cap enforcement must be atomic per shop and hour.
- Online jobs remain `pending_payment` until verified payment success. Pay-at-counter is the only configured exception.
- The server recalculates price from shop configuration. The client estimate is advisory.
- Valid order statuses are `pending_payment`, `queued`, `printing`, `completed`, `failed`, and `cancelled`.
- Valid payment statuses are `initiated`, `success`, `failed`, and `refunded`.
- Storage access must be authorized per customer/shop job, encrypted at rest and in transit, audited, and removed according to the agreed retention policy.

## Decisions required before wiring

Confirm the auth provider, payment gateway, shop and pricing schema, upload conversion service, retention duration, notification channels, refund policy, pay-at-counter confirmation, realtime transport, and exact API error shape. Until those decisions are recorded, the frontend must not fabricate successful integration results.
