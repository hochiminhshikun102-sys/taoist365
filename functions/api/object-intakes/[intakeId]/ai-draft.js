import { createAuditLog, intakeStatuses, json, makeId, makeProductDraft, nowIso, updateStore } from "../../../_object-intake.js";

export async function onRequestPost(context) {
  const { intakeId } = context.params;
  let created = null;
  let missing = false;

  await updateStore(context.env, (store) => {
    const intake = store.objectIntakes.find((item) => item.id === intakeId);
    if (!intake) {
      missing = true;
      return store;
    }

    const now = nowIso();
    const draft = {
      id: makeId("draft"),
      intake_id: intakeId,
      ...makeProductDraft(intake),
      created_at: now,
      updated_at: now,
    };
    const before = { ...intake };
    const after = {
      ...intake,
      status: intakeStatuses.AI_DRAFT_READY,
      air_engine_status: intake.air_engine_status === "not_started" ? "pending" : intake.air_engine_status,
      updated_at: now,
    };
    created = draft;

    return {
      ...store,
      objectIntakes: store.objectIntakes.map((item) => (item.id === intakeId ? after : item)),
      objectAiDrafts: [draft, ...store.objectAiDrafts.filter((item) => item.intake_id !== intakeId)],
      adminAuditLogs: [
        createAuditLog("ai_draft_generated", "object_intake", intakeId, before, after, "AI product draft generated with local fallback runtime."),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Intake not found." }, 404);
  return json({ draft: created, status: intakeStatuses.AI_DRAFT_READY }, 201);
}
