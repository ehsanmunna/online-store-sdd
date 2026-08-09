## Purpose

Defines the layout and contents of the main site header — the logo, search input, and cart/wishlist icons shown on every storefront page.

## ADDED Requirements

### Requirement: Header layout order
The header SHALL render three regions in this order: the site logo aligned to the left, a search input horizontally centered in the middle, and the cart and wishlist icons aligned to the right.

#### Scenario: Header renders in three regions
- **WHEN** any storefront page is loaded
- **THEN** the header displays the site logo at the left edge, the search input centered in the middle, and the cart and wishlist icons at the right edge

### Requirement: Header search input is a non-functional placeholder
The header SHALL render a text search input in its middle region. The input SHALL NOT submit a query, filter products, call a search API, or navigate to a results view.

#### Scenario: Submitting the search input has no effect
- **WHEN** a user types text into the header search input and presses Enter
- **THEN** no navigation occurs and no search request is made

### Requirement: Header displays a wishlist icon placeholder
The header SHALL render a wishlist icon in its right region, adjacent to the cart icon. The wishlist icon SHALL link to a `/wishlist` route. It SHALL NOT display an item count and SHALL NOT track wishlist state.

#### Scenario: Wishlist icon rendered
- **WHEN** any storefront page is loaded
- **THEN** a wishlist icon is visible in the header's right region, next to the cart icon

#### Scenario: Wishlist icon navigation
- **WHEN** a user clicks the wishlist icon
- **THEN** the browser navigates to the `/wishlist` route

### Requirement: Header cart icon shows item count
The header SHALL render a cart icon in its right region. When the cart contains one or more items, the icon SHALL display the current item count.

#### Scenario: Cart has items
- **WHEN** the cart contains one or more items
- **THEN** the header's cart icon displays the current item count

#### Scenario: Cart is empty
- **WHEN** the cart contains zero items
- **THEN** the header's cart icon displays no count badge

### Requirement: Header does not include account controls
The header SHALL NOT render login, registration, or logout controls. Account controls are provided by the announcement bar instead.

#### Scenario: Header omits auth controls
- **WHEN** any storefront page is loaded
- **THEN** the header contains no login, register, or logout controls
