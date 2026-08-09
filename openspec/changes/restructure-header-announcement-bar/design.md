## Context

`Header` (`src/components/Header.tsx`) currently renders logo, a "Shop"/"My orders" nav, cart link, and login/logout — all in one flex row. `AnnouncementBar` (`src/components/AnnouncementBar.tsx`) is a static, non-interactive bar with placeholder promo text, defined by the pending `add-secondary-header` change (not yet archived). Both components are already composed in `src/app/layout.tsx` above `{children}`. `useAuth()` (`AuthContext`) exposes `user`/`logout`/etc.; `useCart()` (`CartContext`) exposes `itemCount`. See proposal.md for the "why" and `specs/header/spec.md` / `specs/announcement-bar/spec.md` for the requirements.

## Goals / Non-Goals

**Goals:**
- Reposition existing, already-working behavior (logo, cart badge, login/register/logout) into the new layout without changing their underlying logic.
- Add two purely presentational placeholders (search input, wishlist icon) that don't pretend to be functional.

**Non-Goals:**
- No search implementation (API, results page, keyboard nav, suggestions).
- No wishlist data model, persistence, or count badge.
- No visual redesign beyond what's needed to satisfy the new layout (colors, spacing conventions stay as-is).

## Decisions

- **Keep `AnnouncementBar` and `Header` as separate components**, each still owning one region of the page, rather than merging them. This matches the existing composition in `layout.tsx` and keeps the height-ratio requirement from `add-secondary-header` (announcement bar = 50% of header height) isolated from this change's edits.
- **Auth controls move, not duplicate**: `Header` stops calling `logout`/rendering login links; `AnnouncementBar` becomes the sole consumer of `useAuth()` for rendering. Avoids two places going out of sync on auth state.
- **Search input and wishlist icon are static placeholders, implemented inline in `Header.tsx`** (no new context, no new route logic) — consistent with how the announcement bar itself first shipped as a static placeholder. A `/wishlist` route target is required for the link but does not need a page in this change; if `/wishlist` doesn't resolve to an existing route, link it as a plain anchor/Link to the path without asserting the destination renders anything specific.
- **"Shop" and "My orders" links are relocated, not silently dropped**: `Shop` is removed (logo already links to `/`); `My orders` moves into the announcement bar's signed-in account area, since it's account-scoped content and the header's middle region is now reserved for search.
- **User icon**: use a small inline SVG (no new icon dependency) matching the existing lucide-free, dependency-free style already used in the codebase (plain SVGs/text, no icon library currently installed).

## Risks / Trade-offs

- [Removing "Shop" link reduces primary-nav discoverability] → Mitigated by the logo already linking home; acceptable since the user's requested layout has no slot for it.
- [Moving auth out of `Header` is a breaking UI change for anyone relying on the old DOM structure] → No external consumers of `Header`'s DOM exist in this codebase; scoped to this app only.
- [`/wishlist` link with no backing page will 404 or need a stub] → Out of scope per the placeholder-only decision; flagged so the user can decide later whether a stub page is needed before shipping to real users.

## Migration Plan

Single-PR change, no data migration. Deploy by merging; no feature flag needed since this is presentation-only and has no backend dependency.
