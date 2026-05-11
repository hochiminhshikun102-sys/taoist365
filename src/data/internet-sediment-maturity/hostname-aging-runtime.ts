import { siteConfig } from "@/config/site";

export type HostnameAgingRuntime = {
  hostnameAgingLine: string;
};

export function resolveHostnameAgingRuntime(): HostnameAgingRuntime {
  return {
    hostnameAgingLine: `${siteConfig.domain} 像用旧的钥匙扣——磨损在习惯上。`,
  };
}
