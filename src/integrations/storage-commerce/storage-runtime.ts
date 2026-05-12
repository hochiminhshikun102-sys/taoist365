export type StorageRuntimeProvider = "cloudflare-r2" | "s3-compatible" | "distributed-media" | "local-preview";

export type StorageAssetIntent = {
  objectId: string;
  fileName: string;
  contentType: string;
  purpose: "source" | "normalized" | "generated" | "motion";
};

export type StorageAssetRecord = {
  provider: StorageRuntimeProvider;
  key: string;
  publicUrl?: string;
  uploadUrl?: string;
  status: "prepared" | "uploaded" | "published";
};

export type StorageRuntimeAdapter = {
  provider: StorageRuntimeProvider;
  label: string;
  prepareUpload(intent: StorageAssetIntent): Promise<StorageAssetRecord>;
};

function safeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
}

export const localStorageRuntimeAdapter: StorageRuntimeAdapter = {
  provider: "local-preview",
  label: "Local preview storage",
  async prepareUpload(intent) {
    const key = [intent.purpose, intent.objectId, safeFileName(intent.fileName)].join("/");

    return {
      provider: "local-preview",
      key,
      status: "prepared",
    };
  },
};

export const storageRuntimeReadiness = [
  "Cloudflare R2: signed upload URL, normalized public asset URL, cache headers.",
  "S3-compatible: bucket, region, public base URL, private source retention.",
  "Distributed media: immutable source reference, generated derivative references.",
  "Local preview: browser-only draft until a storage provider is connected.",
] as const;
