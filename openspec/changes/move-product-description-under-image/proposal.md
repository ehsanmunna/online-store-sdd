## Why

On the product detail page, the product description currently renders in the right-hand text column below the price, separated from the product image. Placing the description directly under the image groups the visual and descriptive content together, which reads more naturally before the price/stock/add-to-cart column.

## What Changes

- Move the product description block from the right-hand text column to directly below the product image in the left column.
- No change to the description content itself, and no change to the rest of the right column's content or order (category, name, price, stock, add-to-cart).

## Capabilities

### New Capabilities
- `product-detail-page`: The product detail page must display the product's description directly beneath the product image.

## Impact

- `src/app/products/[id]/page.tsx`: relocate the existing `product.description` block from the right column to under the image in the left column.
