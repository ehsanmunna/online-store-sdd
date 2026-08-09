## Purpose

Defines the layout of the product detail page so shoppers see a product's descriptive content positioned consistently relative to its image.

## ADDED Requirements

### Requirement: Description appears under the product image
The product detail page SHALL render the product's description directly beneath the product image, when a description is present.

#### Scenario: Product has a description
- **WHEN** a shopper views a product detail page for a product with a non-empty description
- **THEN** the description text renders directly below the product image, above or separate from the price/stock/add-to-cart column

#### Scenario: Product has no description
- **WHEN** a shopper views a product detail page for a product with no description
- **THEN** no description block renders under the image, and the rest of the page layout is unaffected
