# True Mail Continuity

## Purpose

Mail reads as **slow correspondence over months or years**—long thread sediment, uneven replies, pauses, shelf changes between messages, old subject lines—**not** a support pipeline or CRM. Data: `src/data/true-mail-continuity/` → `worldMaturity.trueMail`.

## Forbidden patterns

- CRM framing, relationship simulation, fake intimacy, “we remember you,” engagement hooks, ticket metaphors as primary tone.

## UI

- `MailContinuityStrip` on `/inquiry` after `MailTemporalPresence`; rotates lines by day key, always includes `noServicePipelineLine` as a quiet boundary.
