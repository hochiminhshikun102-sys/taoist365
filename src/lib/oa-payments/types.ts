export type PaymentWorkbenchStatus =
  | "awaiting_capture"
  | "settling"
  | "refund_queue"
  | "recon_queue"
  | "risk_hold";

export type PaymentsWorkbenchViewState =
  | "ready"
  | "loading"
  | "empty"
  | "failed"
  | "not_connected"
  | "auth_required"
  | "permission_denied"
  | "provider_unavailable"
  | "demo";

export type OaPaymentRecord = {
  row_key: string;
  order_id: string;
  order_number: string;
  payment_status: string;
  source_payment_status: string;
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
  amount_known: boolean;
  intent_known: boolean;
  provider_known: boolean;
  refund_amount_known: boolean;
  settlement_known: boolean;
  risk_known: boolean;
};
