import { createAuditLog, intakeStatuses, json, nowIso, updateStore } from "../../../../_object-intake.js";

const actionToStatus = {
  approve: intakeStatuses.APPROVED,
  reject: intakeStatuses.REJECTED,
  revision_required: intakeStatuses.REVISION_REQUIRED,
};

export async function onRequestPatch(context) {
  const { intakeId } = context.params;
  let payload = {};
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid review payload." }, 400);
  }

  const action = String(payload.action || "").trim();
  const nextStatus = actionToStatus[action];
  if (!nextStatus) {
    return json({ error: "Review action must be approve, reject, or revision_required." }, 400);
  }

  let updated = null;
  let missing = false;

  await updateStore(context.env, (store) => {
    const intake = store.objectIntakes.find((item) => item.id === intakeId);
    if (!intake) {
      missing = true;
      return store;
    }

    const now = nowIso();
    const before = { ...intake };
    const after = { ...intake, status: nextStatus, updated_at: now };
    updated = after;
    const note = String(payload.review_notes || payload.note || "").trim();
    const riskLevel = String(payload.risk_level || "low").trim();

    return {
      ...store,
      objectIntakes: store.objectIntakes.map((item) => (item.id === intakeId ? after : item)),
      objectReviewQueue: store.objectReviewQueue.map((item) =>
        item.intake_id === intakeId
          ? {
              ...item,
              assigned_admin: String(payload.assigned_admin || item.assigned_admin || "admin-os"),
              review_status: action === "approve" ? "approved" : action,
              review_notes: note,
              risk_level: riskLevel,
              updated_at: now,
            }
          : item,
      ),
      adminAuditLogs: [
        createAuditLog(`review_${action}`, "object_intake", intakeId, before, after, note || `Review action: ${action}`),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Intake not found." }, 404);
  return json({ intake: updated, status: updated.status });
}
