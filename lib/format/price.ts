/**
 * Один дім для форматування ціни. Каталог веде ціни в доларах; гривнева ціна — USD × курс магазину
 * (`lib/api/exchange-rate.ts`), а не окремо введена, тому курс приходить параметром.
 */
const FORMATTERS: Record<"USD" | "UAH", Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
  // Цілі гривні: так само округлює бекенд для наложки ТТН.
  UAH: new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }),
};

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
    return FORMATTERS.UAH.format(usdToUah(amountUsd, usdToUahRate));
  }

  return FORMATTERS.USD.format(Number(amountUsd));
}
