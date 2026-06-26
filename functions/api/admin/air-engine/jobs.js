import { json, readStore } from "../../../_object-intake.js";

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get("status") || "all";
  const jobType = url.searchParams.get("job_type") || "";
  const store = await readStore(context.env);

  let rows = [...(store.airEngineJobs || [])].sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
  if (status !== "all") rows = rows.filter((job) => job.status === status);
  if (jobType) rows = rows.filter((job) => job.job_type === jobType);

  return json({
    rows,
    counts: {
      all: store.airEngineJobs?.length || 0,
      pending: (store.airEngineJobs || []).filter((job) => job.status === "pending").length,
      processing: (store.airEngineJobs || []).filter((job) => job.status === "processing").length,
      ready: (store.airEngineJobs || []).filter((job) => job.status === "ready").length,
      failed: (store.airEngineJobs || []).filter((job) => job.status === "failed").length,
    },
    storage: context.env.OBJECT_INTAKE_KV ? "OBJECT_INTAKE_KV" : "memory-preview",
  });
}
