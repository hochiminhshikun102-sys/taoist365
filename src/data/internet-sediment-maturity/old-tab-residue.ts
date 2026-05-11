export type OldTabResidue = {
  oldTabResidueLine: string;
};

export function resolveOldTabResidue(): OldTabResidue {
  return { oldTabResidueLine: "旧 tab 的残留是地址和版式，不是任务列表。" };
}
