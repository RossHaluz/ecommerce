"use client";

import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { cartTotal } from "@/features/cart";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import type { OrderItem } from "@/redux/order/slice";

/** Сума на кнопці: людина бачить, на що погоджується, саме в момент натискання. */
export const SubmitButton = ({ items, submitting }: { items: OrderItem[]; submitting: boolean }) => {
  const t = useTranslations("checkout");
  const { format } = usePriceFormatter();

  return (
    <button
      type="submit"
      form="checkout-form"
      disabled={submitting}
      className="flex h-[52px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#C0092A] px-4 text-base font-extrabold text-white disabled:opacity-70 lg:text-lg"
    >
      {submitting && <Loader2 size={20} className="animate-spin" aria-hidden />}
      {submitting ? (
        t("submitting")
      ) : (
        <span>
          {t("submit")}
          {/* На комп'ютері сума велика прямо над кнопкою — на кнопці вона лише подовжувала текст. */}
          <span className="lg:hidden"> · {format(cartTotal(items))}</span>
        </span>
      )}
    </button>
  );
};
