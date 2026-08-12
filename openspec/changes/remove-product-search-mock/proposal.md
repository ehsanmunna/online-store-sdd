## Why

`mock-product-search` (implemented, not yet archived) added a mock-data mode to the `/search` page so it could work without the live backend, defaulting to `mock`. The user is now ready to integrate with the real backend and wants that decoupling removed: search should always go through the live `GET /products?search=...` endpoint, with no mock data path or toggle left behind.

## What Changes

- **BREAKING** (for anyone relying on it): remove the `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` env var and its mock/api branching in `/search`'s data lookup — the page always calls the live backend now.
- Delete the mock dataset module and its search helper (`src/lib/mock-products.ts`), since nothing will reference it anymore.
- Remove the env var's entry and comment from `.env.local.example`.
- No change to the underlying search behavior itself (matching on name/SKU, active-only filtering, empty/no-results states, query persistence) — this only removes the mock data source option that `mock-product-search` added; the live-backend behavior already shipped in `add-product-search` is unaffected.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `product-search`: removes the "Search Works Without a Live Backend" requirement that `mock-product-search` added. Note: neither `add-product-search` nor `mock-product-search` has been archived yet, so `openspec/specs/product-search/` doesn't exist as a main spec on disk — this delta retracts a requirement that currently exists only in `mock-product-search`'s own pending spec delta, not in an archived main spec.

## Impact

- **Affected code**: `src/app/search/page.tsx` (drop the branch, restore the single `apiFetch`-only `getProducts`), delete `src/lib/mock-products.ts`, `.env.local.example` (remove the var).
- **Not affected**: `src/components/Header.tsx` (never touched mock data), the backend itself (no changes there either way).
- **Depends on**: this only makes sense once the backend's search endpoint (`GET /products?search=...`) is confirmed ready — per the earlier backend hand-off, that review may still be in progress. If it hasn't landed yet, removing the mock now means `/search` goes back to depending on whatever the live backend currently does.
