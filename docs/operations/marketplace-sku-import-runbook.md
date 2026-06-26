# Marketplace SKU Import Runbook

This is the first import path for 100+ marketplace SKU batches across domestic and overseas platforms.

## Current Scope

The first version imports source links into the new-goods commerce pipeline.

It does:

- Create one `object_intake` per source link.
- Set `source_type=external_link`.
- Auto-detect `source_platform` when possible.
- Support `taobao`, `tmall`, `1688`, `pdd`, `xianyu`, `tiktok`, `temu`, `amazon`, `etsy`, `shopify`, and `other`.
- Set `commerce_channel=commerce_new` and `goods_condition=new` for new-goods marketplaces.
- Set `commerce_channel=windkeep_secondhand` and `goods_condition=preowned` for Xianyu by default.
- Set `media_rights_status=reference_only`.
- Set `media_transform_required=true`.
- Generate a local AI draft placeholder.
- Submit the intake to the publish review queue.
- Write audit logs.

It does not yet:

- Log into Taobao.
- Scrape or download protected Taobao media.
- Treat third-party source images as publish-ready assets.
- Rewrite images with real AI beautification.
- Auto-publish without human review.

## OA Entry

Use:

```txt
/admin/product-intake
```

Paste one source per line.

Supported formats:

```txt
https://item.taobao.com/item.htm?id=...
https://mobile.yangkeduo.com/goods.html?goods_id=...
https://2.taobao.com/item.htm?id=...
Handmade ceramic vase    https://www.etsy.com/listing/...    $48
```

Tabs are preferred between title, URL, and price. Plain URLs are also accepted.

## Platform Defaults

| Platform | Default channel | Notes |
| --- | --- | --- |
| Taobao | `commerce_new` | New-goods commerce source reference. |
| Tmall | `commerce_new` | New-goods commerce source reference. |
| 1688 | `commerce_new` | Supplier/new-goods source reference. |
| Pinduoduo | `commerce_new` | New-goods commerce source reference. |
| Xianyu | `windkeep_secondhand` | Windkeep secondhand source reference. |
| TikTok | `commerce_new` | New-goods commerce source reference. |
| Temu | `commerce_new` | New-goods commerce source reference. |
| Amazon | `commerce_new` | New-goods commerce source reference. |
| Etsy | `commerce_new` | New-goods commerce source reference. |
| Shopify | `commerce_new` | New-goods commerce source reference. |

## Next Air Engine Step

The next implementation should attach a processing job to each imported intake:

```txt
source_link_imported
-> media_fetch_pending
-> original_media_saved
-> air_engine_processing
-> generated main/detail/scene/mobile/pc/social/motion
-> review_ready
```

This keeps Taobao source import, product image beautification, and OA publish review on the same object pipeline.

## Rights Rule

Taobao images are source references, not final VL product assets. Before publication, final images must be rebuilt, replaced by owned media, or transformed through RI/Air Engine with human review.
