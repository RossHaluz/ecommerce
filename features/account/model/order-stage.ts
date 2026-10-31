import type { OrderStage, OrdersTab } from "./order-types";

export type StepState = "done" | "now" | "todo";

export const ORDER_STEPS = ["accepted", "confirmed", "road", "received"] as const;
export const ORDERS_TABS: OrdersTab[] = ["all", "active", "done", "cancel"];

export const STAGE_TONE: Record<OrderStage, string> = {
  accepted: "bg-[#FFF2F4] text-[#C0092A]",
  finished: "bg-[#F2F2F2] text-[#5C5C5C]",
  received: "bg-[#EEF6F0] text-[#1E5E34]",
  cancelled: "bg-[#F2F2F2] text-[#5C5C5C]",
};

/** The four-step line, or null for a stage it says nothing about: a cancelled order went nowhere. */
export const stepStates = (stage: OrderStage): StepState[] | null => {
  if (stage === "accepted") return ["now", "todo", "todo", "todo"];
  if (stage === "received") return ["done", "done", "done", "done"];
  return null;
};

export const parseTab = (value: string | undefined): OrdersTab =>
  ORDERS_TABS.includes(value as OrdersTab) ? (value as OrdersTab) : "all";
