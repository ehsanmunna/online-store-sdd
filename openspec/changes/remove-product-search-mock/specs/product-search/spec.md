## REMOVED Requirements

### Requirement: Search Works Without a Live Backend
**Reason**: The user is ready to integrate with the real backend now; the mock-data mode added by `mock-product-search` (not yet archived) is no longer needed and is being removed rather than kept as unused code.
**Migration**: None required for shoppers — search continues to work exactly as it did in `add-product-search`, always querying the live backend. Anyone with `NEXT_PUBLIC_PRODUCT_SEARCH_DATA_SOURCE` set in a local `.env.local` should remove it; the variable is no longer read.
