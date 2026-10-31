export type OrderStage = "accepted" | "finished" | "received" | "cancelled";
export type OrdersTab = "all" | "active" | "done" | "cancel";
export type TabCounts = Record<OrdersTab, number>;

export interface OrderLine {
  title: string;
  article: string;
  oe: string;
  slug: string;
  image: string | null;
  price: number;
  quantity: number;
}

export interface OrderSummary {
  number: number;
  createdAt: string;
  stage: OrderStage;
  totalPrice: number;
  items: OrderLine[];
}

export interface OrderDetails extends OrderSummary {
  comment: string;
  dropClient: { name: string; phone: string } | null;
  recipient: { name: string; phone: string };
  delivery: { service: string; city: string; separation: string; address: string };
  payment: { method: string; isPaid: boolean };
}

export interface AccountOverview {
  firstName: string;
  lastName: string;
  phone: string;
  phoneConfirmed: boolean;
  active: OrderSummary | null;
  recent: OrderSummary[];
  counts: TabCounts;
}

export interface OrdersPage {
  items: OrderSummary[];
  nextCursor: number | null;
  counts: TabCounts;
}
