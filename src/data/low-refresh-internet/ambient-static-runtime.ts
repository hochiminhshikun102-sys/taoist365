export type AmbientStaticRuntime = {
  ambientStaticLine: string;
};

export function resolveAmbientStaticRuntime(): AmbientStaticRuntime {
  return { ambientStaticLine: "静态氛围是默认，不是加载失败。" };
}
