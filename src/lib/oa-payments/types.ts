export type PaymentWorkbenchStatus =
  | "awaiting_capture"
  | "settling"
  | "refund_queue"
  | "recon_queue"
  | "risk_hold";

export type OaPaymentRecord = {
  order_id: string;
  order_number: string;
  payment_status: string;
  payment_provider: string;
  payment_intent_ref: string;
  currency: string;
  amount_minor: number;
  refund_status: string;
  refund_amount_minor: number;
  settlement_status: string;
  risk_status: string;
  updated_at: string;
  queue_tags: PaymentWorkbenchStatus[];
};
