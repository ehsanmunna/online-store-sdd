## Purpose

Provides a slim, static bar rendered above the main site header on every page, reserving space for future announcement-style messaging.

## ADDED Requirements

### Requirement: Announcement bar renders above the main header
The system SHALL render an announcement bar directly above the main `Header` on every page of the storefront.

#### Scenario: Bar present on page load
- **WHEN** any storefront page is loaded
- **THEN** the announcement bar is rendered as the first element in the document body, immediately above the main header

### Requirement: Announcement bar height is half the main header's height
The announcement bar's rendered height SHALL be 50% of the main header's rendered height.

#### Scenario: Bar height relative to header
- **WHEN** the page is rendered at any viewport width
- **THEN** the announcement bar's height is 50% of the main header's height at that same viewport width

### Requirement: Announcement bar shows static placeholder text
The announcement bar SHALL display static, non-interactive placeholder text. It SHALL NOT contain links, buttons, dismiss controls, or dynamically fetched content.

#### Scenario: Placeholder content displayed
- **WHEN** the announcement bar is rendered
- **THEN** it displays fixed placeholder text and no interactive elements
