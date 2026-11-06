import type { OrderStage, OrdersTab } from "./order-types";

export type StepState = "done" | "now" | "todo";

export const ORDER_STEPS = ["accepted", "confirmed", "road", "received"] as const;
export const ORDERS_TABS: OrdersTab[] = ["all", "active", "done", "cancel"];

export const STAGE_TONE: Record<OrderStage, string> = {
  accepted: "bg-[#FFF2F4] text-[#C0092A]",
  confirmed: "bg-[#EEF6F0] text-[#1E5E34]",
  road: "bg-[#E8F1FF] text-[#1F4E9C]",
  finished: "bg-[#F2F2F2] text-[#5C5C5C]",
  received: "bg-[#EEF6F0] text-[#1E5E34]",
  cancelled: "bg-[#F2F2F2] text-[#5C5C5C]",
};

// Where each stage sits on the four-step line; stages missing here draw no line (a cancelled order went nowhere).
const POSITION: Partial<Record<OrderStage, number>> = { accepted: 0, confirmed: 1, road: 2, received: 4 };

export const stepStates = (stage: OrderStage): StepState[] | null => {
  const position = POSITION[stage];
  if (position === undefined) return null;
  return ORDER_STEPS.map((_, index) => (index < position ? "done" : index === position ? "now" : "todo"));
};

export const parseTab = (value: string | undefined): OrdersTab =>
  ORDERS_TABS.includes(value as OrdersTab) ? (value as OrdersTab) : "all";
