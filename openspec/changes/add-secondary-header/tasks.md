## 1. Component

- [ ] 1.1 Create `src/components/AnnouncementBar.tsx`: a static, non-interactive bar with fixed placeholder text (no props, no client state).
- [ ] 1.2 Size the bar so its rendered height is 50% of `Header`'s rendered height at every viewport width — mirror `Header`'s box model (same `max-w-6xl` container, border, and font metrics) but at half the vertical padding and half the text size, rather than a hardcoded pixel height that would drift if `Header` changes.

## 2. Integration

- [ ] 2.1 Render `<AnnouncementBar />` in `src/app/layout.tsx` immediately above `<Header />`, inside the existing provider tree.

## 3. Verification

- [ ] 3.1 Run the dev server and visually confirm the bar appears above the header on `/`, at both mobile and desktop widths, with height visually half of the header's.
- [ ] 3.2 Confirm the bar has no interactive elements (no links/buttons) and content doesn't change across pages.
