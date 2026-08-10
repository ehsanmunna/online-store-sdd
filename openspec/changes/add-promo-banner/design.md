## Context

`Header` (`src/components/Header.tsx`) and `Footer` (`src/components/Footer.tsx`) are composed in `src/app/layout.tsx` (see [layout.tsx](../../../src/app/layout.tsx)). `Footer` already uses Tailwind's `sm:` breakpoint to switch from a stacked mobile layout to a row layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). No existing component implements a fixed asymmetric width split (70/30) or a promo/banner visual style — this is a new visual pattern. See proposal.md for the "why" and `specs/promo-banner/spec.md` for requirements.

## Goals / Non-Goals

**Goals:**
- Reserve the layout slot and visual structure for future promotional content (banner + announcement/promo-code panel) using static placeholders.
- Reuse the codebase's existing responsive convention (`sm:` breakpoint) rather than introducing a new one.

**Non-Goals:**
- No CMS, props, or dynamic content source for either panel.
- No carousel, animation, dismiss control, or countdown timer.
- No real promotional image asset — the banner panel is a placeholder block, not an `<img>`/`next/image`.

## Decisions

- **New standalone component `PromoBanner.tsx`, composed once in `layout.tsx` between `<Header />` and `<main>`**, mirroring how `AnnouncementBar` and `Footer` are already composed at the root layout level rather than per-page. Keeps the "every page gets it for free" property from the proposal.
- **Layout mechanism: CSS flexbox with `flex-col sm:flex-row`**, banner panel `sm:w-[70%]` and announcement panel `sm:w-[30%]`, both `w-full` below `sm:`. Chosen over CSS grid because the split is a simple two-item proportional row, consistent with the flex-based patterns already used in `Header.tsx` and `Footer.tsx` (no grid usage exists in the codebase for two-item splits).
- **Breakpoint: `sm:` (640px)**, matching `Footer.tsx`'s existing stack→row breakpoint, instead of introducing `md:` or a custom value — keeps responsive behavior consistent across the storefront's structural components.
- **Placeholder content is plain text + a background tint/border, no image**: consistent with how `AnnouncementBar` and the header's search/wishlist placeholders shipped — visually present, not pretending to be real creative/copy. Avoids adding image assets or `next/image` config for content that isn't real yet.

## Risks / Trade-offs

- [70/30 split reads as arbitrary once real creative is dropped in] → Out of scope; proportions come directly from the user's request and can be adjusted when real content design is available.
- [Static placeholder will need replacing before shipping to real users] → Same pattern already accepted for `AnnouncementBar`'s original placeholder and the header's search/wishlist placeholders; flagged here for visibility, not a blocker.

## Migration Plan

Single-PR, presentation-only change. No data migration, no feature flag — deploy by merging.
