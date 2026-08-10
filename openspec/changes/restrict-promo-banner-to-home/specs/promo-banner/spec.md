## MODIFIED Requirements

### Requirement: Promo banner renders below the header on every page
The system SHALL render a promo banner section directly below the main `Header` and above the page content, on the home page (`/`) only. The promo banner SHALL NOT render on any other route.

#### Scenario: Banner present on home page load
- **WHEN** the home page (`/`) is loaded
- **THEN** the promo banner section is rendered between the header and the page content

#### Scenario: Banner absent on other pages
- **WHEN** any non-home route (e.g. cart, checkout, a product page, orders, login, register, wishlist) is loaded
- **THEN** the promo banner section is not rendered
