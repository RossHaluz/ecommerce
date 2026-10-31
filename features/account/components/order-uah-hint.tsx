"use client";

import { useTranslations } from "next-intl";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatPrice } from "@/lib/format/price";

export const OrderUahHint = ({ amount }: { amount: number }) => {
  const t = useTranslations("account.order");
  const { data } = useExchangeRate();
  if (!amount || !data?.usdToUah) return null;

  const uah = formatPrice(amount, { currency: "UAH", usdToUahRate: data.usdToUah });
  return <span className="text-right text-[13px] text-[#6B6B6B]">{t("aboutUah", { amount: uah })}</span>;
};
