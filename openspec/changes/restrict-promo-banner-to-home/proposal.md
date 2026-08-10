## Why

The PromoBanner currently renders on every page (via the root layout), including cart, checkout, and product pages where promotional messaging is a distraction from the task at hand. It should only appear on the home page.

## What Changes

- **BREAKING**: Restrict the promo banner to the home page (`/`) only — it no longer renders on any other route (cart, checkout, products, orders, login, register, wishlist).
- The promo banner's placement (below `Header`, above page content), sizing, and placeholder content are unchanged on the home page itself.

## Capabilities

### Modified Capabilities
- `promo-banner`: Rendering condition changes from "every storefront page" to "home page only". This delta layers on top of the pending `add-promo-banner`, `resize-promo-banner`, and `adjust-promo-banner-height` changes' specs and assumes they land first (or concurrently) in the same capability path, since `promo-banner` is not yet archived into `openspec/specs/`.

## Impact

- `src/app/layout.tsx`: the `<PromoBanner />` call gains a route check instead of rendering unconditionally.
- `src/components/PromoBanner.tsx`: becomes a client component (`'use client'`) so it can read the current route via `usePathname()` and render `null` off the home page.
- No API, data, or state changes — purely a rendering-condition change.
