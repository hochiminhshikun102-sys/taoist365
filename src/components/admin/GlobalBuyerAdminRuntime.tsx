"use client";

import { useEffect, useMemo, useState } from "react";
import {
  afterSalesCases,
  buyerOrders,
  buyerProducts,
  depositRecords,
  globalBuyerDepositPolicy,
  riskRows,
  settlementRows,
  type BuyerCaseStatus,
} from "@/config/global-buyer-center";
import type { AdminWorkspaceId } from "@/components/admin/AdminOSConsole";

type AdminRow = Record<string, string | number>;
const applicationStorageKey = "ri-global-buyer-applications";

type StoredApplication = {
  id: string;
  name: string;
  email: string;
  country: string;
  category: string;
  status: string;
  submittedAt: string;
};

function readStoredApplications(): AdminRow[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(applicationStorageKey);
    const applications = stored ? (JSON.parse(stored) as StoredApplication[]) : [];
    return applications.map((item) => ({
      id: item.id,
      buyer: item.name,
      type: "Onboarding Application",
      identity: item.email,
      deposit: `${globalBuyerDepositPolicy.onboardingDepositLabel} Pending`,
      risk: "Pending",
      status: item.status,
      country: item.country,
      category: item.category,
      submittedAt: item.submittedAt.slice(0, 19),
    }));
  } catch {
    return [];
  }
}

const moduleMap: Partial<Record<AdminWorkspaceId, { title: string; eyebrow: string; rows: readonly AdminRow[]; actions: string[]; metrics: string[] }>> = {
  "wind-seeker-approval": {
    eyebrow: "Buyer Review",
    title: "买手审核中心",
    rows: [
      { id: "BA-1024", buyer: "Wind Seeker", type: "入驻申请", identity: "证件通过", deposit: `${globalBuyerDepositPolicy.onboardingDepositLabel} 已缴纳`, risk: "低", status: "待人工复核" },
      { id: "BA-1025", buyer: "Clara Journal", type: "实名认证", identity: "人脸待核验", deposit: `${globalBuyerDepositPolicy.onboardingDepositLabel} 待缴纳`, risk: "中", status: "待处理" },
      { id: "BA-1026", buyer: "Atelier Yuki", type: "地址验证", identity: "证件通过", deposit: "冻结 $80", risk: "低", status: "复核中" },
    ],
    actions: ["通过入驻", "驳回", "标记风控", "查看保证金"],
    metrics: ["入驻申请 18", "实名认证待核 6", `保证金 ${globalBuyerDepositPolicy.onboardingDepositLabel}`, "风控标记 2"],
  },
  "ai-product-moderation": {
    eyebrow: "Product Review",
    title: "商品审核中心",
    rows: buyerProducts.map((item) => ({ id: item.id, product: item.title, ai: "AI 预审通过", tone: "调性匹配 92%", ip: "未命中侵权", violation: "无违禁", status: item.status })),
    actions: ["人工通过", "驳回修改", "侵权标记", "查看AI报告"],
    metrics: ["AI预审 32", "人工复核 9", "侵权疑似 1", "调性不符 3"],
  },
  "buyer-risk-dashboard": {
    eyebrow: "Risk",
    title: "买手风控看板",
    rows: riskRows.map((item) => ({ id: item.id, buyer: item.buyer, signal: item.signal, score: item.score, state: item.state, note: item.note })),
    actions: ["冻结账户", "扣除保证金", "解除限制", "写入审计"],
    metrics: ["异常上架 3", "虚假发货 1", "纠纷率 4.2%", "扣除记录 2"],
  },
  "wind-seeker-settlement": {
    eyebrow: "Settlement",
    title: "买手结算管理",
    rows: settlementRows.map((item) => ({ id: item.id, order: item.order, gross: item.gross, fee: item.fee, tax: item.tax, commission: item.commission, state: item.state })),
    actions: ["提现审核", "冻结款项", "税费复核", "导出账单"],
    metrics: ["待结算 $1,268", "可提现 $2,680", "服务费 $386", "税费 $88"],
  },
  "buyer-deposit-runtime": {
    eyebrow: "Deposit",
    title: "保证金管理",
    rows: depositRecords.map((item) => ({ id: item.id, type: item.type, amount: item.amount, state: item.state, time: item.time, note: item.note })),
    actions: ["确认缴纳", "申请退还", "扣除明细", "风控联动"],
    metrics: [`入驻固定 ${globalBuyerDepositPolicy.onboardingDepositLabel}`, "待缴 4", "冻结 $480", "扣除 $92"],
  },
  "shipping-runtime": {
    eyebrow: "Shipping",
    title: "发货与物流审核",
    rows: buyerOrders.map((item) => ({ id: item.id, product: item.product, buyer: item.buyer, amount: item.amount, state: item.state, deadline: item.deadline, tracking: item.tracking || "待录入" })),
    actions: ["标记发货", "录入单号", "异常预警", "查看轨迹"],
    metrics: ["待发货 5", "异常 1", "超时风险 2", "模板 3"],
  },
  "refund-runtime": {
    eyebrow: "Refund",
    title: "退款处理",
    rows: afterSalesCases.map((item) => ({ id: item.id, type: item.type, product: item.product, amount: item.amount, status: item.status, reason: item.reason, evidence: item.evidence })),
    actions: ["同意退款", "拒绝", "协商", "上传凭证"],
    metrics: ["待处理 2", "协商中 1", "已退款 12", "手续费 $38"],
  },
  "wind-seeker-account": {
    eyebrow: "Account",
    title: "买手账号与安全",
    rows: [
      { id: "AC-01", buyer: "Wind Seeker", realName: "已实名", phone: "已绑定", payout: "PayPal", device: "2 台", risk: "低" },
      { id: "AC-02", buyer: "Clara Journal", realName: "待人脸", phone: "已绑定", payout: "银行卡", device: "1 台", risk: "中" },
    ],
    actions: ["重置密码", "管理设备", "提现账户审核", "隐私设置"],
    metrics: ["实名通过 82", "待人脸 7", "提现账户待审 5", "登录预警 1"],
  },
  "wind-seeker-drafts": {
    eyebrow: "Drafts",
    title: "买手草稿箱",
    rows: [
      { id: "DR-01", product: "复古手工陶瓷花瓶", buyer: "Wind Seeker", state: "草稿中", step: "补充信息", updated: "2026-05-18" },
      { id: "DR-02", product: "手工编织披肩", buyer: "Wind Seeker", state: "被驳回", step: "重新编辑", updated: "2026-05-17" },
    ],
    actions: ["继续编辑", "删除", "批量删除", "重新提交"],
    metrics: ["草稿中 14", "已提交 8", "被驳回 3", "可恢复 2"],
  },
  "wind-seeker-notifications": {
    eyebrow: "Notifications",
    title: "买手消息通知设置",
    rows: [
      { id: "NT-01", type: "订单提醒", channel: "站内 + 邮件", quiet: "22:00-08:00", state: "开启" },
      { id: "NT-02", type: "审核结果", channel: "站内", quiet: "无", state: "开启" },
      { id: "NT-03", type: "风控预警", channel: "站内 + 短信", quiet: "无", state: "开启" },
    ],
    actions: ["开启", "关闭", "编辑免打扰", "发送测试"],
    metrics: ["订单提醒 开", "审核通知 开", "售后通知 开", "风控预警 开"],
  },
};

moduleMap["after-sales-center"] = {
  eyebrow: "After-Sales",
  title: "买手售后总控",
  rows: afterSalesCases.map((item) => ({ id: item.id, type: item.type, product: item.product, amount: item.amount, status: item.status, reason: item.reason, evidence: item.evidence })),
  actions: ["同意", "拒绝", "协商方案", "上传凭证"],
  metrics: ["退款申请 8", "退货申请 4", "纠纷协商 3", "待处理 2"],
};
moduleMap["after-sales-requests"] = moduleMap["after-sales-center"];
moduleMap["refunds-runtime"] = moduleMap["refund-runtime"];
moduleMap["after-sales-tracking"] = moduleMap["shipping-runtime"];
moduleMap["settlement-runtime"] = moduleMap["wind-seeker-settlement"];
moduleMap["finance-settlement"] = moduleMap["wind-seeker-settlement"];
moduleMap["finance-overview"] = moduleMap["wind-seeker-settlement"];
moduleMap["partner-settlement"] = moduleMap["wind-seeker-settlement"];
moduleMap["deposit-runtime"] = moduleMap["buyer-deposit-runtime"];
moduleMap["audit-runtime"] = moduleMap["buyer-risk-dashboard"];
moduleMap["risk-runtime"] = moduleMap["buyer-risk-dashboard"];
moduleMap["wind-seeker-risk-runtime"] = moduleMap["buyer-risk-dashboard"];
moduleMap["aml-kyc-runtime"] = moduleMap["wind-seeker-approval"];

export function isGlobalBuyerAdminWorkspace(id: AdminWorkspaceId) {
  return Boolean(moduleMap[id]);
}

export function GlobalBuyerAdminRuntime({ workspaceId }: Readonly<{ workspaceId: AdminWorkspaceId }>) {
  const module = moduleMap[workspaceId];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("全部");
  const [drawer, setDrawer] = useState<AdminRow | null>(null);
  const [logs, setLogs] = useState<string[]>(["模块初始化", "读取买手业务队列"]);
  const [storedApplications, setStoredApplications] = useState<AdminRow[]>([]);

  useEffect(() => {
    setStoredApplications(readStoredApplications());
  }, []);

  const sourceRows = workspaceId === "wind-seeker-approval" ? [...storedApplications, ...(module?.rows ?? [])] : (module?.rows ?? []);

  const rows = useMemo(() => {
    if (!module) return [];
    return sourceRows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()));
  }, [module, query, sourceRows]);

  if (!module) return null;
  const columns = Object.keys(sourceRows[0] ?? {});

  function writeLog(message: string) {
    setLogs((current) => [`${new Date().toLocaleString()} · ${message}`, ...current].slice(0, 8));
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <section className="rounded-3xl border border-[#D9DCE0] bg-white p-6 shadow-[0_18px_50px_rgba(45,51,58,0.12)]">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#D9DCE0] pb-5">
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-[#6B7280]">{module.eyebrow}</p>
            <h2 className="mt-2 text-4xl font-semibold text-[#2D333A]">{module.title}</h2>
          </div>
          <button type="button" onClick={() => writeLog("新建业务记录")} className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm text-white">新建记录</button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {module.metrics.map((metric) => <div key={metric} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4"><p className="text-lg font-semibold">{metric}</p></div>)}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索买手 / 商品 / 订单 / 状态" className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm outline-none focus:border-[#947A66]" />
          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-sm outline-none focus:border-[#947A66]">
            {["全部", "待处理", "复核中", "已完成", "风险"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <button type="button" onClick={() => writeLog(`导出 ${filter} 数据`)} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-sm">导出</button>
        </div>

        <div className="mt-5 overflow-auto rounded-2xl border border-[#D9DCE0]">
          <table className="w-full min-w-[88rem] border-collapse text-left text-sm">
            <thead className="bg-[#EBEDEF] text-[#6B7280]">
              <tr>{columns.map((column) => <th key={column} className="whitespace-nowrap border-b border-[#D9DCE0] px-3 py-3">{column}</th>)}<th className="whitespace-nowrap border-b border-[#D9DCE0] px-3 py-3">操作</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={String(row.id)}>
                  {columns.map((column) => <td key={column} className="whitespace-nowrap border-b border-[#D9DCE0] px-3 py-3">{String(row[column])}</td>)}
                  <td className="border-b border-[#D9DCE0] px-3 py-3">
                    <div className="flex min-w-max flex-nowrap gap-2">
                      {module.actions.map((action) => <button key={action} type="button" onClick={() => { setDrawer(row); writeLog(`${action}: ${row.id}`); }} className="rounded-lg border border-[#D9DCE0] bg-white px-3 py-2 text-xs hover:border-[#947A66]">{action}</button>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="grid gap-5 content-start">
        <section className="rounded-3xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.1)]">
          <p className="text-sm text-[#6B7280]">抽屉 / 详情</p>
          <h3 className="mt-2 text-2xl font-semibold">{drawer ? `记录 ${drawer.id}` : "未选择记录"}</h3>
          {drawer ? <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-[#EBEDEF] p-4 text-xs">{JSON.stringify(drawer, null, 2)}</pre> : <p className="mt-4 text-sm leading-6 text-[#6B7280]">点击表格中的操作后，这里会显示审核、处理、风控、结算等详情。</p>}
          {drawer ? <textarea className="mt-4 min-h-28 w-full rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-3 text-sm outline-none" placeholder="处理意见 / 审计备注" /> : null}
          {drawer ? <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={() => writeLog(`确认处理 ${drawer.id}`)} className="rounded-xl bg-[#947A66] px-3 py-3 text-sm text-white">确认处理</button><button onClick={() => setDrawer(null)} className="rounded-xl border border-[#D9DCE0] bg-white px-3 py-3 text-sm">关闭</button></div> : null}
        </section>

        <section className="rounded-3xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.1)]">
          <p className="text-sm text-[#6B7280]">日志 / Logs</p>
          <div className="mt-4 grid gap-3">
            {logs.map((log) => <p key={log} className="rounded-xl bg-[#EBEDEF] p-3 text-sm">{log}</p>)}
          </div>
        </section>
      </aside>
    </div>
  );
}
