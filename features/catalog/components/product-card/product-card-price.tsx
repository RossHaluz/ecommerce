"use client";

import { useTranslations } from "next-intl";
import { usePriceFormatter } from "@/hooks/use-price-formatter";

export const ProductCardPrice = ({ price }: { price: number }) => {
  const t = useTranslations("product");
  const { format, approxUah } = usePriceFormatter();
  const uah = approxUah(price);

  if (!price) return <span className="text-sm font-extrabold text-[#C0092A]">{t("negotiablePrice")}</span>;

  return (
    <span className="flex min-w-0 flex-col">
      <span className="whitespace-nowrap text-[17px] font-extrabold leading-tight text-[#C0092A] md:text-xl">{format(price)}</span>
      {/* Місце під рядок резервуємо: курс приходить після рендеру, і картка інакше стрибала б. */}
      <span className="min-h-[16px] whitespace-nowrap text-[11px] text-[#6B6B6B] md:text-xs">{uah && t("approxShort", { price: uah })}</span>
    </span>
  );
};
