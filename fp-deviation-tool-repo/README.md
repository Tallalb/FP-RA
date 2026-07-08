# Fire Protection Deviation Risk Assessment

Prototype tool that takes a fire protection code deviation (passive, active,
fire alarm, or life safety), scores current risk against a fixed
likelihood x consequence rubric, sends it to a jurisdiction-scoped
"consultant agent" for mitigation options, and builds a risk register.

## Status
Early prototype. Risk scoring rubric and jurisdiction context maps are
first drafts and need to be checked against current code editions.



      in parallel with retry/backoff
- [ ] Export risk register to Excel / Word
- [ ] Persist register across sessions (needs backend + DB, or
      artifact storage API if staying in claude.ai)
