## CAPS project rules

- All CAPS app code lives in `src/caps/` as JavaScript/JSX with plain CSS (`src/caps/styles/caps.css`); only existing template files stay TypeScript.
- Route files in `src/routes/*.jsx` are thin wrappers that render pages from `src/caps/pages/`.
- Pages talk only to `src/caps/services/*`; backend implementations should replace those service boundaries without moving transport logic into pages.
- Pricing and queue ordering are pure functions in `src/caps/lib/` with tests in `rules.test.js`; frontend assumptions live in `lib/config.js` and must stay labelled as assumptions.
- No backend, server functions, or cloud integration is included in this phase; see `docs/backend-integration.md`.
- Upload collections retain individual file metadata inside the existing document shape, with summed size and page count.
