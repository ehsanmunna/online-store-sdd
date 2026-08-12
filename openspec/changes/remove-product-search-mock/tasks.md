## 1. Revert Search Data Source

- [x] 1.1 In `src/app/search/page.tsx`, remove the `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` branch and the `searchMockProducts` import; `getProducts` should go back to only calling `apiFetch<PagedResult<Product>>('/products?search=...&isActive=true')` with its existing try/catch-to-`[]`
- [x] 1.2 Delete `src/lib/mock-products.ts`
- [x] 1.3 Remove the `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` line and its comment from `.env.local.example`

## 2. Verification

- [x] 2.1 Confirm no remaining references to `mock-products` or `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` anywhere in `src/`
- [x] 2.2 Manually test: searching a term that matches a real product in the live backend still returns results on `/search`, exactly as verified in `add-product-search`
- [x] 2.3 Manually test: the no-query prompt and no-results states on `/search` still render correctly
- [x] 2.4 Run `npm run lint` and confirm no new issues from the removal (clean — same 5 pre-existing errors in unrelated files, unchanged)
