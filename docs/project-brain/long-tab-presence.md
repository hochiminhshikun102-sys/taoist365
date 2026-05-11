# Long Tab Presence

## Definition

**Long tab presence** is copy and gates that assume: the page may sit **open for a long time** in a real browser—without pings, streaks, or “you’re back!” energy.

## Data

- `browserReality.longTab` from `long-tab-runtime.ts`
- Fields: `tabPersistenceState`, `tabPersistenceLine`, `browserCornerPresence`, `quietBrowserWeight`, `reopenWithoutReasonLine`

## States (`TabPersistenceState`)

`newlyOpened` → `familiar` → `longOpen` → `forgottenButAlive` → `backgroundResident` → `oldQuietTab`, with deterministic nudges from day key and breathing mode—not user telemetry.

## Principles

- **Matter-of-fact**, not sentimental: the tab is still there; nobody is owed a reaction.
- **Not** “we missed you” / **not** companion framing.

## UI

- Home: folded into `LongTabPresenceNote` alongside existing `worldDensity` long-tab lines.
