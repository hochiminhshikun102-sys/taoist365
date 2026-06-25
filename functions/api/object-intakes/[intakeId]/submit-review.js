import { createAuditLog, intakeStatuses, json, makeId, nowIso, updateStore } from "../../../_object-intake.js";

export async function onRequestPost(context) {
  const { intakeId } = context.params;
  let queueItem = null;
  let missing = false;

  await updateStore(context.env, (store) => {
    const intake = store.objectIntakes.find((item) => item.id === intakeId);
    if (!intake) {
      missing = true;
      return store;
    }

    const now = nowIso();
    const before = { ...intake };
    const after = { ...intake, status: intakeStatuses.REVIEW_PENDING, updated_at: now };
    queueItem = {
      id: makeId("review"),
      intake_id: intakeId,
      assigned_admin: "",
      review_status: "pending",
      review_notes: "",
      risk_level: "low",
      created_at: now,
      updated_at: now,
    };

    return {
      ...store,
      objectIntakes: store.objectIntakes.map((item) => (item.id === intakeId ? after : item)),
      objectReviewQueue: [queueItem, ...store.objectReviewQueue.filter((item) => item.intake_id !== intakeId)],
      adminAuditLogs: [
        createAuditLog("submitted_review", "object_intake", intakeId, before, after, "Object intake entered unified review queue."),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Intake not found." }, 404);
  return json({ review: queueItem, status: intakeStatuses.REVIEW_PENDING }, 201);
}
