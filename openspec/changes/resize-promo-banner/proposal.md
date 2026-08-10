## Why

The PromoBanner shipped in `add-promo-banner` uses content-driven panel height and a 70/30 width split. That split reads too narrow for the announcement/promo-code panel, and the section's height varies with content instead of giving the banner a consistent, predictable footprint.

## What Changes

- **BREAKING**: Change the promo banner's panel width split from 70%/30% to 80%/20% (banner panel widens, announcement/promo-code panel narrows).
- **BREAKING**: Give each panel a fixed height of 400px, at every viewport width — including when the panels stack vertically on mobile (so the stacked section is ~800px tall, not content-driven).

## Capabilities

### Modified Capabilities
- `promo-banner`: Width split changes from 70/30 to 80/20; panels get a fixed 400px height at all viewport widths, replacing the previous content-driven height. This delta layers on top of the pending `add-promo-banner` change's spec and assumes it lands first (or concurrently) in the same capability path, since `promo-banner` is not yet archived into `openspec/specs/`.

## Impact

- `src/components/PromoBanner.tsx`: update panel width classes (`sm:w-[70%]`/`sm:w-[30%]` → `sm:w-[80%]`/`sm:w-[20%]`) and add fixed-height classes (`h-[400px]`) to both panels.
- No API, data, or state changes — purely presentational sizing.
