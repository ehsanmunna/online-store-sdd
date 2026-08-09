## Why

The storefront has no footer — every page ends abruptly after `<main>`. Modern e-commerce sites use a multi-column footer to surface secondary navigation (company, support, legal) and reinforce the brand. Building it also surfaces an existing inconsistency: the app displays "Frozen Store" in the header but "Dropship Store" in the page title and internal storage keys.

## What Changes

- Add a 4-column footer rendered on every page, below `<main>`, in the same minimal black/white visual system as `Header`/`AnnouncementBar` (no new color tokens).
- Footer columns: brand blurb + decorative newsletter signup; Shop (real links); Company (placeholder links); Support (placeholder links). Bottom bar with copyright and plain-text social links.
- Real links point to existing routes (`/`, `/cart`, `/orders`, `/login`); "My Orders" only shown when logged in, matching `Header`'s existing pattern. Placeholder links (About, Careers, Contact, FAQ, Shipping & Returns, Privacy Policy, Terms of Service) use `href="#"` since those pages don't exist yet.
- Newsletter signup is decorative only — an email input and a button with no submit handler, no new API.
- Standardize the brand name to "Frozen Store" everywhere it's user-visible or used as an internal identifier: the `<title>`/metadata in `layout.tsx`, and the `dropship_store_*` localStorage key prefixes in `AuthContext` and `CartContext`. **BREAKING** (locally): renaming the storage keys means any browser with an existing session or cart under the old `dropship_store_*` keys will appear logged out with an empty cart after this ships — acceptable for a pre-launch storefront with no real users yet.

## Capabilities

### New Capabilities
- `site-footer`: A 4-column footer, present on every page, with real navigation links where pages exist, placeholder links where they don't, a decorative newsletter block, and a copyright/social bottom bar.
- `site-branding`: The storefront SHALL present a single, consistent brand name ("Frozen Store") across all user-visible text and internal identifiers.

### Modified Capabilities
(none — no existing spec covers header/branding behavior yet)

## Impact

- `src/app/layout.tsx`: render new footer below `<main>`; update `metadata.title`.
- New component: `src/components/Footer.tsx`.
- `src/context/AuthContext.tsx`, `src/context/CartContext.tsx`: rename `STORAGE_KEY` prefix from `dropship_store_*` to `frozen_store_*`.
- No API, dependency, or data-model changes — purely presentational plus a naming fix.
