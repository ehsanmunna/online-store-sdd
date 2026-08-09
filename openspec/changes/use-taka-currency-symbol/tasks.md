## 1. Shared formatting helper

- [x] 1.1 Add a `formatPrice(amount: number): string` helper (e.g. `src/lib/currency.ts`) that returns the amount prefixed with the Taka sign (৳) and formatted to two decimal places.

## 2. Product displays

- [x] 2.1 Update `src/components/ProductCard.tsx` to use `formatPrice` for the price and compare-at price.
- [x] 2.2 Update `src/app/products/[id]/page.tsx` to use `formatPrice` for the price and compare-at price.

## 3. Cart and checkout

- [x] 3.1 Update `src/app/cart/page.tsx` to use `formatPrice` for the line item price, line total, and subtotal.
- [x] 3.2 Update `src/app/checkout/page.tsx` to use `formatPrice` for the line total and subtotal.

## 4. Orders

- [x] 4.1 Update `src/app/orders/page.tsx` to use `formatPrice` for the order total amount.
- [x] 4.2 Update `src/app/orders/[id]/page.tsx` to use `formatPrice` for subtotal, shipping cost, tax, total amount, and line item total.

## 5. Verification

- [x] 5.1 Search the codebase for any remaining hardcoded `$` price interpolations and confirm none remain.
- [x] 5.2 Visually spot-check product listing, product detail, cart, checkout, orders list, and order detail pages.
