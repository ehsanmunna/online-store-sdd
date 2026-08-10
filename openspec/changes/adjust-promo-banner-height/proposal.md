## Why

The PromoBanner's fixed panel height, set to 400px in `resize-promo-banner`, reads too tall. Reducing it to 350px gives a more compact banner.

## What Changes

- **BREAKING**: Change the promo banner panels' fixed height from 400px to 350px, at every viewport width (desktop side-by-side and mobile stacked layout).

## Capabilities

### Modified Capabilities
- `promo-banner`: Fixed panel height changes from 400px to 350px. This delta layers on top of the pending `add-promo-banner` and `resize-promo-banner` changes' specs and assumes both land first (or concurrently) in the same capability path, since `promo-banner` is not yet archived into `openspec/specs/`.

## Impact

- `src/components/PromoBanner.tsx`: update the `h-[400px]` class on both panels to `h-[350px]`.
- No API, data, or state changes — purely presentational sizing.
