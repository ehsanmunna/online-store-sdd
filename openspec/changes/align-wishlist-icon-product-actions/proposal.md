## Why

On the product detail page, the wishlist icon button sits next to the `AddToCartButton` block, which is a column containing a quantity input above the "Add to cart" / "Buy now" button row. Because the wishlist icon is a flex sibling of that whole column, it vertically centers against the full block (quantity input + buttons) instead of lining up with the buttons themselves, so it visually floats above where "Buy now" ends rather than sitting flush beside it.

## What Changes

- Move the wishlist toggle button out of the outer flex row and into the same row as "Add to cart" and "Buy now", placed immediately after "Buy now".
- The wishlist icon aligns vertically with the button row (same height/center as "Add to cart" and "Buy now"), not with the quantity input.
- No change to wishlist toggle behavior (add/remove from wishlist), icon appearance, or the quantity input.

## Capabilities

### New Capabilities
- `product-detail-page`: The product detail page's action row (Add to cart, Buy now, wishlist toggle) must lay out the wishlist icon inline with and aligned to the Add to cart / Buy now buttons.

### Modified Capabilities
(none — no existing `openspec/specs/product-detail-page` capability yet to modify)

## Impact

- `src/app/products/[id]/page.tsx`: remove the outer flex row wrapping `AddToCartButton` and `WishlistToggleButton`; pass the wishlist button into the button row instead.
- `src/components/AddToCartButton.tsx`: accept and render an optional trailing element (or the wishlist button itself) inside its button row so alignment is guaranteed by shared flex context.
- `src/components/WishlistToggleButton.tsx`: no behavioral change; only where/how it's composed on the product detail page.
