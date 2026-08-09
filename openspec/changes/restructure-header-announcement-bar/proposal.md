## Why

The current header mixes navigation, cart, and auth controls with no clear layout structure, and the announcement bar above it only shows static promo text. We want a clearer information architecture: the announcement bar becomes the utility strip for account actions (login/register), and the main header becomes a focused, conventional storefront layout (logo, search, cart/wishlist).

## What Changes

- **BREAKING**: Remove the static promo text from the announcement bar and replace its content with account utility controls: a user icon plus Log in / Register links (when signed out) or the user's name plus Log out (when signed in).
- **BREAKING**: Remove the Log in / Log out control from the main `Header` — auth actions live only in the announcement bar now.
- Restructure `Header` into a three-region layout: logo on the left, a search input in the middle, and cart + wishlist icons aligned to the right.
- Add a search input to the header as a UI placeholder — rendered and focusable, but does not submit, filter, or navigate (no search backend/results view in this change).
- Add a wishlist icon/link to the header as a UI placeholder — rendered and aligned with the cart icon, links to a `/wishlist` route, but has no item count, no add/remove logic, and no persisted state (no wishlist data model in this change).
- **Assumption**: the requested layout (logo / search / cart+wishlist) leaves no slot for the existing "Shop" and "My orders" nav links. "Shop" is dropped since the logo already links home; "My orders" moves into the signed-in account area of the announcement bar, since it's account-scoped.

## Capabilities

### New Capabilities
- `header`: The main site header's layout and contents — logo (left), search input placeholder (middle), and cart + wishlist icons (right). Replaces the implicit, unspecified behavior of the existing `Header` component.

### Modified Capabilities
- `announcement-bar`: Replace the static-placeholder-text requirement (defined in the pending `add-secondary-header` change) with account utility requirements — user icon, Log in/Register (signed out), and user name/Log out (signed in). This delta layers on top of that change's spec and assumes it lands first (or concurrently) in the same capability path.

## Impact

- `src/components/Header.tsx`: remove auth controls (Log in/Log out), restructure into logo / search-placeholder / cart+wishlist layout.
- `src/components/AnnouncementBar.tsx`: remove static promo text, add user icon + auth controls (reads `useAuth()` for `user`/`logout`).
- New component(s) for the search input placeholder and wishlist icon (e.g. `src/components/SearchBar.tsx`, or inlined in `Header.tsx`).
- No new route logic for `/wishlist` beyond a link target; no search API or results page.
- No API, data, or state changes — `AuthContext` and `CartContext` are read, not modified.
