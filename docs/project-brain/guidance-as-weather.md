# Guidance as weather

## Why guidance approaches “weather,” not “response”

Weather does not close a ticket; it does not route you to step two. Room-scale guidance should sometimes be **one line of air**—still human-tinted, but not conversational, not session-shaped.

## What ships in code

- `src/data/guidance-room-weather/*` — vocabulary for weather-only, no closure, light touch.
- `GuidanceSessionClient`: `guidanceDissolution` + `guidanceQuiet` + **`invisibleInfrastructureStructuralThinning`** (`guidanceStackWeatherOnly`, hard no-routes / no-closure when bias crosses thresholds).

## Constraints

Still allow readable context on heavy days; tune thresholds if weather-only dominates every day.
