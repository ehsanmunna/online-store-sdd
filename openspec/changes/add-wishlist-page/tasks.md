## 1. Wishlist State

- [x] 1.1 Create `src/context/WishlistContext.tsx` with a `WishlistProvider` and `useWishlist()` hook, mirroring `CartContext`: store `Product[]` in `localStorage` under `frozen_store_wishlist`, hydrate on mount, persist after hydration, and discard unparseable stored values
- [x] 1.2 Expose `items`, `itemCount`, `addItem(product)` (no duplicates), `removeItem(productId)`, `toggleItem(product)`, and `isInWishlist(productId)` from the context
- [x] 1.3 Wrap the app with `WishlistProvider` in `src/app/layout.tsx` (inside `CartProvider`)

## 2. Wishlist Page

- [x] 2.1 Create `src/app/wishlist/page.tsx` listing wishlist items with image, name (linking to `/products/[id]`), and formatted price via `formatPrice`, styled consistently with the cart page
- [x] 2.2 Add a per-item "Remove" action that removes the product from the wishlist
- [x] 2.3 Add a per-item "Add to cart" action that adds the product to the cart via `useCart()`
- [x] 2.4 Add an empty state ("Your wishlist is empty") with a "Continue shopping" link to `/`

## 3. Wishlist Toggle Entry Points

- [x] 3.1 Create `src/components/WishlistToggleButton.tsx` (client component) showing a heart icon that reflects saved state and toggles the product via `useWishlist()`
- [x] 3.2 Add the toggle button to `src/components/ProductCard.tsx` without converting the whole card to a client component
- [x] 3.3 Add the toggle button next to `AddToCartButton` on `src/app/products/[id]/page.tsx`

## 4. Header Integration

- [x] 4.1 Show a wishlist item count badge on the header wishlist icon in `src/components/Header.tsx` when `itemCount > 0`, reusing the cart badge styling

## 5. Verification

- [x] 5.1 Run `npm run lint` and fix any issues
- [x] 5.2 Run `npm run build` to verify the app compiles
- [x] 5.3 Manually verify: toggle products from a card and the detail page, reload to confirm persistence, view `/wishlist`, remove an item, add an item to the cart, and confirm the header badge count updates
