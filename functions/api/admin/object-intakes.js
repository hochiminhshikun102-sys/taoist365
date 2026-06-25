import { json, latestAiDraft, mediaForIntake, publicUrlForMedia, readStore } from "../../_object-intake.js";

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get("status");
  const intakeId = url.searchParams.get("intake_id");
  const store = await readStore(context.env);

  if (intakeId) {
    const intake = store.objectIntakes.find((item) => item.id === intakeId);
    if (!intake) return json({ error: "Intake not found." }, 404);
    return json(enrichIntake(store, intake));
  }

  let rows = [...store.objectIntakes].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  if (status && status !== "all") rows = rows.filter((row) => row.status === status);

  return json({
    rows: rows.map((intake) => enrichIntake(store, intake)),
    storage: context.env.OBJECT_INTAKE_KV ? "OBJECT_INTAKE_KV" : "memory-preview",
  });
}

function enrichIntake(store, intake) {
  const media = mediaForIntake(store, intake.id);
  const draft = latestAiDraft(store, intake.id);
  const review = store.objectReviewQueue.find((item) => item.intake_id === intake.id) || null;
  const publishedObject = store.objects.find((item) => item.intake_id === intake.id) || null;
  const primary = media.find((item) => item.media_type === "main") || media[0] || null;

  return {
    intake,
    media,
    draft,
    review,
    object: publishedObject,
    thumbnail_url: publicUrlForMedia(primary),
    audit_logs: store.adminAuditLogs.filter((item) => item.target_id === intake.id).slice(0, 20),
  };
}
