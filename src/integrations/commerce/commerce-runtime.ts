import type { QuietCartItem } from "@/lib/quiet-cart";

export type CommerceRuntimeProvider = "stripe" | "mail-handoff" | "local-order";
export type OrderState = "draft" | "requested" | "payment-pending" | "paid" | "packing" | "sent" | "archived";

export type CommerceOrderInput = {
  items: readonly QuietCartItem[];
  email?: string;
  shippingRegion?: string;
  note?: string;
};

export type CommerceOrderRecord = {
  provider: CommerceRuntimeProvider;
  id: string;
  state: OrderState;
  amountCents: number;
  paymentUrl?: string;
  mailHref?: string;
  notes: readonly string[];
};

export type CommerceRuntimeAdapter = {
  provider: CommerceRuntimeProvider;
  label: string;
  createOrder(input: CommerceOrderInput): Promise<CommerceOrderRecord>;
};

function amountFor(input: CommerceOrderInput) {
  return input.items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
}

function orderId(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export const localOrderRuntimeAdapter: CommerceRuntimeAdapter = {
  provider: "local-order",
  label: "Local order request",
  async createOrder(input) {
    return {
      provider: "local-order",
      id: orderId("T365"),
      state: "requested",
      amountCents: amountFor(input),
      notes: ["Stored in browser until a payment provider is connected."],
    };
  },
};

export const mailHandoffRuntimeAdapter: CommerceRuntimeAdapter = {
  provider: "mail-handoff",
  label: "Mail handoff",
  async createOrder(input) {
    const id = orderId("MAIL");
    const lines = input.items.map((item) => `${item.quantity} x ${item.title}`);

    return {
      provider: "mail-handoff",
      id,
      state: "requested",
      amountCents: amountFor(input),
      mailHref: `mailto:hello@taoist365.com?subject=${encodeURIComponent(`Order request ${id}`)}&body=${encodeURIComponent(lines.join("\n"))}`,
      notes: ["Human reply confirms payment and shipping."],
    };
  },
};

export const stripeRuntimeReadiness = [
  "Stripe adapter: create payment session from item ids and quantities.",
  "Order state: draft, requested, payment-pending, paid, packing, sent, archived.",
  "Shipping regions: plain availability by region before payment.",
  "Mail handoff: remains available for questions and edge cases.",
  "Archive state: unavailable objects remain visible without scarcity pressure.",
] as const;
