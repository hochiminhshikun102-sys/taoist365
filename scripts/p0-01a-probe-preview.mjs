/**
 * P0-01A Preview probe. Records status / storage / headers only.
 * Does not print PII, source_url, emails, or full row bodies.
 */
const base = process.env.P0_01A_PREVIEW_BASE || "http://127.0.0.1:8788";

const paths = [
  "/api/public/objects",
  "/api/admin/object-intakes",
  "/api/admin/objects",
  "/api/admin/orders",
  "/api/admin/air-engine/jobs",
];

function summarize(path, status, headers, bodyText) {
  let storage = null;
  let rowCount = null;
  let parse = "not-json";
  try {
    const data = JSON.parse(bodyText);
    parse = "json";
    storage = data.storage ?? null;
    if (Array.isArray(data.rows)) rowCount = data.rows.length;
  } catch {
    parse = bodyText.trim().startsWith("<") ? "html" : "other";
  }
  return {
    path,
    status,
    contentType: headers.get("content-type") || "",
    cacheControl: headers.get("cache-control") || "",
    runtimeEnv: headers.get("x-dohara-runtime-env") || "",
    parse,
    storage,
    rowCount,
    bodyChars: bodyText.length,
  };
}

const results = [];
for (const path of paths) {
  const response = await fetch(`${base}${path}`, { headers: { "cache-control": "no-store" } });
  const bodyText = await response.text();
  results.push(summarize(path, response.status, response.headers, bodyText));
}

const report = {
  batch: "P0-01A",
  base,
  probedAt: new Date().toISOString(),
  productionDeploy: false,
  results,
};
console.log(JSON.stringify(report, null, 2));
