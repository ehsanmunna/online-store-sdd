## Context

The header already renders a wishlist icon linking to `/wishlist`, but the route does not exist and there is no wishlist state anywhere in the app. The codebase already has an established pattern for client-side persisted state: `CartContext` (`src/context/CartContext.tsx`) stores cart lines in `localStorage` under a `frozen_store_cart` key, is provided from the root layout, and is consumed via a `useCart()` hook. The wishlist follows the same shape. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**

- Wishlist state managed by a `WishlistContext` mirroring the `CartContext` pattern (provider in root layout, `useWishlist()` hook, `localStorage` persistence).
- A `/wishlist` page consistent with the existing cart page layout and styling.
- Wishlist toggle entry points on `ProductCard` and the product detail page.
- A count badge on the header wishlist icon, consistent with the cart badge.

**Non-Goals:**

- Server-side / account-linked wishlists (no backend changes; wishlist is per-browser).
- Moving items between cart and wishlist automatically (adding to cart does not remove from wishlist).
- Wishlist sharing, multiple wishlists, or analytics.

## Decisions

- **Client-side context + `localStorage`, mirroring `CartContext`.** The app already uses this pattern for the cart; reusing it keeps behavior and hydration handling consistent. Alternative considered: storing only product IDs and re-fetching product data — rejected because the cart already stores full `Product` objects and the wishlist page needs name/price/image without extra API calls.
- **Store full `Product` objects** (not IDs) under a new key `frozen_store_wishlist`. Same rationale as cart: the wishlist page renders entirely from local state.
- **Wishlist stores products, not quantities.** Unlike cart lines, a wishlist entry is just a product — membership is boolean. Operations: `addItem(product)`, `removeItem(productId)`, `toggleItem(product)`, `isInWishlist(productId)`, plus `items` and `itemCount`.
- **Dedicated `WishlistToggleButton` client component** for the heart toggle, so `ProductCard` (currently a server component) can stay server-rendered where possible; the toggle button itself is a client component. On the product detail page it sits next to `AddToCartButton`.
- **Header badge reuses the cart badge styling** (rounded pill next to the icon), shown only when `itemCount > 0`.
- **Hydration guard copied from `CartContext`**: load from `localStorage` in a mount effect, only write back after hydration, discard unparseable stored values.

## Risks / Trade-offs

- [Wishlist is per-browser and lost if storage is cleared] → Acceptable for now; documented as a non-goal. A future change can sync to the backend for logged-in users.
- [Stored products can go stale (price/stock changes)] → Same trade-off the cart already accepts; product detail page remains the source of truth.
- [`ProductCard` is a server component; adding an interactive toggle could force client-side rendering of the whole card] → Keep the toggle as a small isolated client component so the rest of the card stays server-rendered.
