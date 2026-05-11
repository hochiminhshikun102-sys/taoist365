# Mail Thread Aging

## Role

Copy for **long threads**: slow reopen, subject familiarity, shelf drift between messages, shorter replies allowed, thread backgrounding—**no** CRM, fake intimacy, or retention language.

## Code

- `src/data/mail-thread-aging/*`
- `worldQuietPermanence.mailThreadAging`

## UI

`MailContinuityStrip` shows one aging line on **even** `dailyIndex` days beneath the main continuity line.
