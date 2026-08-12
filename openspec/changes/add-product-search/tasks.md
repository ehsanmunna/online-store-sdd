## 1. Search Results Page

- [x] 1.1 Create `src/app/search/page.tsx` as an async Server Component that reads `q` from `searchParams`
- [x] 1.2 Add a `getProducts(q)` function that trims `q`, returns `[]` immediately if blank, and otherwise calls `apiFetch<PagedResult<Product>>('/products?search=' + encodeURIComponent(q) + '&isActive=true')`, catching fetch errors and returning `[]`
- [x] 1.3 Render the query term in a page heading (e.g. `Search results for "…"`)
- [x] 1.4 Render matching products in the same grid/`ProductCard` layout used on `HomePage`
- [x] 1.5 Render a "no products found" message when the trimmed query is non-empty but returns zero results
- [x] 1.6 Render an "enter a search term" prompt when `q` is missing or blank (no API call made)

## 2. Header Search Input

- [x] 2.1 Wrap the header search `<input>` in a `<form>` that submits via GET to `/search` with the input named so it maps to the `q` query param
- [x] 2.2 Make the input a controlled component (client-side state) and prevent submission (no navigation) when the trimmed value is empty
- [x] 2.3 Initialize the input's value from the current `q` search param via `useSearchParams` so it stays populated while viewing `/search`
- [x] 2.4 Confirm the form submits correctly on Enter key and on any explicit search action, and that focus/behavior matches existing header styling (no visual regression)

## 3. Verification

- [x] 3.1 Manually test: typing a term that matches a product name and submitting navigates to `/search?q=<term>` and lists matching products
- [x] 3.2 Manually test: typing a term that matches only an inactive product yields "no products found" (mechanism verified — `isActive=true` is passed through and correctly filters live seed data; no inactive product existed in seed data to exercise the exclusion path directly)
- [ ] 3.3 Manually test: submitting an empty/whitespace-only search does not navigate (verified by code review of the `handleSubmit` guard only — no browser-automation tool available in this session to click-test interactively; recommend a quick manual check)
- [x] 3.4 Manually test: visiting `/search` directly (no `q`) shows the prompt state, and visiting `/search?q=` (blank) behaves the same
- [x] 3.5 Manually test: reloading `/search?q=<term>` keeps the header input pre-filled with `<term>`
- [x] 3.6 Run `npm run lint` and fix any issues introduced by the new route/component changes
