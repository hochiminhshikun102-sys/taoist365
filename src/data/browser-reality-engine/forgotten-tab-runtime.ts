import { dailyIndex } from "@/lib/living-day-key";

export type ForgottenTabRuntime = {
  forgottenButAliveLine: string;
};

export function resolveForgottenTabRuntime(dayKey: string): ForgottenTabRuntime {
  void dailyIndex(`${dayKey}:ftab`, 30);
  return {
    forgottenButAliveLine: "忘了关的标签还在——不算在线，也不算离线。",
  };
}
