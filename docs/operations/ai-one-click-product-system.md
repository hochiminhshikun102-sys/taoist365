# AI One-Click Product System

This is the working structure for AI-assisted product onboarding.

It is not a single upload button. It is one product pipeline:

```txt
source input
-> object_intake
-> source rights marker
-> AI product draft
-> Air Engine media processing
-> human review
-> publish object_id
-> commerce product page
```

## Source Inputs

| Source | source_type | source_platform | Media policy |
| --- | --- | --- | --- |
| OA manual upload | `admin_upload` | `manual` | Owned or manually uploaded media can be reviewed directly. |
| Boss upload | `boss_upload` | `manual` | Owned or manually uploaded media can be reviewed directly. |
| Domestic marketplace link | `external_link` | `taobao` / `tmall` / `1688` / `pdd` | Source media is reference-only. It must be rebuilt, replaced, or transformed before publication. |
| Xianyu secondhand link | `windkeep_external_link` | `xianyu` | Windkeep secondhand source reference. Source media is reference-only and must be rebuilt or replaced. |
| Overseas marketplace link | `external_link` | `tiktok` / `temu` / `amazon` / `etsy` / `shopify` | Source media is reference-only. It must be rebuilt, replaced, or transformed before publication. |
| Wind Seeker buyer upload | `buyer_upload` | `manual` / `other` | Buyer-shot media enters review and RI media standards. |
| Supplier batch | `supplier_batch` | `manual` / `other` | Supplier media needs rights confirmation and RI media standards. |
| Windkeep member supply | `windkeep_member` / `member_consignment` / `neighbor_referral` | `manual` | Secondhand continuity channel, not new-goods commerce. |

## External Link Rule

For Taobao, Tmall, 1688, Pinduoduo, Xianyu, TikTok, Temu, Amazon, Etsy, Shopify, and similar product links:

- The link is a source reference.
- Original third-party images are not publish-ready assets.
- Imported rows must be marked `media_rights_status=reference_only`.
- Imported rows must be marked `media_transform_required=true`.
- The Air Engine must rebuild, replace, or transform final product media before listing.

## Air Engine Tasks

The media pipeline should eventually create these outputs:

| Output | media_type | Purpose |
| --- | --- | --- |
| Original source archive | `original` | Reference and audit only. |
| White product image | `main` | Product page, object card, AI composition base. |
| Detail image | `detail` | Material, texture, closeup. |
| Scene image | `scene` | Lifestyle and story use. |
| PC image | `pc` | Desktop product display. |
| Mobile image | `mobile` | Mobile product display. |
| Social image | `social` | Social share and campaign use. |
| Short video | `motion` | Product hero or atmosphere video. |

## MVP Rule

The first version should not wait for real scraping or real AI beautification.

It should:

- Import 100+ Taobao links.
- Create new-goods intakes.
- Generate AI draft placeholders.
- Mark source media as reference-only.
- Submit to review.
- Reserve Air Engine status for media rebuilding.

Then the next layer can attach real media fetch, image generation, beautification, and compliance review.

## Phase 1 Build Target

The first construction step is the data capture layer from the workflow diagram:

```txt
Input sources
-> automatic fetch job
-> data cleaning
-> basic information structure
-> Air Engine job queue
```

For Taobao SKU import, every imported link should create:

- `object_intake`
- `object_ai_draft`
- `object_review_queue` item
- `airEngineJobs` item with `job_type=source_fetch_and_rebuild`

The job queue is intentionally separate from the final AI image generator. This lets operations import 100+ SKUs now while the real beautification runner is connected later.

## Platform Defaults

| Platform | Default channel |
| --- | --- |
| Taobao / Tmall / 1688 / Pinduoduo | `commerce_new` |
| TikTok / Temu / Amazon / Etsy / Shopify | `commerce_new` |
| Xianyu | `windkeep_secondhand` |
| Other | `commerce_new` unless manually changed |
