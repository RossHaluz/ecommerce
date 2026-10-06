"use client";

import { useTranslations } from "next-intl";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatPrice } from "@/lib/format/price";

/** Ціна у вибраній валюті; при доларах — гривні дрібно під нею, бо платять у гривнях. */
export const PriceBlock = ({ price }: { price: number }) => {
  const t = useTranslations("product");
  const { currency, format } = usePriceFormatter();
  const { data } = useExchangeRate();

  if (!price) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[28px] leading-[34px] font-extrabold text-[#C0092A]">{t("negotiablePrice")}</span>
        <span className="text-sm text-[#6B6B6B]">{t("negotiablePriceNote")}</span>
      </div>
    );
  }

  const uah =
    currency === "USD" && data?.usdToUah ? formatPrice(price, { currency: "UAH", usdToUahRate: data.usdToUah }) : null;

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[32px] leading-[38px] lg:text-[40px] lg:leading-[46px] font-extrabold text-[#C0092A]">
        {format(price)}
      </span>
      {/* Місце під рядок резервуємо: курс приходить після рендеру, і без цього блок стрибав би (CLS). */}
      <span className="min-h-[20px] text-sm text-[#6B6B6B]">{uah && t("approxUah", { price: uah })}</span>
    </div>
  );
};
