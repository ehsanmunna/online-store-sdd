## Purpose

Lets a shopper search the catalog by name or SKU from the site header and view a dedicated results page listing matching products.

## ADDED Requirements

### Requirement: Header Search Submission
The header search input SHALL accept free-text input and, on submission, navigate the shopper to a search results page carrying the entered text as a query parameter.

#### Scenario: Shopper submits a search term
- **WHEN** a shopper types a term into the header search input and submits it (via pressing Enter or activating the search action)
- **THEN** the browser navigates to the search results page with the typed term encoded in the URL

#### Scenario: Shopper submits an empty search
- **WHEN** a shopper submits the header search input while it is empty or contains only whitespace
- **THEN** the system does not navigate to the search results page and the input retains focus

### Requirement: Search Results Page
The system SHALL provide a search results page that displays products whose name or SKU matches the query term supplied in the URL.

#### Scenario: Query matches one or more products
- **WHEN** a shopper visits the search results page with a query term that matches one or more active products by name or SKU
- **THEN** the page displays each matching product using the same product card presentation used on the home page, including at least its image, name, and price

#### Scenario: Query matches no products
- **WHEN** a shopper visits the search results page with a query term that matches no active products
- **THEN** the page displays a message indicating no products were found for that query, without showing an error

#### Scenario: Search results page visited with no query
- **WHEN** a shopper visits the search results page URL without a query term
- **THEN** the page displays a prompt to enter a search term instead of an empty or errored product list

### Requirement: Search Query Persistence
The search results page SHALL reflect the active query term in the header search input so the shopper can see and refine what they searched for.

#### Scenario: Reloading the search results page
- **WHEN** a shopper reloads or navigates directly to the search results page URL containing a query term
- **THEN** the header search input is pre-filled with that query term

### Requirement: Search Matches Only Active Products
The search results page SHALL only display products that are active (available for sale), consistent with product listings elsewhere in the storefront.

#### Scenario: Query matches an inactive product
- **WHEN** a shopper searches for a term that matches only products marked inactive
- **THEN** those inactive products are excluded from the search results
