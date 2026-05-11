# Memory Protocol

## QUICK CONTEXT BOOTSTRAP

- Governance for Taoist365 **project brain**: when to write memory, how decisions flow, and how humans and AI stay aligned on the **Taoist-inspired lifestyle guidance system**.
- Stops **emotional continuity** breaks, duplicate philosophy, and silent rewrites—`memory-protocol.md` plus `decisions-log.md` anchor what is settled.
- Brain docs outrank chat conclusions; code outranks undocumented AI speculation.
- Read this before large edits; update it only when governance itself changes.

## THIS DOCUMENT DEFINES

Long-term memory maintenance rules: update triggers, precedence, thread startup, collaboration norms, propagation, bans, vocabulary, and runtime doc duties.

## CORE PRINCIPLES

- One coherent **quiet ritual atmosphere** across docs and product; **low-signal humanity** and **ritual calm** are constraints, not optional tone.
- Memory is proactive maintenance, not an archive of every brainstorm—prefer small, dated, factual deltas.
- **Breathable interfaces** and deterministic runtime rules are part of identity; they are not “implementation details” that can drift without brain updates.

## SYSTEM DETAILS

### When project memory must be updated

Update `docs/project-brain/` **before or with** code, never only in chat:

- **Shipped behavior** changes (new routes, new runtime bundle fields, new gates, voice shifts).
- **New runtime module** or meaningful change to resolution rules in `src/data/*runtime*`.
- **Guidance** flow, copy posture, or fragmentation rules change.
- **Structural silence** / absence behavior or page-energy semantics change.
- **Permanent boundary** moves (e.g. allowing something previously forbidden)—rare; requires explicit human decision and `decisions-log.md`.

Do **not** wait for “later cleanup”: if it affects how the site feels or behaves across days, it belongs in brain or log.

### File priority hierarchy

When sources disagree, resolve in this order:

1. `memory-protocol.md` (governance and process)
2. `README.md` (folder role and index)
3. `decisions-log.md` (what shipped; append-only facts)
4. Domain specs: `architecture.md`, `runtime-systems.md`, `guidance-system.md`, `world-aging-inertia.md`, `low-signal-humanity.md`
5. `next-steps.md` (intent and backlog—not a substitute for 1–4)
6. Runtime **code** in `src/data/*` and **components** in `src/app`, `src/components`
7. Informal notes, chat, and unmerged ideas

If code and brain conflict, treat it as a **bug or debt**: either fix code or update brain and log after explicit decision—not “whatever landed last.”

### Thread startup protocol

For every new AI or human thread doing non-trivial work:

1. Read **`memory-protocol.md`** (this file) and **`README.md`**.
2. Skim **`decisions-log.md`** for boundaries already settled.
3. Open the **domain file** that matches the task (`runtime-systems.md`, `guidance-system.md`, etc.).
4. Only then read or edit application code.

Optional but high value: skim **`next-steps.md`** to align with current stabilization priorities.

### AI collaboration rules

- Treat project brain as **source of intent**; do not invent a parallel “product vision” in chat.
- **Quote or cite** brain files when proposing behavior that touches identity, runtime, or guidance—reduces silent drift.
- Prefer **minimal diffs**: one clear change, one clear doc touch, one `decisions-log` entry when behavior ships.
- If uncertain whether something violates **quiet ritual atmosphere** or **low-signal humanity**, stop and check `guidance-system.md`, `low-signal-humanity.md`, and `world-aging-inertia.md` before implementing.
- Do not “modernize,” “gamify,” or “optimize engagement” without explicit human direction that updates brain and log.

### Decision propagation rules

| Event | Action |
|--------|--------|
| Decision **approved** for implementation | Update relevant domain doc(s); implement; append **`decisions-log.md`** with date and scope. |
| Decision **deferred** | Note in **`next-steps.md`** only; do not pretend it is shipped in domain specs. |
| Decision **reversed** | New **`decisions-log.md`** entry stating reversal; update domain docs to remove stale claims; do not delete history—append. |
| Field / bundle API change | **`runtime-systems.md`** + consuming sections in **`architecture.md`** or **`guidance-system.md`** as needed. |
| Process / hierarchy change | **`memory-protocol.md`** (+ **`README.md`** if index or order changes). |

Propagating only in chat or only in code counts as **no propagation**.

### Forbidden behaviors

- Redesigning IA, guidance, or runtime **without** reading brain and updating docs.
- Duplicating full **philosophy essays** across files—link to **`README.md`** / domain docs; keep each file’s **THIS DOCUMENT DEFINES** unique.
- Introducing **conflicting definitions** of the same bundle field or route behavior in two docs—pick one home (`runtime-systems.md` for fields).
- Shipping **chatbot**, **SaaS dashboard**, **personalization**, **feeds**, or **fake archive** patterns (see **`decisions-log.md`** permanent boundaries).
- Using **randomness** or **per-user** state for “liveness” that breaks day-determinism and static export.
- Marking absence or silence as **errors**, **loading**, or **bugs**—absence is a designed maturity signal when driven by runtime.

### Terminology consistency rules

Use these phrases consistently across brain and PR descriptions (not necessarily in every sentence):

- **Taoist-inspired lifestyle guidance system** — product framing for Taoist365.
- **quiet ritual atmosphere** — spatial/emotional goal.
- **low-signal humanity** — anonymous residue layer; not characters or community.
- **emotional continuity** — same-day and cross-page coherence.
- **ritual calm** — non-coercive, non-performative pacing.
- **breathable interfaces** — spacing, restraint, readable quiet.

Avoid near-synonyms that imply a different product (e.g. “wellness app,” “AI companion,” “community,” “feed”). Technical names (`useWorldRuntime`, bundle ids) must match **`runtime-systems.md`**.

### Runtime documentation rules

- Any **new** bundle section, field, or cross-cutting gate must appear in **`runtime-systems.md`** before or with merge.
- **`architecture.md`** holds **where** runtime meets UI (routes, key components), not a second full field encyclopedia.
- **`world-aging-inertia.md`** and **`low-signal-humanity.md`** hold **meaning** and voice constraints for those layers; **`runtime-systems.md`** holds the **inventory**.
- When precedence between bundles is non-obvious, add a note in **`runtime-systems.md`** or **`next-steps.md`** conflict-matrix work—do not leave it tribal knowledge.

## MAINTENANCE NOTES

- Review this file when onboarding a new collaborator or when AI threads repeatedly misread hierarchy.
- If `README.md` file index grows, ensure **`memory-protocol.md`** stays listed and that hierarchy section here stays in sync.
- Governance changes are rare: edit **`memory-protocol.md`**, add a dated line to **`decisions-log.md`** if the change affects how decisions are recorded or what is forbidden.
