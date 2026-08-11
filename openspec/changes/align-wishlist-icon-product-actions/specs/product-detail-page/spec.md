## Purpose

Defines how the product detail page's purchase actions (Add to cart, Buy now, and the wishlist toggle) are laid out relative to one another, so the wishlist control reads as part of the action row instead of floating against unrelated content.

## ADDED Requirements

### Requirement: Wishlist icon alignment in product actions
The product detail page SHALL render the wishlist toggle button inline within the same row as the "Add to cart" and "Buy now" buttons, positioned immediately after "Buy now", vertically aligned with those buttons.

#### Scenario: Wishlist icon sits beside Buy now
- **WHEN** a shopper views a product detail page
- **THEN** the wishlist toggle button appears in the same horizontal row as "Add to cart" and "Buy now", directly after "Buy now"
- **AND** the wishlist toggle button is vertically centered with "Add to cart" and "Buy now", not with the quantity input above them

#### Scenario: Wishlist toggle behavior is unchanged
- **WHEN** a shopper clicks the wishlist toggle button on the product detail page
- **THEN** the product is added to or removed from the wishlist exactly as before, with no change to the icon's appearance or interaction
