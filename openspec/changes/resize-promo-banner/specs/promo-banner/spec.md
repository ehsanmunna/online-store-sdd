## MODIFIED Requirements

### Requirement: Promo banner splits into a 70% banner panel and a 30% announcement panel on wide viewports
On viewports at or above the layout's tablet/desktop breakpoint, the promo banner SHALL display two side-by-side panels: a banner panel occupying 80% of the section's width and an announcement/promo-code panel occupying the remaining 20%.

#### Scenario: Desktop width shows two side-by-side panels
- **WHEN** the promo banner is viewed at a desktop or tablet viewport width
- **THEN** the banner panel renders on the left at 80% width and the announcement/promo-code panel renders on the right at 20% width

## ADDED Requirements

### Requirement: Promo banner panels have a fixed 400px height
The system SHALL render both the banner panel and the announcement/promo-code panel at a fixed height of 400px, at every viewport width — including when the panels stack vertically on narrow viewports.

#### Scenario: Fixed height on desktop side-by-side layout
- **WHEN** the promo banner is viewed at a desktop or tablet viewport width
- **THEN** both the banner panel and the announcement/promo-code panel render at 400px tall

#### Scenario: Fixed height on mobile stacked layout
- **WHEN** the promo banner is viewed at a mobile viewport width
- **THEN** the banner panel renders at 400px tall, followed by the announcement/promo-code panel also rendered at 400px tall
