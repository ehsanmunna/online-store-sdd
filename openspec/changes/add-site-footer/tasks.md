## 1. Branding fix

- [x] 1.1 Update `metadata.title` in `src/app/layout.tsx` from "Dropship Store" to "Frozen Store".
- [x] 1.2 Rename the `STORAGE_KEY` in `src/context/AuthContext.tsx` from `dropship_store_auth` to `frozen_store_auth`.
- [x] 1.3 Rename the `STORAGE_KEY` in `src/context/CartContext.tsx` from `dropship_store_cart` to `frozen_store_cart`.

## 2. Footer component

- [x] 2.1 Create `src/components/Footer.tsx`: brand column (name, short blurb, decorative email input + button with no submit handler), Shop column (links to `/`, `/cart`, `/login`, plus `/orders` only when `useAuth()` reports a logged-in user), Company column (About Us, Careers, Contact as `href="#"`), Support column (FAQ, Shipping & Returns, Privacy Policy, Terms of Service as `href="#"`).
- [x] 2.2 Add a bottom bar below the four columns: copyright line with "Frozen Store" and the current year, plus plain-text social links (`href="#"`).
- [x] 2.3 Layout the four columns as `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (matching the responsive pattern already used for the product grid), styled with the existing `border-black/10 dark:border-white/10` / opacity-based text system — no new color tokens.

## 3. Integration

- [x] 3.1 Render `<Footer />` in `src/app/layout.tsx`, below `<main>`, inside the existing provider tree.

## 4. Verification

- [x] 4.1 Run the dev server and confirm the footer renders on `/`, at both mobile and desktop widths, with columns stacking on mobile.
- [x] 4.2 Confirm "My Orders" appears in the Shop column only when logged in, and is absent for a guest.
- [x] 4.3 Confirm the browser tab title and footer copyright both read "Frozen Store".
- [x] 4.4 Confirm the newsletter button does not trigger a network request, and placeholder links (`#`) do not navigate away from the page.
