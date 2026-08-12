## Why

The `add-product-search` change (implemented, not yet archived) made the header search and `/search` results page call the live backend directly (`GET /products?search=...`). The backend team is about to review/harden that endpoint (max length validation, possible ranking/SKU-matching changes — see the handoff prompt from that work), and the user wants the frontend feature to keep working on its own, without depending on the backend being up-to-date or even running, until they explicitly wire the two back together.

## What Changes

- Add a small local mock product dataset the search feature can search against instead of the live API.
- Make the `/search` page's data lookup use the mock dataset by default (frontend-only mode), controlled by a single documented env var so switching back to the real backend later is a one-line change, not a code change.
- Keep all existing search behavior (query matching on name/SKU, active-only results, empty/no-results states, query persistence in the header input) working identically against the mock dataset — this only changes the data source, not the `product-search` capability's observable behavior.
- Document the mock dataset's shape and the toggle so integrating the real backend later is a clear, single step for whoever picks it up.

## Capabilities

### New Capabilities
- `product-search`: `add-product-search` introduced this capability but hasn't been archived into `openspec/specs/` yet, so no main spec exists on disk for it. This change extends that same in-flight capability with a mock-data-backed mode; once `add-product-search` is archived, this delta's requirement folds into the same `product-search` main spec.

### Modified Capabilities
(none — see New Capabilities note above; this is additive to the not-yet-archived `product-search` capability, not a change to an existing main spec)

## Impact

- **Affected code**: `src/app/search/page.tsx` (data source selection), new mock dataset module (e.g. `src/lib/mock-products.ts`), `.env.local.example` (document the new toggle).
- **Not affected**: `src/components/Header.tsx` (already backend-agnostic — it only navigates, never fetches), the home page and product detail page (out of scope; they keep calling the real backend as before).
- **Reversible later**: flipping the documented env var (or removing it, depending on the default chosen in design.md) restores the real `apiFetch` call added in `add-product-search`, with no other code changes needed.
