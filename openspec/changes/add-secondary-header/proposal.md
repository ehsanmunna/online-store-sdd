## Why

The storefront currently renders a single header bar. We want a slim announcement/utility bar above the main header to reserve space for future messaging (promotions, shipping notices, etc.), starting with placeholder text.

## What Changes

- Add a new bar rendered above the existing `Header` component, present on every page (via the root layout).
- The new bar's height is 50% of the main header's height.
- The new bar displays static placeholder text (no dynamic content, no links, no dismiss control).

## Capabilities

### New Capabilities
- `announcement-bar`: A slim, non-interactive bar rendered above the main site header, at half the main header's height, showing static placeholder text on every page.

### Modified Capabilities
(none — the existing header's own behavior is unchanged; only a new element is composed above it)

## Impact

- `src/app/layout.tsx`: render the new bar above `<Header />`.
- New component: `src/components/AnnouncementBar.tsx` (or similar).
- No API, data, or state changes — purely presentational, static content.
