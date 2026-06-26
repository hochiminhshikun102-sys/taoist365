import { createAuditLog, json, nowIso, updateStore } from "../../../../_object-intake.js";

const allowedStatuses = new Set(["pending", "processing", "ready", "failed"]);

export async function onRequestPatch(context) {
  const { jobId } = context.params;
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid Air Engine job payload." }, 400);
  }

  const nextStatus = String(payload.status || "").trim();
  if (!allowedStatuses.has(nextStatus)) return json({ error: "Invalid Air Engine job status." }, 400);

  let updatedJob = null;
  let missing = false;
  const now = nowIso();
  const actorId = String(payload.actor_id || "admin-os").trim();
  const note = String(payload.note || `Air Engine job moved to ${nextStatus}.`).trim();

  await updateStore(context.env, (store) => {
    const job = (store.airEngineJobs || []).find((item) => item.id === jobId);
    if (!job) {
      missing = true;
      return store;
    }

    const beforeJob = { ...job };
    updatedJob = {
      ...job,
      status: nextStatus,
      notes: note || job.notes || "",
      updated_at: now,
      completed_at: nextStatus === "ready" || nextStatus === "failed" ? now : job.completed_at || "",
    };

    const beforeIntake = store.objectIntakes.find((item) => item.id === job.intake_id) || null;
    const nextAirStatus = nextStatus === "ready" ? "ready" : nextStatus === "failed" ? "failed" : nextStatus;
    const nextIntake = beforeIntake
      ? {
          ...beforeIntake,
          air_engine_status: nextAirStatus,
          updated_at: now,
        }
      : null;

    return {
      ...store,
      airEngineJobs: (store.airEngineJobs || []).map((item) => (item.id === jobId ? updatedJob : item)),
      objectIntakes: nextIntake ? store.objectIntakes.map((item) => (item.id === nextIntake.id ? nextIntake : item)) : store.objectIntakes,
      adminAuditLogs: [
        createAuditLog("air_engine_job_updated", "air_engine_job", jobId, beforeJob, updatedJob, note, actorId),
        ...(nextIntake ? [createAuditLog("air_engine_status_synced", "object_intake", nextIntake.id, beforeIntake, nextIntake, `Air Engine status synced to ${nextAirStatus}.`, actorId)] : []),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Air Engine job not found." }, 404);
  return json({ job: updatedJob });
}
