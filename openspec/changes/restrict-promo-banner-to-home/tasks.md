## 1. Restrict PromoBanner to the home route

- [x] 1.1 Add `'use client'` to `src/components/PromoBanner.tsx`
- [x] 1.2 Import and call `usePathname()` from `next/navigation` in `PromoBanner`
- [x] 1.3 Return `null` from `PromoBanner` when `usePathname() !== '/'`

## 2. Verification

- [x] 2.1 Manually check the home page (`/`): promo banner renders as before (80/20 split, 350px panels)
- [x] 2.2 Manually check at least one other route (e.g. `/cart` or `/products/[id]`): promo banner does not render
- [x] 2.3 Confirm no console errors and no unused imports in `PromoBanner.tsx`
