## Why

The header's cart control is currently a plain "Cart" text link. The wishlist control next to it already uses an icon; the cart should match that visual style instead of mixing text and icon links.

## What Changes

- Replace the "Cart" text label in the header with a cart icon, matching the existing wishlist icon's style and placement.
- Keep the existing item-count badge, now attached to the icon instead of the text label.
- Keep the link's destination (`/cart`) and existing item-count behavior unchanged.

## Capabilities

### Modified Capabilities
- `header`: The cart control's requirement (currently a text label) changes to require an icon. This delta layers on top of the `header` capability defined in the pending `restructure-header-announcement-bar` change.

## Impact

- `src/components/Header.tsx`: replace the "Cart" text with a cart icon (inline SVG, consistent with the existing `WishlistIcon` pattern), keep the item-count badge and `/cart` link target.
