## Context

See proposal.md - Why. `Header` and `AnnouncementBar` already establish the visual system (`border-black/10 dark:border-white/10`, opacity-based text, `max-w-6xl` container, no color tokens) and both render inside `layout.tsx`'s provider tree. `AuthContext` and `CartContext` each persist to `localStorage` under a `dropship_store_*`-prefixed key, read once on mount.

## Goals / Non-Goals

**Goals:**
- Footer visually and structurally consistent with `Header`/`AnnouncementBar`.
- Brand name unified to "Frozen Store" without a data-migration mechanism.

**Non-Goals:**
- No newsletter backend, no new pages behind the placeholder links, no icon library.
- No attempt to migrate existing `dropship_store_*` localStorage data to the new key — see Risks.

## Decisions

- **New standalone `Footer.tsx` component**, following the same pattern as `Header.tsx`/`AnnouncementBar.tsx`: one file, no props, rendered directly in `layout.tsx`. Rejected alternative: folding footer markup directly into `layout.tsx` — kept as a separate component for consistency with the existing `Header`/`AnnouncementBar` split and to keep `layout.tsx` a thin composition point.
- **"My Orders" visibility reuses `useAuth()`**, the same hook and conditional pattern `Header` already uses (`{user && <Link href="/orders">...}`) — no new auth-checking logic.
- **Placeholder links use `href="#"`**, not `<span>` or `<button>`, so they remain real anchor elements (matches how a footer nav is normally marked up for accessibility/semantics) while intentionally not resolving to a route.
- **Storage key rename is a straight find-and-replace** (`dropship_store_auth` → `frozen_store_auth`, `dropship_store_cart` → `frozen_store_cart`), not a migration. See Risks for why.

## Risks / Trade-offs

- **[Risk]** Renaming the storage keys silently drops any existing session/cart in a browser that already used the old keys → **Mitigation**: none needed — this is a pre-launch app with no real user base yet (confirmed acceptable in proposal.md). If this were a live store, the correct approach would be to read the old key as a fallback and re-persist under the new key on first load, then drop the fallback in a later change.
- **[Risk]** Hardcoded placeholder columns (Company/Support) reference pages that don't exist → **Mitigation**: labels are realistic and links are inert (`href="#"`), matching the explicit scope decision in proposal.md; no broken navigation, just no destination yet.

## Migration Plan

No deployment migration needed — this is a static content and client-side rename change with no server/API component. Rollback is a plain revert of the commit; no data cleanup required since old localStorage keys are simply abandoned (browsers will hold small unused entries under the old key names, which is harmless).
