## 1. Cart icon

- [x] 1.1 Add a `CartIcon` inline SVG to `Header.tsx`, matching the style of the existing `WishlistIcon`
- [x] 1.2 Replace the "Cart" text inside the `/cart` link with `<CartIcon />`, keeping the existing item-count badge and `aria-label="Cart"` for accessibility

## 2. Verification

- [x] 2.1 Manually check the header: cart icon renders next to the wishlist icon, badge still shows the correct item count, link still navigates to `/cart`
- [x] 2.2 Confirm no console errors and no unused imports remain in `Header.tsx`
