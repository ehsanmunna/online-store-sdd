## Why

The site header already contains a wishlist icon linking to `/wishlist`, but no wishlist page or wishlist state exists — the link currently leads to a 404. Shoppers need a way to save products they are interested in and revisit them later, which is a standard e-commerce capability that also drives return visits and conversions.

## What Changes

- Add a client-side wishlist state (`WishlistContext`) persisted to `localStorage`, mirroring the existing cart pattern.
- Add a `/wishlist` page that lists saved products with image, name, price, and actions to remove an item or add it to the cart.
- Add an empty state on the wishlist page with a link to continue shopping.
- Add a wishlist toggle (heart) button on product cards and the product detail page so shoppers can add/remove items from the wishlist.
- Show a wishlist item count badge on the header wishlist icon, consistent with the cart count badge.

## Capabilities

### New Capabilities

- `wishlist`: Wishlist state management (add/remove/list persisted locally) and the `/wishlist` page that displays saved products with remove and add-to-cart actions, plus wishlist toggle entry points on product surfaces and a count badge in the header.

### Modified Capabilities

<!-- None — no existing specs under openspec/specs/. -->

## Impact

- **New code**: `src/context/WishlistContext.tsx`, `src/app/wishlist/page.tsx`, `src/components/WishlistToggleButton.tsx`.
- **Modified code**: `src/app/layout.tsx` (wrap with `WishlistProvider`), `src/components/Header.tsx` (wishlist count badge), `src/components/ProductCard.tsx` and `src/app/products/[id]/page.tsx` (wishlist toggle entry points).
- **APIs/dependencies**: None — wishlist is stored client-side in `localStorage`; no backend changes.
- **Compatibility**: No breaking changes. The existing `/wishlist` link in the header now resolves to a real page instead of a 404.
