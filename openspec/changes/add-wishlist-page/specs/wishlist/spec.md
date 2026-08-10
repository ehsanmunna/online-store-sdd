## Purpose

Lets shoppers save products to a personal wishlist and revisit them later from a dedicated `/wishlist` page, with the wishlist persisted locally in the browser.

## ADDED Requirements

### Requirement: Wishlist state management

The system SHALL maintain a client-side wishlist of products that persists across browser sessions via `localStorage`. The wishlist SHALL store each saved product once (no duplicates) and SHALL expose operations to add a product, remove a product, toggle a product's membership, and query whether a product is in the wishlist.

#### Scenario: Add a product to the wishlist

- **WHEN** a shopper adds a product to the wishlist
- **THEN** the product appears in the wishlist and is persisted to `localStorage`

#### Scenario: Adding the same product twice does not duplicate it

- **WHEN** a shopper adds a product that is already in the wishlist
- **THEN** the wishlist still contains exactly one entry for that product

#### Scenario: Wishlist survives page reload

- **WHEN** a shopper has items in the wishlist and reloads the page
- **THEN** the wishlist still contains the previously saved items

#### Scenario: Corrupted stored data is discarded

- **WHEN** the value stored in `localStorage` for the wishlist cannot be parsed
- **THEN** the system starts with an empty wishlist and removes the corrupted stored value

### Requirement: Wishlist page

The system SHALL provide a `/wishlist` page that lists every product in the wishlist. Each entry SHALL show the product image (when available), name, and formatted price, and SHALL link to the product detail page. Each entry SHALL provide an action to remove the product from the wishlist and an action to add the product to the cart.

#### Scenario: View wishlist with items

- **WHEN** a shopper navigates to `/wishlist` with items saved
- **THEN** the page lists each saved product with its image, name, and price

#### Scenario: Remove an item from the wishlist page

- **WHEN** a shopper clicks the remove action on a wishlist entry
- **THEN** that product is removed from the wishlist and no longer appears on the page

#### Scenario: Add a wishlist item to the cart

- **WHEN** a shopper clicks the add-to-cart action on a wishlist entry
- **THEN** that product is added to the shopping cart

#### Scenario: Empty wishlist

- **WHEN** a shopper navigates to `/wishlist` with no items saved
- **THEN** the page shows an empty-state message with a link to continue shopping

### Requirement: Wishlist toggle on product surfaces

The system SHALL provide a wishlist toggle control on product cards and on the product detail page. The toggle SHALL visually indicate whether the product is currently in the wishlist and SHALL add the product when it is not saved, or remove it when it is already saved.

#### Scenario: Toggle adds an unsaved product

- **WHEN** a shopper activates the wishlist toggle for a product not in the wishlist
- **THEN** the product is added to the wishlist and the toggle shows the saved state

#### Scenario: Toggle removes a saved product

- **WHEN** a shopper activates the wishlist toggle for a product already in the wishlist
- **THEN** the product is removed from the wishlist and the toggle shows the unsaved state

### Requirement: Header wishlist link and count

The header SHALL link the wishlist icon to `/wishlist` and SHALL display a count badge with the number of wishlist items when the wishlist is not empty. The badge SHALL be hidden when the wishlist is empty.

#### Scenario: Badge shows item count

- **WHEN** the wishlist contains items
- **THEN** the header wishlist icon displays a badge with the number of saved items

#### Scenario: Badge hidden when empty

- **WHEN** the wishlist is empty
- **THEN** no count badge is shown on the header wishlist icon
