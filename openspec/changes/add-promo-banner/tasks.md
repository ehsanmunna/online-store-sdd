## 1. PromoBanner component

- [x] 1.1 Create `src/components/PromoBanner.tsx` exporting a `PromoBanner` component
- [x] 1.2 Implement the two-panel layout with `flex-col sm:flex-row`: banner panel `w-full sm:w-[70%]`, announcement panel `w-full sm:w-[30%]`
- [x] 1.3 Add placeholder heading text and a background tint/border to the banner panel (no image asset)
- [x] 1.4 Add placeholder announcement/promo-code text to the announcement panel

## 2. Layout integration

- [x] 2.1 Import and render `<PromoBanner />` in `src/app/layout.tsx`, directly below `<Header />` and above `<main>`

## 3. Verification

- [x] 3.1 Manually check the banner at desktop/tablet width: banner panel left at ~70%, announcement panel right at ~30%
- [x] 3.2 Manually check the banner at mobile width: banner panel stacked above the announcement panel, both full width
- [x] 3.3 Confirm no console errors and no unused imports in `PromoBanner.tsx` / `layout.tsx`
