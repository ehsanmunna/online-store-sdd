## REMOVED Requirements

### Requirement: Announcement bar shows static placeholder text
**Reason**: The announcement bar now surfaces account utility controls (user icon, login/register, or signed-in status) instead of static promotional text.
**Migration**: None. No other requirement or component depends on the placeholder text; it is dropped, not relocated.

## ADDED Requirements

### Requirement: Announcement bar shows account controls when signed out
When no user is signed in, the announcement bar SHALL display a user icon together with a Log in link and a Register link.

#### Scenario: Signed-out user sees login and register
- **WHEN** no user is signed in and any storefront page is loaded
- **THEN** the announcement bar displays a user icon, a "Log in" link, and a "Register" link

### Requirement: Announcement bar shows account status when signed in
When a user is signed in, the announcement bar SHALL display a user icon together with the signed-in user's name, a "My orders" link, and a control to log out.

#### Scenario: Signed-in user sees account status
- **WHEN** a user is signed in and any storefront page is loaded
- **THEN** the announcement bar displays a user icon, the signed-in user's name, a "My orders" link, and a log-out control

#### Scenario: Signed-in user logs out
- **WHEN** a signed-in user activates the log-out control in the announcement bar
- **THEN** the user is signed out and the announcement bar reverts to showing the user icon, "Log in", and "Register" links
