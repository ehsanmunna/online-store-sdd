## Why

The storefront displays every price with a hardcoded `$` (US dollar) prefix, but the store sells in Bangladeshi Taka. Prices should show the Taka sign (৳) instead so displayed amounts match the actual currency.

## What Changes

- Replace every hardcoded `$` price prefix across the app with the Bangladesh Taka sign (৳).
- Centralize price formatting in a single helper so the currency symbol is defined in one place instead of being duplicated as a literal `$` at each call site.
- No changes to underlying numeric values, calculations, or stored data — this is a display-only change.

## Capabilities

### New Capabilities
- `price-display`: The system must render monetary amounts throughout the storefront using the Bangladesh Taka sign (৳) rather than any other currency symbol.

## Impact

- `src/components/ProductCard.tsx`: product price and compare-at price.
- `src/app/products/[id]/page.tsx`: product detail price and compare-at price.
- `src/app/cart/page.tsx`: line item price, line total, subtotal.
- `src/app/checkout/page.tsx`: line total, subtotal.
- `src/app/orders/page.tsx`: order total amount.
- `src/app/orders/[id]/page.tsx`: subtotal, shipping cost, tax, total amount, line item total.
- New shared formatting helper (e.g. `src/lib/currency.ts`) used by all of the above instead of inline `$` string interpolation.
