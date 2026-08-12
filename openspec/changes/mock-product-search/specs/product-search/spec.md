## ADDED Requirements

### Requirement: Search Works Without a Live Backend
The search results page SHALL be able to return matching results using a local, frontend-bundled product dataset, so that a shopper can search the catalog even when the live backend is unavailable, not yet updated, or intentionally not integrated yet.

#### Scenario: Searching while frontend-only mode is active
- **WHEN** a shopper submits a search term while the search feature is configured to use the local dataset
- **THEN** the search results page returns products from that local dataset matching the term by name or SKU, using the same matching, active-only-filtering, and empty/no-results presentation already defined for search results

#### Scenario: Switching back to the live backend
- **WHEN** the search feature is reconfigured to use the live backend instead of the local dataset
- **THEN** subsequent searches are served by the live backend's `search` filter with no other change in observable page behavior
