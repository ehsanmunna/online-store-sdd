## 1. PromoBanner sizing update

- [x] 1.1 Update `src/components/PromoBanner.tsx` banner panel width from `sm:w-[70%]` to `sm:w-[80%]`
- [x] 1.2 Update `src/components/PromoBanner.tsx` announcement panel width from `sm:w-[30%]` to `sm:w-[20%]`
- [x] 1.3 Add a fixed `h-[400px]` height to both panels, applied at every viewport width (including stacked mobile layout)

## 2. Verification

- [x] 2.1 Manually check the banner at desktop/tablet width: banner panel left at ~80%, announcement panel right at ~20%, both 400px tall
- [x] 2.2 Manually check the banner at mobile width: banner panel stacked above the announcement panel, each 400px tall (section ~800px total)
- [x] 2.3 Confirm no console errors and no unused classes/imports left in `PromoBanner.tsx`
