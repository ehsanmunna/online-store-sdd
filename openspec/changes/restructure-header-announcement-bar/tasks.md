## 1. Announcement bar: account controls

- [x] 1.1 Remove the static placeholder promo text from `AnnouncementBar.tsx`
- [x] 1.2 Add a user icon (inline SVG) to `AnnouncementBar.tsx`
- [x] 1.3 Wire `AnnouncementBar` to `useAuth()`; when signed out, render "Log in" (`/login`) and "Register" (`/register`) links next to the user icon
- [x] 1.4 When signed in, render the user's name, a "My orders" link (`/orders`), and a log-out control next to the user icon
- [x] 1.5 Verify the log-out control calls `logout()` and the bar reverts to the signed-out state

## 2. Header: layout restructure

- [x] 2.1 Remove the "Shop" and "My orders" nav links and the login/logout controls from `Header.tsx`
- [x] 2.2 Restructure `Header.tsx` into a three-region flex layout: logo (left), middle region, right region
- [x] 2.3 Add a non-functional search `<input>` in the middle region (no `onSubmit`/API call/navigation)
- [x] 2.4 Add a wishlist icon/link (`/wishlist`) in the right region, next to the existing cart link
- [x] 2.5 Keep the existing cart link and item-count badge (via `useCart()`), moved into the right region

## 3. Verification

- [x] 3.1 Manually check the header at desktop and mobile widths: logo left, search centered, cart+wishlist right
- [x] 3.2 Manually check the announcement bar signed-out and signed-in states
- [x] 3.3 Confirm no console errors and no unused imports remain in `Header.tsx` / `AnnouncementBar.tsx`
