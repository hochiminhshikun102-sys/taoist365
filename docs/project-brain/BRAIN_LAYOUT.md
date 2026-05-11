# Project brain layout (ACTIVE vs ARCHIVE)

**Purpose:** Reduce “infinite manifesto sprawl” while keeping history. This file is the **taxonomy**, not a physical move of every note.

## ACTIVE (still steer shipped behavior)

- `README.md` — bootstrap + runtime field index  
- `memory-protocol.md` — hierarchy when docs disagree  
- `terminology-governance.md` / `terminology-governance-runtime.md` — locks & naming  
- `decisions-log.md` — what actually shipped  
- `runtime-anti-reactivation.md` — runtime copy / reserve drift  
- `symbolic-anti-reactivation.md` — internal symbol blacklist  
- **`repository-anti-recontamination.md`** — folder / module naming governance  
- `next-steps.md` — current engineering priority  

## ARCHIVE-CLASS (historical / critique / completed phases)

Everything else under `docs/project-brain/**` default bucket:

- **Critique-only:** `anti-*`, `life-scale`, `micro-atmosphere`, `anti-sacred-*` titles — describe what **not** to build; they do **not** authorize new symbolic runtime.  
- **Completed purge logs:** references in `decisions-log.md` supersede scattered phase notes in export docs (`docs/export/*`).  
- **Philosophy density:** long-form “civilization temperature” essays — read for intent, not as implementation checklist.

### Rule

If a brain doc **conflicts** with `src/` behavior, **`decisions-log.md` + `memory-protocol.md` win**. Archive-class files are **non-blocking** unless promoted into ACTIVE via an explicit decision entry.
