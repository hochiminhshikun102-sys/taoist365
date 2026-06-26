# Windkeep / Wind Seeker Source Split

This is the operating rule for shared object intake data.

Wind Seeker and Windkeep share the same `object_intakes` pipeline, review queue, media table, AI draft table, and final `objects` publishing path. They do not share identity, entry surface, or member permissions.

## Core rule

Wind Seeker is the professional global buyer network.

Windkeep Supply is the future member-center supply path for members, consignment, referrals, neighbors, and reward programs.

Windkeep members must not be routed into the Wind Seeker buyer upload or buyer product center.

## Source Types

| source_type | identity_scope | entry_surface | supply_program | reward_eligible | Guardrail |
| --- | --- | --- | --- | --- | --- |
| `admin_upload` | `admin` | `admin_os` | `commerce` | false | OA operations upload. |
| `boss_upload` | `admin` | `admin_os` | `commerce` | false | Owner upload. |
| `external_link` | `admin` | `admin_os` | `commerce` | false | Link saved first; parsing later. |
| `supplier_batch` | `supplier` | `admin_os` | `supplier` | false | Supplier material batch. |
| `buyer_upload` | `wind_seeker` | `wind_seeker` | `wind_seeker` | false | Professional buyer only. |
| `windkeep_member` | `windkeep_member` | `member_center` | `windkeep` | true | Future member-center supply entry. |
| `member_consignment` | `windkeep_member` | `member_center` | `windkeep` | true | Future member consignment entry. |
| `neighbor_referral` | `windkeep_referral` | `member_center` | `windkeep` | true | Future friend / neighbor referral entry. |

## Filtering Contract

Wind Seeker buyer pages may show only:

- `source_type = buyer_upload`
- or `supply_program = wind_seeker`

Wind Seeker buyer pages must exclude:

- `entry_surface = member_center`
- `supply_program = windkeep`
- `source_type = windkeep_member`
- `source_type = member_consignment`
- `source_type = neighbor_referral`

Future Windkeep member-center supply pages may show only:

- `entry_surface = member_center`
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

One object pipeline, two identity gates:

- Global buyers use Wind Seeker.
- Members use the member center Windkeep Supply entry.

They meet only at review, object publishing, audit logs, and final `object_id`.
