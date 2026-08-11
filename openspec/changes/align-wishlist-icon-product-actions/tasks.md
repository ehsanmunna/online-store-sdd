## 1. Product actions layout

- [x] 1.1 Update `AddToCartButton` to accept an optional `actionsEnd` (or similarly named) prop/child and render it inside the existing button row, after "Buy now".
- [x] 1.2 In `src/app/products/[id]/page.tsx`, remove the outer `<div className="mt-6 flex items-center gap-2">` wrapper around `AddToCartButton` and `WishlistToggleButton`, and instead pass `WishlistToggleButton` into `AddToCartButton`'s new slot.
- [x] 1.3 Verify the wishlist icon renders immediately after "Buy now" and is vertically aligned with "Add to cart" / "Buy now" (not the quantity input) at both default and small viewport widths.
- [x] 1.4 Verify wishlist toggle (add/remove) still works from the product detail page and other existing usages of `WishlistToggleButton` (e.g. `ProductCard`) are unaffected.
