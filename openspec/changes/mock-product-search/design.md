## Context

See proposal.md - Why. Relevant current state:

- `src/app/search/page.tsx` (from `add-product-search`) has a single `getProducts(query)` function that calls `apiFetch<PagedResult<Product>>('/products?search=...&isActive=true')` and catches errors by returning `[]`.
- `Header.tsx`'s search form only navigates to `/search?q=...`; it never calls the API, so nothing there needs to change.
- The backend endpoint currently works, but is about to be reviewed/hardened (validation, possible ranking/SKU-matching changes) in a separate, uncoordinated effort — the user wants the frontend search feature to not depend on that work landing, or on the backend running at all, until they explicitly reconnect them.
- No other product listing (home page, product detail) is in scope — they keep using the live backend unchanged.

## Goals / Non-Goals

**Goals:**
- Search returns real, varied results (multiple products, an inactive one, a no-match case) without any backend running.
- The switch back to the live backend is a single, obvious, documented change — not a code rewrite.
- No change to any already-shipped observable behavior of the search page or header form (headings, empty states, query persistence all stay identical).

**Non-Goals:**
- No mocking for the home page or product detail page — out of scope per proposal.
- No automatic "try real API, fall back to mock on failure" behavior. The user explicitly wants frontend-only operation right now, not a best-effort hybrid that could silently mask a real backend outage later. The mode is an explicit, visible setting, not an implicit fallback.
- No change to the backend itself.

## Decisions

- **Explicit env var toggle, not automatic fallback-on-error.** Add `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` read in `getProducts`, with two values: `"mock"` (default when unset) and `"api"`. Alternative considered: silently falling back to mock data only when the real `apiFetch` call throws — rejected because it would also swallow real integration bugs once the backend work lands (a genuine 500 or validation error would quietly present as "mock data," making backend integration harder to verify later, not easier). An explicit switch makes today's frontend-only mode visible and makes tomorrow's integration a one-line, deliberate change.
- **Default to `"mock"`.** Matches the user's stated intent ("front-end only... I will integrate with backend later") without requiring anyone to set an env var just to get the current behavior. `.env.local.example` documents both values and how to switch to `"api"` when ready.
- **New module `src/lib/mock-products.ts`** exporting a small `MOCK_PRODUCTS: Product[]` array (reusing the existing `Product` type, no new types) and a `searchMockProducts(query: string): Product[]` helper that mirrors the backend's matching rule (substring match on `name` or `sku`, case-insensitive) and excludes `isActive: false` items, so mock behavior matches the spec from `add-product-search` exactly. Alternative considered: fetching a static JSON file at build/runtime — rejected as unnecessary indirection for ~6-8 hardcoded sample products.
- **Mock dataset content**: enough variety to exercise existing scenarios locally — at least one `isActive: false` product (to verify exclusion), at least two products whose names/SKUs share a common substring (to verify multi-result search), and normal price/compareAtPrice/imageUrl fields so `ProductCard` renders exactly as it does with real data.
- **`getProducts` becomes**: check the env var; if `"api"`, keep today's `apiFetch` call (unchanged, including its try/catch-to-`[]`); otherwise call `searchMockProducts`. No change to the calling code in the page component beyond this branch.

## Risks / Trade-offs

- [Mock dataset drifts from real backend data shape over time] → It reuses the exact `Product` interface from `src/lib/types.ts`, so any shape change to `Product` will surface as a type error in the mock file too, not silently.
- [Someone forgets to flip the toggle back to `"api"` before a real release] → The env var is documented in `.env.local.example` with an explicit comment, and defaulting to `"mock"` is a deliberate, visible choice the user asked for now; switching it is called out as a follow-up in the proposal's Impact section for whoever integrates the backend later.
- [Mock matching rule and backend matching rule drift apart] → Both are simple substring/case-insensitive matches today; if the backend hardening work (from the earlier review) changes matching semantics (e.g. prefix-only SKU matching), `searchMockProducts` should be updated to match at that time — noted as a follow-up, not solved here since it depends on decisions not yet made on the backend side.
