## MODIFIED Requirements

### Requirement: Header cart icon shows item count
The header SHALL render a cart control in its right region as a graphical icon (not a text label), matching the visual style of the adjacent wishlist icon. When the cart contains one or more items, the icon SHALL display the current item count.

#### Scenario: Cart icon rendered instead of text
- **WHEN** any storefront page is loaded
- **THEN** the header's cart control in the right region is a graphical icon, not the word "Cart"

#### Scenario: Cart has items
- **WHEN** the cart contains one or more items
- **THEN** the header's cart icon displays the current item count

#### Scenario: Cart is empty
- **WHEN** the cart contains zero items
- **THEN** the header's cart icon displays no count badge
