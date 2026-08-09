## Purpose

Defines how the storefront renders monetary amounts so every price shown to a shopper reflects the store's actual currency, Bangladeshi Taka, instead of a mismatched symbol.

## ADDED Requirements

### Requirement: Prices display with the Taka sign
The system SHALL render every monetary amount shown to the user with the Bangladesh Taka sign (৳) as the currency indicator, and SHALL NOT render monetary amounts with any other currency symbol (e.g. `$`).

#### Scenario: Product price on a listing card
- **WHEN** a product card renders a product's price
- **THEN** the displayed price is prefixed with ৳ instead of $

#### Scenario: Product compare-at (strikethrough) price
- **WHEN** a product has a `compareAtPrice` shown alongside its price
- **THEN** the compare-at price is also prefixed with ৳ instead of $

#### Scenario: Cart line items and subtotal
- **WHEN** the cart page renders a line item's unit price, line total, or the cart subtotal
- **THEN** each amount is prefixed with ৳ instead of $

#### Scenario: Checkout line totals and subtotal
- **WHEN** the checkout page renders a line total or the order subtotal
- **THEN** each amount is prefixed with ৳ instead of $

#### Scenario: Order summary and order detail amounts
- **WHEN** the orders list or an order detail page renders totals, subtotal, shipping cost, tax, or a line item total
- **THEN** each amount is prefixed with ৳ instead of $

#### Scenario: Numeric formatting is unchanged
- **WHEN** any price is displayed under this requirement
- **THEN** the underlying numeric value and its two-decimal formatting remain unchanged from before this change — only the currency symbol differs
