## Purpose

Provides a persistent, multi-column footer on every storefront page, surfacing secondary navigation (shop, company, support) and brand/copyright information below the main content.

## ADDED Requirements

### Requirement: Footer renders on every page
The system SHALL render a footer directly below the main content area on every page of the storefront.

#### Scenario: Footer present on page load
- **WHEN** any storefront page is loaded
- **THEN** the footer is rendered as the last element in the page, below `<main>`

### Requirement: Footer is organized into four columns
The footer SHALL present four columns: a brand column, a Shop column, a Company column, and a Support column. On narrow viewports the columns SHALL stack vertically.

#### Scenario: Desktop layout
- **WHEN** the footer is rendered at a desktop viewport width
- **THEN** the four columns are displayed side by side

#### Scenario: Mobile layout
- **WHEN** the footer is rendered at a mobile viewport width
- **THEN** the four columns are stacked vertically in a single column

### Requirement: Shop column links to real pages
The Shop column SHALL contain functional links: to the shop/home page, the cart page, and the login page. A link to the orders page SHALL be shown only when a user is logged in.

#### Scenario: Guest sees shop links without orders
- **WHEN** the footer is rendered and no user is logged in
- **THEN** the Shop column shows links to the shop page, cart page, and login page, and does not show a link to the orders page

#### Scenario: Logged-in user sees orders link
- **WHEN** the footer is rendered and a user is logged in
- **THEN** the Shop column additionally shows a link to the orders page

### Requirement: Company and Support columns show placeholder links
The Company and Support columns SHALL display realistic navigational labels (e.g. About Us, Careers, Contact, FAQ, Shipping & Returns, Privacy Policy, Terms of Service) whose links do not navigate to a real page, since these pages do not yet exist.

#### Scenario: Placeholder links present but inert
- **WHEN** the footer is rendered
- **THEN** the Company and Support columns show their labeled links, and activating any of them does not navigate away from the current page

### Requirement: Brand column includes a decorative newsletter signup
The brand column SHALL display the brand name, a short blurb, and a newsletter signup control (an email input and a submit button). The signup control SHALL NOT submit data anywhere.

#### Scenario: Newsletter control has no effect
- **WHEN** a user enters an email and activates the newsletter submit button
- **THEN** no network request is made and no confirmation state is required

### Requirement: Footer shows a copyright and social bottom bar
The footer SHALL display a bottom bar with a copyright line naming the brand and the current year, and plain-text social links that do not navigate to a real page.

#### Scenario: Bottom bar present
- **WHEN** the footer is rendered
- **THEN** a copyright line naming the brand and social links are displayed below the four columns
