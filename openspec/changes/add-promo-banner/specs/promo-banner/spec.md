## Purpose

Reserves a promotional banner strip below the main header, split into a wide banner panel and a narrower announcement/promo-code panel, for future marketing messaging.

## ADDED Requirements

### Requirement: Promo banner renders below the header on every page
The system SHALL render a promo banner section directly below the main `Header` and above the page content, on every storefront page, via the root layout.

#### Scenario: Banner present on page load
- **WHEN** any storefront page is loaded
- **THEN** the promo banner section is rendered between the header and the page content

### Requirement: Promo banner splits into a 70% banner panel and a 30% announcement panel on wide viewports
On viewports at or above the layout's tablet/desktop breakpoint, the promo banner SHALL display two side-by-side panels: a banner panel occupying 70% of the section's width and an announcement/promo-code panel occupying the remaining 30%.

#### Scenario: Desktop width shows two side-by-side panels
- **WHEN** the promo banner is viewed at a desktop or tablet viewport width
- **THEN** the banner panel renders on the left at 70% width and the announcement/promo-code panel renders on the right at 30% width

### Requirement: Promo banner panels stack vertically on narrow viewports
Below the layout's tablet/desktop breakpoint, the promo banner SHALL stack the banner panel and the announcement/promo-code panel vertically, each at full width, with the banner panel first.

#### Scenario: Mobile width shows stacked panels
- **WHEN** the promo banner is viewed at a mobile viewport width
- **THEN** the banner panel renders full-width above the announcement/promo-code panel, which also renders full-width

### Requirement: Promo banner shows static placeholder content
The system SHALL render static placeholder content in both panels — a placeholder heading/graphic block in the banner panel and placeholder announcement/promo-code text in the smaller panel — with no CMS integration, props-based content, or dynamic data source in this change.

#### Scenario: Placeholder content is visible
- **WHEN** the promo banner is rendered
- **THEN** the banner panel shows placeholder heading text and the announcement panel shows placeholder announcement/promo-code text, with no network request or dynamic data driving either panel
