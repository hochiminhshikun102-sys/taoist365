export type PassiveRuntimeAging = {
  passiveAgingLine: string;
};

export function resolvePassiveRuntimeAging(): PassiveRuntimeAging {
  return {
    passiveAgingLine: "runtime 也会变老：表达变薄，位置靠后。",
  };
}
