# Taobao SKU Import Runbook

This is the first commerce import path for the 100+ Taobao SKU batch.

## Current Scope

The first version imports source links into the new-goods commerce pipeline.

It does:

- Create one `object_intake` per source link.
- Set `source_type=external_link`.
- Set `source_platform=taobao` by default.
- Set `commerce_channel=commerce_new`.
- Set `goods_condition=new`.
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
Handmade ceramic vase    https://item.taobao.com/item.htm?id=...    $48
```

Tabs are preferred between title, URL, and price. Plain URLs are also accepted.

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
