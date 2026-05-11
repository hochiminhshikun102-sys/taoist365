export type AmbientPermanenceRuntime = {
  ambientPermanenceLine: string;
};

export function resolveAmbientPermanenceRuntime(): AmbientPermanenceRuntime {
  return {
    ambientPermanenceLine: "氛围层默认常驻背景，不抢当日主声。",
  };
}
