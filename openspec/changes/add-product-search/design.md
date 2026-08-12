## Context

See proposal.md - Why. Relevant current state:

- `Header` (`src/components/Header.tsx`) is a `'use client'` component that already reads `CartContext`/`WishlistContext`; the search `<input>` inside it has no handlers.
- `HomePage` (`src/app/page.tsx`) is an async Server Component that calls `apiFetch<PagedResult<Product>>('/products?page=1&pageSize=24&isActive=true')` and renders `ProductCard` items in a grid; this is the pattern to mirror for the results page.
- The backend's `GET /products` already accepts `search` (matches `name`/`sku` via `ILIKE`) and `isActive` query params — confirmed in `backend/src/products/products.service.ts` and `query-products.dto.ts`. No backend changes are needed.
- The app has no client-side routing state today (no `useSearchParams` usage) and no existing `/search` route.

## Goals / Non-Goals

**Goals:**
- Make the header search input actually submit a query and land the shopper on a results page showing matching products.
- Reuse existing data-fetching (`apiFetch`), typing (`Product`, `PagedResult`), and presentation (`ProductCard`) rather than introducing new patterns.
- Keep the results page consistent with `HomePage`'s server-rendered, no-client-state approach.

**Non-Goals:**
- No autocomplete/typeahead suggestions while typing.
- No search-as-you-type or debounced live filtering — search is submit-triggered only.
- No changes to the backend search behavior (ranking, fuzzy matching, pagination beyond what `/products` already returns).
- No search analytics/tracking.

## Decisions

- **Submit via native form + URL navigation, not client-side fetch.** The header search becomes a `<form action="/search" method="get">` (or `useRouter().push` on submit) so the query lives in the URL as `?q=<term>`. This matches the existing Server Component pattern (`HomePage`) and needs no new client state library. Alternative considered: client-side fetch-as-you-type with local state — rejected as unnecessary complexity for the requested "make it functional" scope and inconsistent with the rest of the app's server-rendered listing pages.
- **New route `src/app/search/page.tsx`, a Server Component reading `searchParams.q`.** Mirrors `HomePage`'s `getProducts()` async function, calling `apiFetch<PagedResult<Product>>('/products?search=' + encodeURIComponent(q) + '&isActive=true')`. Keeps data-fetching server-side, so no loading spinners or client fetch error handling are needed.
- **Query param name: `q`.** Short, conventional for search UIs, and distinct from the backend's `search` param name (translated at the fetch call site) so the URL stays terse.
- **Header input becomes a controlled component scoped to its own value only** (no shared search context), initialized from the current `q` param when the shopper is already on `/search` (using `useSearchParams` since `Header` is already a client component). This satisfies the "persist query in the input" requirement without introducing global state.
- **Empty-query submission is a no-op** (validated client-side before navigating), so shoppers don't land on a bare `/search` with no term. Visiting `/search` directly with no `q` still renders a friendly "enter a search term" prompt (handled by the Server Component, since the URL can always be typed manually).
- **Reuse `ProductCard` and the same empty-state visual language as `HomePage`** ("No products found for ...") for consistency rather than designing new UI.

## Risks / Trade-offs

- [Special characters or very long input in the query term] → `encodeURIComponent` on write, and the backend already parameterizes the `ILIKE` clause, so no injection risk; worst case is a zero-result search.
- [Whitespace-only or empty query submitted by directly editing the URL] → Server Component treats a blank/whitespace-only `q` the same as a missing `q` (shows the prompt state, not an empty results grid or API call).
- [Duplicate fetch logic between `HomePage` and the new search page] → Both are small, single-purpose `getProducts`-style functions; acceptable duplication given the existing codebase doesn't have a shared data-fetching hook yet, and introducing one is out of scope for this change.
