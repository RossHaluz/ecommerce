"use client";

import { useTranslations } from "next-intl";
import type { OrderItem } from "@/redux/order/slice";
import { SubmitButton } from "./submit-button";

/** Телефон: кнопка завжди під пальцем, хоч би де в довгій формі людина була. */
export const SubmitBar = ({ items, submitting }: { items: OrderItem[]; submitting: boolean }) => {
  const t = useTranslations("checkout");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex flex-col gap-1.5 bg-white px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] lg:hidden">
      <SubmitButton items={items} submitting={submitting} />
      <p className="m-0 text-center text-xs text-[#6B6B6B]">{t("submitNote")}</p>
    </div>
  );
};
