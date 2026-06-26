# RI Real Asset System

This is the locked source-of-truth for real product media. All product intake, Wind Seeker, Product Runtime, Windkeep, homepage, AI Atmosphere, and Quiet Story Grid assets should follow these sizes whenever possible.

RI does not rely on sharpness alone. The operating standard is light, air, whitespace, breath, wind, and real presence.

## Locked Sizes

| Asset type | Size | Ratio | Use |
| --- | ---: | ---: | --- |
| White object image | 2400 x 2400 px | 1:1 | Product Page, Objects, Windkeep, Quiet Receiving, Nearby Objects, AI Atmosphere composition, Global Buyer |
| Room scene | 2400 x 1600 px | 3:2 | Placed in Life, Homepage, Browser Air, Atmosphere, Product Story, Hero Object Atmosphere |
| Mobile atmosphere | 1600 x 2400 px | 2:3 | Mobile Hero, Mobile Sections, Browser Room, Quiet Layer |
| Hero image | 3200 x 1800 px | 16:9 | Hero Atmosphere, Windkeep Hero, Product Hero |
| Detail image | 1800 x 2400 px | 3:4 | Quiet Story Grid, Material Layer, Texture Layer |
| AI Atmosphere output | 2400 x 1600 px | 3:2 | Final AI atmosphere image across surfaces |
| Browser Air video | 1920 x 1080 px | 16:9 | Lightweight muted loop video |

## White Object Rules

- Background must be pure white or very light gray-white.
- Avoid heavy shadow, hard reflection, and Taobao-style product rendering.
- Product must have enough whitespace and must not touch or crowd the frame.
- White object images are the universal base for cropping, overlay, detail pages, Windkeep, and AI composition.

## Scene Rules

- Room scenes must be horizontal.
- Prefer real western living spaces: desk, bedside, window, linen, wood, air, and natural light.
- Avoid stiff staging and crowded arrangements.

## Air Engine Rules

- Pure white object images are adjusted into RI low-saturation healing tonality.
- Non-white backgrounds that do not match RI tonality are replaced with compliant backgrounds.
- Cropped product edges are completed so the product remains whole.

## Folder Taxonomy

Use this taxonomy for local source packs, R2 prefixes, and operator notes:

```text
RI_REAL_ASSETS/
  WHITE_OBJECTS/
  ROOM_SCENES/
  DETAILS/
  MOBILE_VERTICAL/
  HERO/
  AI_ATMOSPHERE/
  PACKAGING/
  REAL_LIFE/
  TEXTURES/
```
