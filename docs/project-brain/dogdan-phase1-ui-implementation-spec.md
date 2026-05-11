# Dogdan Phase 1 UI Implementation Spec

Source: `Taoist365-Dogdan-Phase1.zip`, `Taoist365-Unified-VI-System.zip`, plus current Taoist365 code state.

This spec treats Dogdan's phrases as **visual direction**, not repository naming. Do not reintroduce `civilization`, `atmosphere`, or similar high-symbolic words into component names, token names, or folder names.

## Source Notes

- Browser Air Civilization
- Wind = Time
- English-only website
- Homepage hero: Master Sandong writing by the sea
- Mobile should feel breathable and calm
- Windkeep is not a marketplace; it is a passage
- Only use the real Master Sandong
- Generate American model photos for apparel before website use
- Only `谒问东方` and `太和堂` may remain Chinese
- Blue-white wind direction
- Guidance is weather, not prediction
- Only low-frequency motion

## Unified VI System Rules

From `Taoist365-Unified-VI-System.zip`:

- Main background is locked to `#F0F2F5`.
- Text is `#1A1A1A`; secondary text uses `#7F7F7F` / cool grey variants.
- Warm accent is `#B8A487`.
- Typography should use a calm editorial serif: **Cormorant Garamond** or **Playfair Display**.
- Windkeep is not a marketplace; it is a passage.
- Master Sandong must be real; use the writing-by-sea hero image when available.
- Air direction: wind, sea, curtains, light, flower shadows, quiet motion.
- Do not build dashboard UI, spirituality app UI, marketplace UI, or AI chat product UI.
- Build wind, time, breathing pages, low-pressure internet, quiet infrastructure.

## Engineering Translation

### Visual System

- Primary palette should move from warm parchment / wood / cinnabar toward a **blue-white coastal palette**.
- Keep the site quiet, but make it lighter and airier:
  - background: soft off-white with blue undertone
  - surface: translucent white / mist
  - text: blue-gray / charcoal
  - border: pale blue-gray
  - accent: muted sea blue, not gold-first
- Avoid dark mystic, temple, occult, luxury, or heavy ritual color.

Current accepted background direction:

```text
background.canvas: #F0F2F5
background.surface: #FFFFFF
text.primary: #1A1A1A
text.secondary: #4F5963
text.muted: #7F7F7F
brand.goldSoft: #B8A487
border.subtle: #E5E5E5
border.default: #D6DBE1
```

### Wind Palette Sub-Page Components

Source reference: "Reverent Inquiry - Wind Palette Sub-Page Components" image supplied after the Phase 1 zip.

Use this standard for secondary pages such as guidance detail pages, object sub-pages, quiet copy pages, and general inner pages.

```text
page background: #F0F2F5
card / container: #FFFFFF
aged gold detail: #B8A487
subtext / small labels: #7F7F7F
primary heading: #1A1A1A or #2D2D2D
divider / card border: #E5E5E5
```

Component rules:

- Main content should sit inside a large white or near-white card.
- Page background may carry faint wind / cloud / water texture, but it must remain quiet and low contrast.
- Gold is used only as a small detail: icon frame, tiny accent block, price/detail emphasis, or hover state.
- Subtext labels should be small, gray, and non-commanding.
- Cards should use a very soft shadow or fine border, enough to separate from the cool background without looking like app UI.
- Typography should lean serif for headings and main emotional statements; body can remain quiet sans for readability.
- Example centered text rhythm:

```text
Quiet guidance in blue-white air.
Finding the inner quiet again.
```

Primary action / link tone:

```text
Explore inner calm
```

Use it as a soft link style, not a loud CTA button.

Do not:

- use saturated blue panels;
- use dark mystical backgrounds;
- use black-heavy borders;
- use marketplace-style card grids;
- turn gold into a luxury color field.

Older exploratory blue-white token direction, kept only as a reference:

```text
background.canvas: #F7FAFB
background.surface: #FFFFFF
text.primary: #24313A
text.secondary: #5D6D78
text.muted: #8EA0AA
brand.seaBlue: #6F9DB3
brand.windBlue: #BFD8E3
border.subtle: #DDE9EE
border.default: #C9D8DE
```

### Homepage Structure

The homepage should be rebuilt around one clear first impression:

1. Master Sandong writing near the sea.
2. Large breathable hero with very little copy.
3. Blue-white light, wind, paper, sea, and slow time.
4. Secondary navigation below the hero, not competing with the image.
5. Object / guidance / mail areas remain quiet and non-marketplace.

Current mismatch:

- `src/app/(marketing)/page.tsx` has many stacked runtime fragments above the fold.
- The current palette is warm parchment / wood / cinnabar.
- Hero has no Master Sandong seaside image yet.
- Several sections feel like long infrastructure proof rather than a visual landing page.

Target:

- Above the fold should be mostly image, air, title, one short line, and minimal links.
- Move dense runtime strips lower or hide them behind structural absence gates.

### Imagery Rules

- Use only real Master Sandong imagery where Master Sandong is represented.
- For homepage, required asset direction:
  - Master Sandong writing calligraphy near the sea
  - soft blue-white light
  - notebooks / paper / simple objects
  - modern plain linen clothing
  - no fantasy Taoist costume
  - no dark temple mood
- Existing prompt references:
  - `public/Taoist365-Civilization-Assets/02-Master-Sandong/Taoist365-Master-Sandong-World/writing/prompt.txt`
  - `public/Taoist365-Civilization-Assets/02-Master-Sandong/Taoist365-Master-Sandong-World/seaside/prompt.txt`

Implementation requirement:

- Add final homepage hero image under a neutral path such as `public/images/master-sandong-writing-sea.*`.
- Do not ship placeholder AI-looking portrait if the instruction is "real Master Sandong".

### Mobile Rules

- Mobile should feel more breathable than desktop, not compressed.
- Use fewer above-fold fragments on mobile.
- Prefer:
  - one-column hero
  - image first or image + title with generous vertical spacing
  - line lengths under roughly 55 characters
  - large tap targets
  - no stacked micro-notes above the first navigation choice

Current mismatch:

- Homepage currently has many tiny text lines and nested fragments in the opening.

Target:

- Mobile homepage first screen should show:
  - hero image
  - Taoist365 / Reverent Inquiry
  - one sentence
  - 2-4 quiet links

### Guidance UI

Dogdan rule: guidance is **weather, not prediction**.

Engineering rule:

- Guidance copy should describe conditions, tendencies, or current weather-like context.
- Avoid:
  - prophecy
  - fate judgement
  - exact outcomes
  - fortune-telling tone
  - "answer" language that implies authority
- Allowed:
  - "today's weather"
  - "current tendency"
  - "one note"
  - "pause"
  - "ordinary guidance"

### Product / Windkeep Rules

Windkeep is a passage, not a marketplace.

Engineering rule:

- No product grid pressure.
- No cart-first UI.
- No sale badges, countdowns, scarcity, bestseller sorting, or marketplace labels.
- Product pages should feel like named objects inside a passage.
- Apparel should not ship with abstract product renders only; generate or provide American model photos before website use.

### Motion Rules

Dogdan rule: only low-frequency motion.

Current code already partly matches:

- `src/design-system/live-motion/system.ts` forbids bounce, flashy animation, dopamine motion, and logo autoplay.
- `globals.css` veil motion uses long durations.

Implementation target:

- Keep motion slower than typical UI:
  - ambient motion: 70-100s cycles
  - reveal: 700-1500ms
  - hover: minimal lift only
  - no parallax that calls attention to itself
- Motion should feel like wind or time, not animation showcase.

### Language Rules

- Website UI should be English-only.
- Only these Chinese strings are allowed:
  - `谒问东方`
  - `太和堂`
- Current code contains `谒问东方` in `siteConfig.brandCnName`, which is allowed.
- Audit future visible UI for extra Chinese before shipping.

## Current Code Change Plan

### Phase 1: Homepage Visual Reset

Files likely touched:

- `src/app/(marketing)/page.tsx`
- `src/app/globals.css`
- `src/design-system/tokens/colors.ts`
- `src/design-system/surface-tone/system.ts`
- `src/config/site.ts`

Tasks:

1. Add final Master Sandong seaside writing image to `public/images/`.
2. Replace current warm opening with blue-white hero.
3. Reduce opening copy to one short English line.
4. Move runtime residue strips below the first two sections or hide them on mobile.
5. Keep `谒问东方` as permitted Chinese brand anchor.

### Phase 2: Palette + Surface Tokens

Files likely touched:

- `src/app/globals.css`
- `src/design-system/tokens/colors.ts`
- `src/design-system/color-temperature/system.ts`
- `src/design-system/surface-tone/system.ts`

Tasks:

1. Shift root CSS variables to blue-white coastal palette.
2. Keep enough contrast for accessibility.
3. Replace gold/cinnabar as primary feeling with sea-blue / pale-blue.
4. Keep warm accents only as secondary object traces.

### Phase 3: Mobile Breathing Pass

Files likely touched:

- `src/app/(marketing)/page.tsx`
- `src/app/globals.css`
- homepage-specific components used above the fold

Tasks:

1. Reduce mobile first screen density.
2. Increase vertical whitespace around hero and links.
3. Hide low-priority runtime fragments on small screens.
4. Keep links plain and quiet.

### Phase 4: Guidance Weather Pass

Files likely touched:

- `src/components/guidance/**`
- `src/data/guidance-*/**`
- `src/language/tone-copy/**`

Tasks:

1. Replace any prediction-like copy with condition / tendency language.
2. Keep "not prediction" boundary visible where needed.
3. Avoid fortune UI patterns.

### Phase 5: Product / Windkeep Passage Pass

Files likely touched:

- `src/app/objects/**`
- `src/components/commerce/**`
- `src/data/ritual-inventory/system.ts`
- object/product surface components

Tasks:

1. Keep no-cart, no-marketplace framing.
2. Present objects as a passage / quiet catalog, not e-commerce.
3. Add apparel model photo requirements before apparel pages ship.

## Do Not Do

- Do not rename code back to `air-civilization`, `atmosphere-system`, or similar.
- Do not make the homepage feel like a metaphysical manifesto.
- Do not make Windkeep a product grid.
- Do not imply guidance predicts destiny or outcomes.
- Do not use generic AI portraits for Master Sandong if the rule is real Master Sandong.

## Priority Recommendation

Start with **Homepage Visual Reset** only. It has the highest visual impact and the least risk if done as a focused pass:

1. Add / confirm final Master Sandong seaside writing image.
2. Convert palette to blue-white.
3. Simplify first viewport.
4. Keep build passing.

