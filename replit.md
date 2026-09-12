# FP-RA

Fire-protection deviation risk assessment app.

## Current setup

- Run with `npm start`. This starts the root Express server in `server.js`.
- The consultant endpoint is `POST /api/consultant`, handled by `api/consultant.js`.
- `ANTHROPIC_API_KEY` is read from Replit's Secrets tool. There is no database.
- The browser does not ask for, store, or branch on a manually entered Anthropic API key.

## Session changes

### Server-based Anthropic setup

The app was changed from a browser-entered, session-only Anthropic API key to a server-based setup. The Express server reads `ANTHROPIC_API_KEY` from Replit Secrets, so visitors never enter an API key in the browser.

### Safer public files

The app page now lives at `public/index.html`. The server's static-file serving is limited to the `public/` folder. This deliberately prevents visitors from downloading source and project files such as `server.js`, `package.json`, and `api/consultant.js`; direct GET requests to those paths were verified to return 404.

### Removed unused template files

The following unused Replit template scaffolding was removed because it was unrelated to the running app:

- `artifacts/api-server/`
- `artifacts/mockup-sandbox/`
- `artifacts/fp-ra/` (an abandoned React/Vite rebuild, including the old API-key interface)
- `lib/api-client-react/`
- `lib/api-spec/`
- `lib/api-zod/`
- `lib/db/`
- `scripts/`

None of these folders was used by the running FP-RA app.

### Run and Preview behavior

The active `.replit` run configuration uses the `Start application` workflow, which runs `npm start` and therefore `node server.js` directly from the repository root. The old artifact workflow is no longer used.

On Replit's free tier, the development workspace goes to sleep after inactivity. Click Run again to wake it. Once the workflow is running, the port may also need to be explicitly exposed to the web using the globe icon in the workflow console, especially the first time or after configuration changes. This is expected Replit platform behavior, not an FP-RA application bug.

### Branches and publishing

This work is on the `replit-server` branch and has been pushed to `https://github.com/Tallalb/FP-RA`. The `main` branch and the public GitHub Pages site it serves were intentionally left unchanged. They remain the older, separate version that uses manual browser API-key entry.

No deployment has been created. This is a working development copy ready for a future explicit Deploy/Publish step. When it is deployed, `ANTHROPIC_API_KEY` must be added separately as a deployment secret.
