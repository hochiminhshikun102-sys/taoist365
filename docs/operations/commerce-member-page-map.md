# Commerce / Windkeep / Wind Seeker Page Map

This is the current page map for the object commerce MVP and related member / buyer surfaces.

## Frontstage Commerce

| Level | Route | Purpose |
| --- | --- | --- |
| L1 | `/objects` | Published objects and product list. |
| L2 | `/objects/[objectId]` | Published object detail page. |
| L1 | `/collections` | Collection index. |
| L2 | `/collections/[collectionId]` | Collection detail. |
| L1 | `/search` | Search surface. |
| L1 | `/cart` | Cart. |
| L1 | `/order` | Checkout / order request. |

## OA Commerce Runtime

| Level | Route | Purpose |
| --- | --- | --- |
| L1 | `/admin` | Admin OS entry. |
| L2 | `/admin/product-intake` | Product intake entry. |
| L2 | `/admin/product-media` | Asset and product media center. |
| L2 | `/admin/publish-review` | Shared object review and publish queue. |
| L2 | `/admin/objects` | Published object management. |
| L2 | `/admin/orders` | Order queue and fulfillment operations. |

## Wind Seeker

| Level | Route | Purpose |
| --- | --- | --- |
| L1 | `/wind-seeker-intro` | Global buyer recruitment / introduction. |
| L1 | `/wind-seeker` | Professional buyer center. |
| L2 | `/wind-seeker/upload` | Professional buyer object upload. |
| L2 | `/wind-seeker/products` | Professional buyer object list. |
| L3 | `/wind-seeker/products/detail?intakeId=...` | Professional buyer new-goods intake status. Static-export compatible. |

## Account / Windkeep Supply

| Level | Route | Purpose |
| --- | --- | --- |
| L1 | `/account` | Buyer member center shell. |
| L2 | `/account/objects` | Reserved member object state. |
| L2 | `/account/orders` | Reserved member order state. |
| L2 | `/account/rewards` | Reserved levels, discounts, referral, and rebate state. |
| L2 | `/account/windkeep-supply` | Member supply / consignment / referral intake. |
| L3 | `/account/windkeep-supply/detail?intakeId=...` | Member secondhand continuity intake status. Static-export compatible. |

## Identity Rule

All supply sources enter `object_intakes`, but market channels and page runtimes are separated:

- `buyer_upload` uses Wind Seeker and `commerce_channel=commerce_new`.
- `windkeep_member`, `member_consignment`, and `neighbor_referral` use Account / Windkeep Supply and `commerce_channel=windkeep_secondhand`.

They meet only in OA review, object publishing, audit logs, and final `object_id`.
