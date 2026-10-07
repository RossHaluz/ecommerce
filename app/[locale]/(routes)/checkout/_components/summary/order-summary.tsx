"use client";

import { useTranslations } from "next-intl";
import type { OrderItem } from "@/redux/order/slice";
import type { DeliveryMethod } from "../../model/checkout-options";
import { SubmitButton } from "../submit-button";
import { EditCartButton } from "./edit-cart-button";
import { SummaryItem } from "./summary-item";
import { SummaryTotals } from "./summary-totals";
import { TrustNotes } from "./trust-notes";

interface OrderSummaryProps {
  items: OrderItem[];
  deliveryMethod: DeliveryMethod;
  submitting: boolean;
}

/** Права колонка на комп'ютері: що купую, скільки, і кнопка — завжди поруч із сумою. */
export const OrderSummary = ({ items, deliveryMethod, submitting }: OrderSummaryProps) => {
  const t = useTranslations("checkout");

  return (
    <aside className="flex flex-col gap-4 rounded-xl bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="m-0 text-xl font-extrabold text-[#2E2E2E]">{t("yourOrder")}</h2>
        <EditCartButton items={items} />
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 border-b border-[#EEEEEE] p-0 pb-4">
        {items.map((item) => (
          <SummaryItem key={item.orderItemId ?? item.id} item={item} />
        ))}
      </ul>
      <SummaryTotals items={items} deliveryMethod={deliveryMethod} />
      <SubmitButton items={items} submitting={submitting} />
      <p className="m-0 text-center text-[13px] text-[#6B6B6B]">{t("submitNote")}</p>
      <TrustNotes />
    </aside>
  );
};
