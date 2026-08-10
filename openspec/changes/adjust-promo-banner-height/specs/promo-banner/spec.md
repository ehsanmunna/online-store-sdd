## MODIFIED Requirements

### Requirement: Promo banner panels have a fixed 400px height
The system SHALL render both the banner panel and the announcement/promo-code panel at a fixed height of 350px, at every viewport width — including when the panels stack vertically on narrow viewports.

#### Scenario: Fixed height on desktop side-by-side layout
- **WHEN** the promo banner is viewed at a desktop or tablet viewport width
- **THEN** both the banner panel and the announcement/promo-code panel render at 350px tall

#### Scenario: Fixed height on mobile stacked layout
- **WHEN** the promo banner is viewed at a mobile viewport width
- **THEN** the banner panel renders at 350px tall, followed by the announcement/promo-code panel also rendered at 350px tall
