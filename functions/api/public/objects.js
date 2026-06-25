import { json, readStore } from "../../_object-intake.js";

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const objectId = url.searchParams.get("object_id");
  const includeTests = url.searchParams.get("include_tests") === "1";
  const store = await readStore(context.env);
  const published = store.objects.filter((item) => item.status === "published");

  if (objectId) {
    const object = published.find((item) => item.object_id === objectId || item.slug === objectId);
    if (!object) return json({ error: "Object not found." }, 404);
    return json({ object });
  }

  const rows = includeTests ? published : published.filter((item) => !isSmokeTestObject(item));
  return json({ rows });
}

function isSmokeTestObject(object) {
  const title = String(object.title || "");
  return /^test\s*-/i.test(title) || /^测试\s*-/i.test(title) || /^codex-.*smoke/i.test(String(object.intake_id || ""));
}
