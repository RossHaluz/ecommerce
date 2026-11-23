"use client";

import { selectCurrency } from "@/redux/customizer/selectors";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatPrice } from "@/lib/format/price";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

/** Обрана валюта (Redux) + курс магазину (з layout) + чисте форматування (`lib/format/price`) — в одному місці. */
export const usePriceFormatter = () => {
  const currency = useHydratedSelector(selectCurrency);
  const { data } = useExchangeRate();
  const rate = data?.usdToUah ?? null;

  return {
    currency,
    format: (amountUsd: number | string) => formatPrice(amountUsd, { currency, usdToUahRate: rate }),
    /** Гривні дрібно під доларами — платять у гривнях; `null`, коли й так гривні або курсу ще немає. */
    approxUah: (amountUsd: number) =>
      currency === "USD" && rate && amountUsd > 0 ? formatPrice(amountUsd, { currency: "UAH", usdToUahRate: rate }) : null,
  };
};
