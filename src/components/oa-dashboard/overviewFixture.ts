export const overviewFixture = {
  data_source: 'TEST_ONLY_UI_FIXTURE' as const,
  not_formal_provider: true,
  kpis: [
    { label: 'GMV · 成交额', value: '$128,450', delta: '+6.2%', source: 'TEST_ONLY', as_of: '2026-10-12' },
    { label: 'Orders · 订单数', value: '1,842', delta: '+3.1%', source: 'TEST_ONLY', as_of: '2026-10-12' },
    { label: 'AOV · 客单价', value: '$69.70', delta: '+1.4%', source: 'TEST_ONLY', as_of: '2026-10-12' },
    { label: 'Refund Rate · 退款率', value: '2.1%', delta: '-0.3%', source: 'TEST_ONLY', as_of: '2026-10-12' },
  ],
  trend: [
    { d: '10-06', v: 42 },
    { d: '10-07', v: 55 },
    { d: '10-08', v: 48 },
    { d: '10-09', v: 61 },
    { d: '10-10', v: 58 },
    { d: '10-11', v: 70 },
    { d: '10-12', v: 66 },
  ],
  heat: [
    { region: 'US', sales: '$42.1k' },
    { region: 'EU', sales: '$31.8k' },
    { region: 'JP', sales: '$18.4k' },
    { region: 'SEA', sales: '$15.2k' },
  ],
  channels: [
    { channel: 'TikTok', spend: '$8.2k', gmv: '$22.4k', roas: '2.73', status: 'active' },
    { channel: 'Instagram', spend: '$5.1k', gmv: '$14.0k', roas: '2.75', status: 'active' },
    { channel: 'Facebook', spend: '$4.4k', gmv: '$9.8k', roas: '2.23', status: 'watch' },
    { channel: 'YouTube', spend: '$3.0k', gmv: '$7.1k', roas: '2.37', status: 'active' },
    { channel: 'Google', spend: '$6.6k', gmv: '$16.5k', roas: '2.50', status: 'active' },
  ],
  influencers: [
    { name: 'Creator A', platform: 'TikTok', status: 'live', gmv: '$4.2k' },
    { name: 'Creator B', platform: 'Instagram', status: 'scheduled', gmv: '$1.1k' },
  ],
  organic: { sessions: '48.2k', orders: '612', conversion_rate: '1.27%' },
  risks: [
    { level: 'amber', title: 'Inventory low · 库存偏低', as_of: '10:12' },
    { level: 'amber', title: 'Refund spike watch · 退款波动观察', as_of: '09:40' },
  ],
  tasks: [
    { title: 'Review intake batch · 审核入库批次', due: 'Today' },
    { title: 'Confirm payout exception · 确认结算异常', due: 'Today' },
  ],
  regions: [
    { code: 'US', status: 'healthy', gmv: '$42.1k', orders: 612 },
    { code: 'EU', status: 'watch', gmv: '$31.8k', orders: 480 },
    { code: 'JP', status: 'healthy', gmv: '$18.4k', orders: 266 },
  ],
  ranking: [
    { rank: 1, title: 'Tea Set A · 茶具组合A', units: 312, gmv: '$9.4k' },
    { rank: 2, title: 'Incense B · 线香B', units: 280, gmv: '$6.1k' },
    { rank: 3, title: 'Book C · 典籍C', units: 190, gmv: '$4.8k' },
  ],
};
