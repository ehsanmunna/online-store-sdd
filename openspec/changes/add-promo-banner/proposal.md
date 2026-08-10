## Why

The storefront has no dedicated space for promotional messaging (sales, promo codes, shipping offers) below the main header. We want a banner strip that reserves that space, starting with placeholder content, matching how the announcement bar and header placeholders were introduced.

## What Changes

- Add a new banner section rendered directly below `Header`, above the page's `{children}` content, present on every page via the root layout.
- The banner splits into two side-by-side panels on wide viewports: a 70%-width promo banner panel and a 30%-width announcement/promo-code panel.
- On narrow (mobile) viewports, the two panels stack vertically, each full width, banner panel first.
- Both panels show static placeholder content (placeholder heading/graphic block for the banner panel, placeholder announcement/promo-code text for the smaller panel) — no CMS, props, or dynamic data source in this change.

## Capabilities

### New Capabilities
- `promo-banner`: A two-panel promotional banner strip rendered below the main header on every page — a 70%-width banner panel and a 30%-width announcement/promo-code panel, stacking vertically on narrow viewports.

### Modified Capabilities
(none — `header` and `announcement-bar` behavior is unchanged; this only composes a new element below `Header`)

## Impact

- `src/app/layout.tsx`: render the new banner component between `<Header />` and `<main>`.
- New component: `src/components/PromoBanner.tsx`.
- No API, data, or state changes — purely presentational, static placeholder content.
