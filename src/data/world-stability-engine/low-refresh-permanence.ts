export type LowRefreshPermanence = {
  lowRefreshPermanenceLine: string;
};

export function resolveLowRefreshPermanence(): LowRefreshPermanence {
  return {
    lowRefreshPermanenceLine: "低刷新是长期设定，不是临时省流量。",
  };
}
