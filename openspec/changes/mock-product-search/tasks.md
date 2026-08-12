## 1. Mock Data Module

- [x] 1.1 Create `src/lib/mock-products.ts` exporting `MOCK_PRODUCTS: Product[]` — 6-8 sample products reusing the existing `Product` type, including at least one `isActive: false` product and at least two with overlapping name/SKU substrings
- [x] 1.2 Add `searchMockProducts(query: string): Product[]` in the same module, matching by case-insensitive substring on `name` or `sku` and excluding `isActive: false`, mirroring the backend's `search` filter

## 2. Wire Up the Toggle

- [x] 2.1 In `src/app/search/page.tsx`, read `process.env.NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` and branch `getProducts`: `"api"` keeps the existing `apiFetch` call unchanged; any other value (including unset) calls `searchMockProducts`
- [x] 2.2 Add `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` to `.env.local.example` with a comment explaining the two values (`mock` default, `api` to use the live backend) and that this only affects `/search`

## 3. Verification

- [x] 3.1 Manually test with the env var unset (or `mock`): searching a term matching a mock product's name and one matching a mock SKU both return results, using the same page heading/grid as before
- [x] 3.2 Manually test: searching a term that only matches the mock inactive product returns "no products found"
- [x] 3.3 Manually test: searching a term matching nothing in the mock dataset returns "no products found"
- [x] 3.4 Manually test: set `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE=api`, restart the dev server, and confirm search results come from the live backend again (as verified in `add-product-search`) — skipped a live restart to avoid interrupting the already-running dev server (not started by this session; Next.js allows only one dev instance per project). The `api` branch is the exact, unmodified `apiFetch` call from `add-product-search`, which was already live-verified against the real backend in that session; verified here by code review only, per user's choice.
- [x] 3.5 Run `npm run lint` and fix any issues introduced by the new module/branch (clean — the 5 remaining lint errors are pre-existing, in unrelated files, unchanged by this work)
