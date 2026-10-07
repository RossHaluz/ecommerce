"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cartTotal } from "@/features/cart";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import type { SuccessView } from "../model/success-view";

/** Номер замовлення великим: його називають менеджеру й шукають у месенджерах. */
export const SuccessHero = ({ view }: { view: SuccessView }) => {
  const t = useTranslations();
  const { format } = usePriceFormatter();
  const payment = view.paymentMethod ? t(`checkout.payment.${view.paymentMethod}.title`) : null;

  return (
    <section className="flex flex-col items-center gap-3 rounded-xl bg-white px-4 py-6 text-center">
      <span aria-hidden className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E6F4EA] text-[#1E7E34]">
        <Check size={36} strokeWidth={3} />
      </span>
      <h1 className="m-0 text-[26px] font-extrabold leading-tight text-[#2E2E2E]">
        {t("success.title", { number: view.orderNumber })}
      </h1>
      <p className="m-0 rounded-full bg-[#E6F4EA] px-3.5 py-1.5 text-sm font-bold text-[#1E7E34]">
        {[payment, format(cartTotal(view.items))].filter(Boolean).join(" · ")}
      </p>
    </section>
  );
};
