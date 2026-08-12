## Context

See proposal.md - Why. This is a straightforward revert of the mode `mock-product-search` added on top of `add-product-search`'s original, still-current `/search` implementation:

- `src/app/search/page.tsx`'s `getProducts` currently branches on `process.env.NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE`: anything other than `"api"` (including unset) calls `searchMockProducts`; `"api"` calls the original `apiFetch` block.
- `src/lib/mock-products.ts` exists solely to support that branch; nothing else imports it.
- `.env.local.example` documents the toggle.
- `mock-product-search` itself is implemented but not yet archived as an OpenSpec change.

## Goals / Non-Goals

**Goals:**
- `/search` behaves exactly as it did at the end of `add-product-search`: always calls the live backend, no toggle, no mock code path left in the tree.
- No dangling references to the removed module (`mock-products.ts`) or the removed env var.

**Non-Goals:**
- Not re-verifying or changing the live backend's search endpoint itself — that's the separate backend-hardening effort referenced in `add-product-search`/`mock-product-search`.
- Not deciding here whether `mock-product-search`'s OpenSpec change should be archived, abandoned, or left as historical record — that's a bookkeeping question for whoever runs `/opsx:archive` next, not a code decision this change needs to make.

## Decisions

- **Revert `getProducts` to the single `apiFetch`-only version, not a feature-flagged deprecation.** The mock path has no remaining purpose once the user is integrating with the real backend, so removing it outright (rather than leaving it disabled behind a flag) avoids dead code. This matches how `mock-product-search`'s own design.md reasoned about avoiding unnecessary abstraction.
- **Delete `src/lib/mock-products.ts` entirely** rather than keeping it unused. Nothing else in the codebase references it (confirmed: only `search/page.tsx` imports it), so there's no reuse case for keeping it around.
- **Remove the env var line from `.env.local.example`** rather than commenting it out, so new setups don't see a dead/misleading toggle.

## Risks / Trade-offs

- [Someone still has `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` set in their own local `.env.local`] → Harmless: once the code no longer reads that variable, it's simply ignored. No migration action required beyond what's already noted in the spec delta's Migration field.
- [`mock-product-search`'s OpenSpec change stays open/unarchived after this lands, describing behavior that no longer exists in code] → Out of scope to resolve here (see Non-Goals); flagged in the proposal and left for the user to decide (archive as superseded, or delete the change folder) when convenient.
