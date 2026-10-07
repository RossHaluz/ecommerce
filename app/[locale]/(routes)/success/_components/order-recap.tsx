"use client";

import { useTranslations } from "next-intl";
import { OrderItemLine } from "@/entities/order-item/ui/order-item-line";
import type { SuccessView } from "../model/success-view";
import { RecapRow } from "./recap-row";

/** Що, кому й як — щоб людина одразу побачила помилку в адресі, поки менеджер не відправив. */
export const OrderRecap = ({ view }: { view: SuccessView }) => {
  const t = useTranslations();
  const delivery = [t(`checkout.delivery.${view.deliveryMethod}.title`), view.deliveryPlace].filter(Boolean).join(", ");

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-4">
      <h2 className="m-0 text-lg font-extrabold text-[#2E2E2E]">{t("checkout.yourOrder")}</h2>
      <ul className="m-0 flex list-none flex-col gap-3 border-b border-[#EEEEEE] p-0 pb-3">
        {view.items.map((item) => (
          <OrderItemLine key={item.orderItemId ?? item.id} item={item} />
        ))}
      </ul>
      <dl className="m-0 flex flex-col gap-2">
        <RecapRow label={t("success.recipient")} value={[view.recipient.name, view.recipient.phone].filter(Boolean).join(", ")} />
        <RecapRow label={t("checkout.stepDelivery")} value={delivery} />
        {view.paymentMethod && <RecapRow label={t("checkout.stepPayment")} value={t(`checkout.payment.${view.paymentMethod}.title`)} />}
      </dl>
    </section>
  );
};
