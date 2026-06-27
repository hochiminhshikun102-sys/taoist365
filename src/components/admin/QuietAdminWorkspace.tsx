"use client";

import { useEffect, useState } from "react";

import type { SlowContentEntry } from "@/config/content-runtime";
import {
  commerceRuntimeReadiness,
  generateAiMediaPlan,
  generateAiProductDraft,
  generateBrowserAirNormalization,
  generateHomepageSuggestions,
  type AiHomepageSuggestion,
  type AiMediaSuggestion,
  type AiProductDraft,
} from "@/config/ai-commerce-runtime";
import {
  aiMaintenanceReviewLines,
  aiOperationsBoundaries,
  aiReadableSiteProfile,
  objectSemanticEntries,
  quietDistributionReviewLines,
  readableReviewLines,
} from "@/config/ai-native-operations";
import {
  archiveQuietShelves,
  driftNoticeLines,
  pressureReviewMarkers,
  terminologyReviewGroups,
} from "@/config/quiet-admin";
import {
  quietCmsBoundaries,
  quietCmsSurfaces,
  quietImageTreatmentLines,
  quietMediaSlots,
  quietMotionDirectionLines,
  quietObjectCollections,
  quietObjectFields,
  quietUploadFlow,
  oneCivilizationCmsRuntime,
} from "@/config/quiet-cms";
import {
  quietCommerceBoundaries,
  quietCommerceHumanReview,
  quietCommerceObservationChecks,
  quietCommerceSupplyContinuity,
  windkeepContinuityRules,
} from "@/config/quiet-commerce";
import {
  quietPlacementBoundaries,
  quietPlacementReviewLines,
  quietPlacementSlots,
} from "@/config/quiet-placement";
import {
  aiProviderReadiness,
  commerceRuntimeLines,
  mediaRuntimeReadiness,
  operationalSuggestionRuntimeLines,
  storageRuntimeLines,
} from "@/config/real-runtime-readiness";

type DraftMap = Record<string, string>;
type LocalMediaDraft = {
  name: string;
  kind: string;
  size: number;
};
type LocalObjectDraft = {
  title: string;
  collection: string;
  price: string;
  stock: string;
  availability: string;
  archiveState: string;
  material: string;
  dimensions: string;
  placement: string;
  atmosphereLine: string;
};
type AiUploadResult = {
  product: AiProductDraft;
  normalization: readonly AiMediaSuggestion[];
  mediaPlan: readonly AiMediaSuggestion[];
  homepage: readonly AiHomepageSuggestion[];
};

const draftKey = "reverent-inquiry-quiet-admin-drafts";
const objectDraftKey = "reverent-inquiry-local-object-drafts";
const emptyObjectDraft: LocalObjectDraft = {
  title: "",
  collection: "wind-objects",
  price: "",
  stock: "1",
  availability: "available",
  archiveState: "active",
  material: "",
  dimensions: "",
  placement: "",
  atmosphereLine: "",
};

function readDrafts(): DraftMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(draftKey);
    return stored ? (JSON.parse(stored) as DraftMap) : {};
  } catch {
    return {};
  }
}

function writeDrafts(drafts: DraftMap) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(draftKey, JSON.stringify(drafts));
}

function readObjectDrafts(): LocalObjectDraft[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(objectDraftKey);
    return stored ? (JSON.parse(stored) as LocalObjectDraft[]) : [];
  } catch {
    return [];
  }
}

function writeObjectDrafts(drafts: readonly LocalObjectDraft[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(objectDraftKey, JSON.stringify(drafts));
}

export function QuietAdminWorkspace({ entries }: Readonly<{ entries: readonly SlowContentEntry[] }>) {
  const [drafts, setDrafts] = useState<DraftMap>(readDrafts);
  const [mediaDraft, setMediaDraft] = useState<LocalMediaDraft | null>(null);
  const [objectDraft, setObjectDraft] = useState<LocalObjectDraft>(emptyObjectDraft);
  const [savedObjects, setSavedObjects] = useState<LocalObjectDraft[]>(readObjectDrafts);
  const [aiPrompt, setAiPrompt] = useState("帮我整理这个物件，价格 39 美元 / Help me prepare this object, priced at $39");
  const [aiResult, setAiResult] = useState<AiUploadResult | null>(null);

  useEffect(() => {
    writeDrafts(drafts);
  }, [drafts]);

  function updateDraft(label: string, value: string) {
    setDrafts((current) => ({ ...current, [label]: value }));
  }

  function updateObjectDraft(key: keyof LocalObjectDraft, value: string) {
    setObjectDraft((current) => ({ ...current, [key]: value }));
  }

  function saveObjectDraft() {
    if (!objectDraft.title.trim()) {
      return;
    }

    const next = [objectDraft, ...savedObjects].slice(0, 24);
    setSavedObjects(next);
    writeObjectDrafts(next);
    setObjectDraft(emptyObjectDraft);
  }

  function runAiUploadHelper() {
    const input = {
      prompt: aiPrompt,
      mediaName: mediaDraft?.name,
      mediaKind: mediaDraft?.kind,
    };
    const product = generateAiProductDraft(input);

    setAiResult({
      product,
      normalization: generateBrowserAirNormalization(input),
      mediaPlan: generateAiMediaPlan(input),
      homepage: generateHomepageSuggestions(input),
    });
    setObjectDraft((current) => ({
      ...current,
      title: product.title,
      collection: product.collection,
      price: product.shipping.match(/\$(\d+)/)?.[1] ?? current.price,
      availability: "available",
      material: product.materials,
      dimensions: product.dimensions,
      placement: product.placement,
      atmosphereLine: product.atmosphereLine,
    }));
  }

  return (
    <div className="space-y-4">
      <section id="cms" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">内容系统 / CMS system</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {quietCmsSurfaces.map((surface) => (
            <div key={surface.id} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs text-foreground">{surface.label}</p>
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">{surface.kind}</p>
              </div>
              <p className="mt-2 text-xs leading-6 text-text-secondary">{surface.use}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted">{surface.pressureLimit}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-2 border-t border-border-subtle/70 pt-3 sm:grid-cols-2">
          {quietCmsBoundaries.map((line) => (
            <p key={line} className="text-[0.66rem] leading-5 text-text-muted/80">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="civilization-runtime" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">One Civilization CMS</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <p className="text-xs text-foreground">Managed together</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {oneCivilizationCmsRuntime.manages.map((item) => (
                <span key={item} className="border border-border-subtle bg-white/58 px-2 py-1 text-[0.64rem] text-text-muted">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Coherence", oneCivilizationCmsRuntime.runtime.coherence.length],
              ["Motion", oneCivilizationCmsRuntime.runtime.motion.length],
              ["Typography", oneCivilizationCmsRuntime.runtime.typography.length],
              ["Image climate", oneCivilizationCmsRuntime.runtime.imageClimate.length],
              ["Video", oneCivilizationCmsRuntime.runtime.video.slots.length],
              ["Sound", oneCivilizationCmsRuntime.runtime.sound.length],
              ["Memory", oneCivilizationCmsRuntime.runtime.memory.quietNotes.length],
              ["Media structure", oneCivilizationCmsRuntime.runtime.mediaStructure.length],
            ].map(([label, count]) => (
              <div key={label as string} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-3">
                <p className="text-xs text-foreground">{label as string}</p>
                <p className="mt-2 text-[0.68rem] leading-5 text-text-muted">{count as number} maintained references</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="collections" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">物件分类 / Object collections</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {quietObjectCollections.map((collection) => (
            <div key={collection.id} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-3">
              <p className="text-xs text-foreground">{collection.name}</p>
              <p className="mt-2 text-xs leading-6 text-text-secondary">{collection.presence}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted">{collection.publicEnergy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="object-schema" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">物件字段 / Object schema</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {quietObjectFields.map((field) => (
            <div key={field.key} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs text-foreground">{field.label}</p>
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">
                  {field.required ? "必填 / needed" : "可选 / optional"}
                </p>
              </div>
              <p className="mt-2 text-xs leading-6 text-text-muted">{field.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="upload" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">上传流程 / Upload flow</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[0.58fr_0.42fr]">
          <div className="space-y-3">
            {quietUploadFlow.map((step) => (
              <div key={step.id} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
                <p className="text-xs text-foreground">{step.label}</p>
                <p className="mt-2 text-xs leading-6 text-text-secondary">{step.action}</p>
                <p className="mt-1 text-[0.68rem] leading-5 text-text-muted">{step.check}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border-subtle/70 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <label htmlFor="quiet-media-draft" className="text-xs text-foreground">
              本地媒体草稿 / Local media draft
            </label>
            <input
              id="quiet-media-draft"
              type="file"
              accept="image/*,video/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setMediaDraft(file ? { name: file.name, kind: file.type || "unknown", size: file.size } : null);
              }}
              className="mt-3 block w-full text-xs text-text-muted file:mr-3 file:border file:border-border-subtle file:bg-white/60 file:px-3 file:py-2 file:text-xs file:text-text-secondary"
            />
            <p className="mt-3 text-[0.68rem] leading-5 text-text-muted">
              这里只读取本浏览器里的文件名，不会上传或发布。This only reads the local file name in this browser. It does not upload or publish.
            </p>
            {mediaDraft ? (
              <div className="mt-4 border-t border-border-subtle/70 pt-3 text-[0.68rem] leading-5 text-text-muted">
                <p>{mediaDraft.name}</p>
                <p>{mediaDraft.kind}</p>
                <p>{Math.max(1, Math.round(mediaDraft.size / 1024))} KB</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="ai-upload" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">AI上传辅助 / AI upload helper</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[0.48fr_0.52fr]">
          <div className="space-y-3">
            <textarea
              value={aiPrompt}
              onChange={(event) => setAiPrompt(event.target.value)}
              rows={4}
              className="w-full resize-y border border-border-subtle bg-white/64 px-3 py-2 text-sm leading-6 text-text-secondary outline-none"
              placeholder="帮我整理这个物件，价格 39 美元 / Help me prepare this object, priced at $39"
            />
            <button
              type="button"
              onClick={runAiUploadHelper}
              className="rounded-lg border border-foreground/12 bg-foreground px-4 py-2 text-sm text-white"
            >
              生成物件草稿 / Generate product draft
            </button>
            <p className="text-[0.68rem] leading-5 text-text-muted">
              现在使用本地运行层。接入密钥和媒体存储后再替换为模型 API。Uses local runtime now. Replace with model API when credentials and media storage are connected.
            </p>
          </div>
          {aiResult ? (
            <div className="space-y-4">
              <div className="rounded-md border border-border-subtle bg-white/58 p-4">
                <p className="text-xs text-foreground">{aiResult.product.title}</p>
                <p className="mt-2 text-xs leading-6 text-text-secondary">{aiResult.product.subtitle}</p>
                <p className="mt-2 text-[0.68rem] leading-5 text-text-muted">{aiResult.product.atmosphereLine}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {aiResult.product.tags.map((tag) => (
                    <span key={tag} className="border border-border-subtle bg-white/62 px-2 py-1 text-[0.64rem] text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Browser Air", aiResult.normalization],
                  ["Media generation", aiResult.mediaPlan],
                ].map(([title, lines]) => (
                  <div key={title as string} className="rounded-md border border-border-subtle bg-white/54 p-4">
                    <p className="text-xs text-foreground">{title as string}</p>
                    <div className="mt-3 space-y-3">
                      {(lines as readonly AiMediaSuggestion[]).map((line) => (
                        <div key={line.label}>
                          <p className="text-[0.68rem] text-text-secondary">{line.label}</p>
                          <p className="mt-1 text-[0.66rem] leading-5 text-text-muted">{line.output}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-md border border-border-subtle bg-white/54 p-4">
                <p className="text-xs text-foreground">首页放置 / Homepage placement</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {aiResult.homepage.map((item) => (
                    <div key={item.surface}>
                      <p className="text-[0.68rem] text-text-secondary">{item.surface}</p>
                      <p className="mt-1 text-[0.66rem] leading-5 text-text-muted">{item.placement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-border-subtle bg-white/54 p-4 text-xs leading-6 text-text-muted">
              添加媒体，写一句说明，然后生成物件草稿。Add media, write one instruction, then generate a product draft.
            </div>
          )}
        </div>
      </section>

      <section id="real-runtime" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">真实运行接口 / Real runtime adapters</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-md border border-border-subtle bg-white/54 p-4">
            <p className="text-xs text-foreground">模型服务 / Model providers</p>
            <div className="mt-3 space-y-3">
              {aiProviderReadiness.map((item) => (
                <div key={item.label} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
                  <p className="text-[0.68rem] text-text-secondary">{item.label}</p>
                  <p className="mt-1 text-[0.66rem] leading-5 text-text-muted">{item.state}</p>
                  <p className="mt-1 text-[0.66rem] leading-5 text-text-muted/80">{item.needs}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-border-subtle bg-white/54 p-4">
            <p className="text-xs text-foreground">媒体运行层 / Media runtime</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {mediaRuntimeReadiness.map((item) => (
                <p key={item.label} className="text-[0.66rem] leading-5 text-text-muted">
                  {item.label} / {item.state}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-border-subtle bg-white/54 p-4">
            <p className="text-xs text-foreground">存储 / Storage</p>
            <div className="mt-3 space-y-2">
              {storageRuntimeLines.map((line) => (
                <p key={line} className="text-[0.66rem] leading-5 text-text-muted">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-border-subtle bg-white/54 p-4">
            <p className="text-xs text-foreground">商业层 / Commerce</p>
            <div className="mt-3 space-y-2">
              {commerceRuntimeLines.map((line) => (
                <p key={line} className="text-[0.66rem] leading-5 text-text-muted">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-2 border-t border-border-subtle/70 pt-3 sm:grid-cols-2">
          {operationalSuggestionRuntimeLines.map((line) => (
            <p key={line} className="text-[0.66rem] leading-5 text-text-muted/80">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="object-cms" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">物件后台 / Object CMS</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[0.56fr_0.44fr]">
          <div className="grid gap-3">
            <input
              value={objectDraft.title}
              onChange={(event) => updateObjectDraft("title", event.target.value)}
              placeholder="物件名称 / Object title"
              className="border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={objectDraft.collection}
                onChange={(event) => updateObjectDraft("collection", event.target.value)}
                className="border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
              >
                {quietObjectCollections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
              <select
                value={objectDraft.availability}
                onChange={(event) => updateObjectDraft("availability", event.target.value)}
                className="border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
              >
                <option value="available">可售 / available</option>
                <option value="limited">少量 / limited</option>
                <option value="made-to-order">预制 / made-to-order</option>
                <option value="unavailable">不可售 / unavailable</option>
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                value={objectDraft.price}
                onChange={(event) => updateObjectDraft("price", event.target.value)}
                placeholder="价格 / Price"
                className="border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
              />
              <input
                value={objectDraft.stock}
                onChange={(event) => updateObjectDraft("stock", event.target.value)}
                placeholder="库存 / Stock"
                className="border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
              />
              <select
                value={objectDraft.archiveState}
                onChange={(event) => updateObjectDraft("archiveState", event.target.value)}
                className="border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
              >
                <option value="active">当前 / active</option>
                <option value="archived">归档 / archived</option>
              </select>
            </div>
            <input
              value={objectDraft.material}
              onChange={(event) => updateObjectDraft("material", event.target.value)}
              placeholder="材质 / Materials"
              className="border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
            />
            <input
              value={objectDraft.dimensions}
              onChange={(event) => updateObjectDraft("dimensions", event.target.value)}
              placeholder="尺寸 / Dimensions"
              className="border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
            />
            <textarea
              value={objectDraft.placement}
              onChange={(event) => updateObjectDraft("placement", event.target.value)}
              rows={3}
              placeholder="摆放位置 / Placement"
              className="resize-y border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
            />
            <textarea
              value={objectDraft.atmosphereLine}
              onChange={(event) => updateObjectDraft("atmosphereLine", event.target.value)}
              rows={3}
              placeholder="空气感文案 / Atmosphere line"
              className="resize-y border border-border-subtle bg-white/64 px-3 py-2 text-sm outline-none"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={saveObjectDraft}
                className="rounded-lg border border-foreground/12 bg-foreground px-4 py-2 text-sm text-white"
              >
                保存本地物件 / Save local object
              </button>
              <button
                type="button"
                onClick={() =>
                  setObjectDraft((current) => ({
                    ...current,
                    atmosphereLine: current.atmosphereLine || "A quiet object that can sit near ordinary light.",
                    placement: current.placement || "Desk, shelf, sill, or table where it can be reached without display pressure.",
                  }))
                }
                className="rounded-lg border border-border-subtle bg-white/60 px-4 py-2 text-sm text-text-secondary"
              >
                AI建议一句 / AI suggest line
              </button>
            </div>
          </div>
          <div className="border-t border-border-subtle/70 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <p className="text-xs text-foreground">已保存本地物件 / Saved local objects</p>
            <div className="mt-3 space-y-3">
              {savedObjects.length === 0 ? (
                <p className="text-xs leading-6 text-text-muted">还没有本地物件草稿 / No local object drafts yet.</p>
              ) : (
                savedObjects.map((item, index) => (
                  <button
                    key={`${item.title}-${index}`}
                    type="button"
                    onClick={() => setObjectDraft(item)}
                    className="block w-full border-t border-border-subtle/70 pt-3 text-left first:border-t-0 first:pt-0"
                  >
                    <span className="block text-xs text-foreground">{item.title}</span>
                    <span className="mt-1 block text-[0.68rem] leading-5 text-text-muted">
                      {item.collection} / {item.availability} / stock {item.stock}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="media-library" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">媒体库 / Media library</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {quietMediaSlots.map((slot) => (
            <div key={slot.id} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs text-foreground">{slot.label}</p>
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">{slot.accepts.join(" / ")}</p>
              </div>
              <p className="mt-2 text-xs leading-6 text-text-secondary">{slot.use}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted">{slot.restraint}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-4 border-t border-border-subtle/70 pt-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-foreground">图片处理 / Image treatment</p>
            <div className="mt-3 space-y-2">
              {quietImageTreatmentLines.map((line) => (
                <p key={line} className="text-[0.68rem] leading-5 text-text-muted">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-foreground">动效表面 / Motion surfaces</p>
            <div className="mt-3 space-y-2">
              {quietMotionDirectionLines.map((line) => (
                <p key={line} className="text-[0.68rem] leading-5 text-text-muted">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="drafts" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">慢文案检查 / Slow text review</p>
        <div className="mt-4 space-y-4">
          {entries.map((entry) => {
            const value = drafts[entry.label] ?? entry.present;

            return (
              <div key={entry.label} className="border-t border-border-subtle/70 pt-4 first:border-t-0 first:pt-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-foreground">{entry.label}</p>
                    <p className="mt-1 text-[0.68rem] leading-5 text-text-muted/80">{entry.note}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateDraft(entry.label, entry.present)}
                    className="shrink-0 text-[0.68rem] leading-5 text-text-muted hover:text-text-secondary"
                  >
                    使用当前文案 / Use present line
                  </button>
                </div>
                <textarea
                  value={value}
                  onChange={(event) => updateDraft(entry.label, event.target.value)}
                  rows={3}
                  className="mt-3 w-full resize-y border border-border-subtle bg-white/52 px-3 py-2 text-sm leading-6 text-text-secondary outline-none transition-colors focus:border-border-default"
                />
                <p className="mt-2 text-[0.68rem] leading-5 text-text-muted">附近文案 / Still nearby: {entry.nearby}</p>
                <p className="mt-1 text-[0.68rem] leading-5 text-text-muted/75">只留在这个浏览器 / Left in this browser.</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="qa" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">压力备注 / Pressure notes</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pressureReviewMarkers.map((marker) => (
            <p key={marker} className="border-l border-border-subtle/70 pl-3 text-xs leading-6 text-text-muted">
              {marker}
            </p>
          ))}
        </div>
      </section>

      <section id="terms" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">术语分组 / Term groups</p>
        <div className="mt-4 space-y-4">
          {terminologyReviewGroups.map((group) => (
            <div key={group.title} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
              <p className="text-xs text-foreground">{group.title}</p>
              <p className="mt-2 text-xs leading-6 text-text-muted">{group.risk}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted/80">附近说法 / Nearby: {group.nearby}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="archive" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">归档架 / Archive shelf</p>
        <div className="mt-4 space-y-3">
          {archiveQuietShelves.map((line) => (
            <p key={line} className="text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="review" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">漂移备注 / Drift notes</p>
        <div className="mt-4 space-y-3">
          {driftNoticeLines.map((line) => (
            <p key={line} className="text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="placement" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">摆放房间 / Placement room</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {quietPlacementSlots.map((slot) => (
            <div key={slot.id} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs text-foreground">{slot.label}</p>
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">{slot.cadence}</p>
              </div>
              <p className="mt-2 text-xs leading-6 text-text-muted">{slot.note}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted/80">
                {slot.where} / {slot.replaceBy}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-2 border-t border-border-subtle/70 pt-3 sm:grid-cols-2">
          {[...quietPlacementBoundaries, ...quietPlacementReviewLines].map((line) => (
            <p key={line} className="text-[0.66rem] leading-5 text-text-muted/80">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="ai-readable" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">AI可读备注 / AI-readable notes</p>
        <p className="mt-3 text-xs leading-6 text-text-secondary">{aiReadableSiteProfile.plainSummary}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {aiOperationsBoundaries.map((line) => (
            <p key={line} className="border-l border-border-subtle/70 pl-3 text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="readable-review" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">可读性检查 / Readable review</p>
        <div className="mt-4 space-y-3">
          {readableReviewLines.map((line) => (
            <p key={line} className="text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="object-semantics" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">物件语义 / Object semantics</p>
        <div className="mt-4 space-y-4">
          {objectSemanticEntries.slice(0, 5).map((entry) => (
            <div key={entry.id} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
              <p className="text-xs text-foreground">{entry.name}</p>
              <p className="mt-1 text-[0.68rem] leading-5 text-text-muted">{entry.anchor}</p>
              <p className="mt-2 text-xs leading-6 text-text-secondary">{entry.plainKind}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quiet-commerce" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">安静商业 / Quiet commerce</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["Boundaries", quietCommerceBoundaries],
            ["Human", quietCommerceHumanReview],
            ["Supply", quietCommerceSupplyContinuity],
            ["Observe", quietCommerceObservationChecks],
            ["Windkeep", windkeepContinuityRules],
          ].map(([title, lines]) => (
            <div key={title as string} className="border-t border-border-subtle/70 pt-3 first:border-t-0 first:pt-0">
              <p className="text-xs text-foreground">{title as string}</p>
              <div className="mt-3 space-y-2">
                {(lines as readonly string[]).map((line) => (
                  <p key={line} className="text-[0.68rem] leading-5 text-text-muted">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="commerce-runtime" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">商业运行层 / Commerce runtime</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {commerceRuntimeReadiness.map((line) => (
            <p key={line} className="border-l border-border-subtle/70 pl-3 text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section id="readable-references" className="rounded-lg border border-border-subtle/80 bg-white/48 px-4 py-4">
        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-text-muted">可读参考 / Readable references</p>
        <div className="mt-4 space-y-3">
          {[...aiMaintenanceReviewLines, ...quietDistributionReviewLines].map((line) => (
            <p key={line} className="text-xs leading-6 text-text-muted">
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
