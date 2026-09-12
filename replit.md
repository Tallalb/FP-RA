# FP-RA

Fire-protection deviation risk assessment app.

## Current setup

- Run with `npm start`; the root `server.js` starts the Express server.
- The consultant endpoint is `POST /api/consultant`, handled by `api/consultant.js`.
- `ANTHROPIC_API_KEY` is read from Replit Secrets. There is no database.
- The browser does not collect or branch on a manual Anthropic API key.
- The old `artifacts/`, `lib/`, and `scripts/` scaffolding has been removed.
