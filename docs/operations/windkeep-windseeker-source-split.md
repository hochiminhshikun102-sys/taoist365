# Windkeep / Wind Seeker Source Split

This is the operating rule for shared object intake data.

Wind Seeker and Windkeep share the same `object_intakes` pipeline, review queue, media table, AI draft table, and final `objects` publishing path. They do not share channel, identity, entry surface, or page runtime.

## Core rule

Wind Seeker is the professional global buyer network for new-goods commerce.

Windkeep Supply is the future secondhand continuity path for members, consignment, referrals, neighbors, and reward programs.

Think of the split as Tmall / Xianyu style: shared company infrastructure, separate market channel and page experience.

## Source Types

| source_type | commerce_channel | goods_condition | identity_scope | entry_surface | supply_program | reward_eligible |
| --- | --- | --- | --- | --- | --- | --- |
| `admin_upload` | `commerce_new` | `new` | `admin` | `admin_os` | `commerce` | false |
| `boss_upload` | `commerce_new` | `new` | `admin` | `admin_os` | `commerce` | false |
| `external_link` | `commerce_new` | `new` | `admin` | `admin_os` | `commerce` | false |
| `supplier_batch` | `commerce_new` | `new` | `supplier` | `admin_os` | `supplier` | false |
| `buyer_upload` | `commerce_new` | `new` | `wind_seeker` | `wind_seeker` | `wind_seeker` | false |
| `windkeep_member` | `windkeep_secondhand` | `preowned` | `windkeep_member` | `member_center` | `windkeep` | true |
| `member_consignment` | `windkeep_secondhand` | `preowned` | `windkeep_member` | `member_center` | `windkeep` | true |
| `neighbor_referral` | `windkeep_secondhand` | `preowned` | `windkeep_referral` | `member_center` | `windkeep` | true |

## Channel Contract

New-goods commerce pages use:

- `commerce_channel = commerce_new`
- `goods_condition = new`

Windkeep secondhand pages use:

- `commerce_channel = windkeep_secondhand`
- `goods_condition = preowned`
- `supply_program = windkeep`

## Future Member Center Entry

The reserved member-center entry is defined in `src/config/object-intake-source-types.ts` as `futureMemberCenterSupplyEntry`.

Planned route:

```txt
/account/windkeep-supply
```

The first implementation should submit into the same API:

```txt
POST /api/object-intakes
```

with one of:

```txt
source_type = windkeep_member
source_type = member_consignment
source_type = neighbor_referral
```

## Acceptance Rule

One object pipeline, two market channels:

- Global buyers use Wind Seeker for new-goods commerce.
- Members use Windkeep Supply for secondhand continuity.

They meet only at review, object publishing, audit logs, and final `object_id`.
