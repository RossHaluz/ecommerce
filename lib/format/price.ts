/**
 * Один дім для форматування ціни. Каталог веде ціни в доларах; гривнева ціна — USD × курс магазину
 * (`lib/api/exchange-rate.ts`), а не окремо введена, тому курс приходить параметром.
 */
const USD_FORMATTER = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// Не Intl «uk-UA»: Node на сервері пише «₴», Chrome — «грн», і ціна з SSR розходиться при гідратації (React #418).
const formatUah = (wholeHryvnias: number) =>
  `${String(wholeHryvnias).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₴`;

export interface FormatPriceOptions {
  /** У чому показати. UAH без курсу — тиха відмова назад до USD, не крах. */
  currency: "USD" | "UAH";
  /** Курс магазину USD→UAH. Відсутній (банк недоступний) → USD. */
  usdToUahRate: number | null;
}

/** Те саме округлення, що в бекенді для наложки ТТН, тож клієнт платить те, що бачив. */
export const usdToUah = (amountUsd: number | string, usdToUahRate: number) => Math.round(Number(amountUsd) * usdToUahRate);

export function formatPrice(
  amountUsd: number | string,
  { currency, usdToUahRate }: FormatPriceOptions
): string {
  if (currency === "UAH" && usdToUahRate) {
    return formatUah(usdToUah(amountUsd, usdToUahRate));
  }

  return USD_FORMATTER.format(Number(amountUsd));
}
