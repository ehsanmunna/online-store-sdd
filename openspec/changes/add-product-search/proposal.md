## Why

The header's search input (`src/components/Header.tsx`) is currently decorative only — it has no state, no submit handler, and does nothing when a shopper types and presses enter. Meanwhile the backend (`/products` endpoint) already accepts a `search` query parameter and filters by product name/SKU, so the missing piece is entirely on the frontend. Shoppers cannot find products except by scrolling the home page grid, which hurts discovery as the catalog grows.

## What Changes

- Turn the header search input into a controlled form that submits the current query and navigates to a new `/search` results page (`?q=<term>`).
- Add a `/search` route (Server Component, following the existing `HomePage` pattern) that reads the `q` search param, calls `apiFetch<PagedResult<Product>>('/products?search=...&isActive=true')`, and renders matching products with the existing `ProductCard` component.
- Handle the empty-query state (no redirect/no-op) and the zero-results state (friendly "no products found" message, consistent with the home page's empty-state copy).
- Preserve the typed query in the input/URL so the search box reflects the active search when viewing `/search` results (e.g., after a page refresh or back navigation).

## Capabilities

### New Capabilities
- `product-search`: Lets a shopper submit a text query from the header and view a results page listing products whose name or SKU match the query, reusing the backend's existing search filter.

### Modified Capabilities
(none — no existing capability specs exist yet in this project)

## Impact

- **Affected code**: `src/components/Header.tsx` (make search input a client-side controlled form), new `src/app/search/page.tsx` route.
- **Reused**: `apiFetch` (`src/lib/api.ts`), `Product`/`PagedResult` types (`src/lib/types.ts`), `ProductCard` component, and the backend's existing `search` query param on `GET /products` (`backend/src/products/products.service.ts`) — no backend changes needed.
- **Dependencies**: none new; uses Next.js App Router navigation (`useRouter`/`Link`) and `searchParams`, already used elsewhere in the app.
