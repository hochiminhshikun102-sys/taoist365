export type AmbientRevisitThickness = {
  revisitThicknessLine: string;
};

export function resolveAmbientRevisitThickness(): AmbientRevisitThickness {
  return { revisitThicknessLine: "偶发重见同一句，是周期不是提醒。" };
}
