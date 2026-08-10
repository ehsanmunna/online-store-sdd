## Context

`PromoBanner` (`src/components/PromoBanner.tsx`) is currently a plain server component, rendered unconditionally in `src/app/layout.tsx` between `<Header />` and `<main>`. The app uses a flat `src/app/` structure with no route groups (`cart`, `checkout`, `login`, `orders`, `orders/[id]`, `products`, `products/[id]`, `register` all sit directly under `src/app/`, alongside the home `page.tsx`). `Header`, `Footer`, and `AnnouncementBar` are all already `'use client'` components that call hooks (`useAuth`, `useCart`). See proposal.md for the "why" and `specs/promo-banner/spec.md` for requirements.

## Goals / Non-Goals

**Goals:**
- Show the promo banner only on `/`, everywhere else it renders nothing.
- Keep the banner's existing visual placement (full-width strip between `Header` and `main`), sizing, and placeholder content unchanged on the home page.

**Non-Goals:**
- No route restructuring (no route groups, no moving existing page files).
- No change to `PromoBanner`'s internal markup, sizing, or placeholder content — only its rendering condition.

## Decisions

- **Client-side pathname check via `usePathname()`, not a route group.** `PromoBanner` gains `'use client'` and an early `return null` when `usePathname() !== '/'`. Chosen over restructuring into a `src/app/(home)/` route group because a route group would require moving `page.tsx` into a new directory and adding a nested layout, touching the app's routing structure for what is otherwise a single-component behavior change — and it's inconsistent with this app's existing flat route layout. The client-pathname approach also matches the existing precedent: `Header`, `Footer`, and `AnnouncementBar` are already `'use client'` components reading from hooks, so `PromoBanner` doing the same is consistent, not a new pattern for the codebase as a whole (only new for this one component).
- **Check lives inside `PromoBanner.tsx` itself, not in `layout.tsx`.** Keeps `layout.tsx`'s composition list (`AnnouncementBar`, `Header`, `PromoBanner`, `main`, `Footer`) unchanged and unconditional; the route-awareness is encapsulated in the one component that needs it.
- **Compare against the literal string `'/'`**, not a prefix or regex, since the home page is the only route at the root path and there's no nested home route to account for.

## Risks / Trade-offs

- [`PromoBanner` becomes a Client Component, losing server-only rendering for that piece] → Consistent with `Header`/`Footer`/`AnnouncementBar` already being client components; no measurable cost in this small app.
- [A route group would have been the more idiomatic long-term App Router pattern if more home-only sections get added later] → Accepted for now per the recommended approach; revisit if a second home-only section appears and the pattern starts repeating.

## Migration Plan

Single-PR, presentation-only change. No data migration, no feature flag — deploy by merging.
