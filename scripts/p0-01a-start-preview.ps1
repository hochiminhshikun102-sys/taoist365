#Requires -Version 5.1
# P0-01A: start Cloudflare Pages Functions Preview.
# Never bind Production KV/R2. Never deploy.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$outDir = Join-Path $root "docs\security\preview-static"
if (-not (Test-Path $outDir)) {
  throw "Missing docs/security/preview-static/. P0-01A uses this isolated marker page, not the full site out/."
}

$persist = Join-Path $root ".preview-state"
New-Item -ItemType Directory -Force -Path $persist | Out-Null

if (Test-Path (Join-Path $root "wrangler.toml")) {
  throw "Refusing to start: wrangler.toml present. P0-01A must use CLI local KV/R2 only."
}

Write-Host "P0-01A Preview Functions"
Write-Host "DOHARA_RUNTIME_ENV=preview"
Write-Host "persist-to=$persist"
Write-Host "PRODUCTION_DEPLOY=FALSE"
Write-Host "Using local simulated KV/R2. Not Production."

& npx --yes wrangler pages dev $outDir `
  --compatibility-date=2026-06-25 `
  --ip=127.0.0.1 `
  --port=8788 `
  --kv=OBJECT_INTAKE_KV `
  --r2=OBJECT_MEDIA_BUCKET `
  --persist-to=$persist `
  --binding="DOHARA_RUNTIME_ENV=preview" `
  --binding="DOHARA_PREVIEW_ISOLATION=TRUE" `
  --show-interactive-dev-session=false
