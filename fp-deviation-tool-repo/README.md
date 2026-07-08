# Fire Protection Deviation Risk Assessment

Prototype tool that takes a fire protection code deviation (passive, active,
fire alarm, or life safety), scores current risk against a fixed
likelihood x consequence rubric, sends it to a jurisdiction-scoped
"consultant agent" for mitigation options, and builds a risk register.

## Status
Early prototype. Risk scoring rubric and jurisdiction context maps are
first drafts and need to be checked against current code editions.

## Running it

The Anthropic API key is entered manually in the browser each session --
there's a field at the top of the page. It's held in a JavaScript variable
in memory only: never written to disk, never in any file, never committed
to this repo. Closing or reloading the tab clears it and you re-enter it
next time.

This means the app can be served as plain static files -- no `config.js`,
no build step, no secret to protect in the repo itself.

Serve it locally:
```
python3 -m http.server 8000
```
then open `http://localhost:8000`, paste your key from console.anthropic.com
into the field, click "Set key", and use the app.

You don't strictly need a local server for this version (a manually-entered
key works even opened via `file://`), but `http.server` avoids occasional
browser quirks with `fetch()` on the file protocol, so it's still the more
reliable option.

## Deploying (GitHub Pages, Vercel, anywhere static)
Because the key is never embedded in any file, this can now be deployed as
a plain static site -- GitHub Pages included -- with no backend required.
Anyone who opens the deployed page enters their own key in the field to use
it; nothing you deploy contains a secret.

`api/consultant.js` (a Vercel serverless proxy) is still in the repo as an
optional path: if no key is entered in the browser, the app falls back to
calling `/api/consultant`, which only works if you deploy on Vercel with
`ANTHROPIC_API_KEY` set as an environment variable there. Skip this
entirely if you're fine with everyone (including you) entering their own
key each session -- in that case Pages/any static host is enough and
`api/consultant.js` just sits unused.

Note on `anthropic-dangerous-direct-browser-access`: this header is required
for any browser-origin call to Anthropic, and its name is a deliberate
warning -- whoever's key is in the field is visible to that same person's
browser dev tools/network tab. That's expected and fine here, since each
person only ever sees their own key, never someone else's.

## Architecture
- Single-file HTML/CSS/vanilla JS, no build step.
- `jurisdictionContext` map: per-jurisdiction code framework description
  injected into the consultant agent's system prompt. Currently covers
  UAE (Dubai / Abu Dhabi), Saudi Arabia, Qatar, and an NFPA-only baseline.
  These are drafted from general knowledge -- verify against your own
  current copies of DCD Code of Practice / SBC 801 & 1201 / QCDAA & QCS.
- `riskBand()`: fixed likelihood x consequence rubric (1-25 score,
  banded Low/Medium/High/Critical). Deliberately not left to the LLM's
  judgment, so current-risk scores stay consistent and auditable.
- `callConsultant()`: builds the jurisdiction-scoped system prompt,
  calls the model, expects strict JSON back (deviation summary, code
  gap analysis, 2 mitigation options tagged code_required_fix or
  performance_based_alternative, residual risk, AHJ verification note).
  Includes an auto-retry + JSON repair path for truncated responses.
- Risk register accumulates submissions in-memory (resets on reload --
  no persistence yet).

## Roadmap
- [ ] Verify and expand jurisdiction code framework map
- [ ] Batch input: paste a list of deviations from a report, process
      in parallel with retry/backoff
- [ ] Export risk register to Excel / Word
- [ ] Persist register across sessions (needs backend + DB, or
      artifact storage API if staying in claude.ai)
