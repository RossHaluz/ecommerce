/**
 * Один дім для форматування ціни. Раніше `new Intl.NumberFormat("en-US", …)`
 * було інлайнено окремо в 11 файлах (+ ще один варіант із локаллю "en-EU" у
 * `lib/formatter.ts`, яким користувався лише один із них) — 12 копій того
 * самого факту, кожна могла розійтися незалежно.
 *
 * Каталог веде ціни в доларах (джерело істини — перевірено GA-подіями
 * `currency: "USD"` і масштабом цін). Гривневе значення — це USD, помножений
 * на курс НБУ, а не окрема введена ціна; тому `formatPrice` приймає курс
 * параметром, а не тягне його сам — чиста функція, курс живе в
 * `hooks/use-exchange-rate.ts`.
 */
const FORMATTERS: Record<"USD" | "UAH", Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
  // Без копійок — гривневе значення й так похідне (курс НБУ), точність до
  // копійки тут нічого не додає, лише захаращує ціну на екрані.
  UAH: new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }),
};

export interface FormatPriceOptions {
  /** У чому показати. UAH без курсу — тиха відмова назад до USD, не крах. */
  currency: "USD" | "UAH";
  /** Курс USD→UAH з НБУ. Відсутній (ще не завантажений/сервіс ліг) → USD. */
  usdToUahRate: number | null;
}

export function formatPrice(
  amountUsd: number | string,
  { currency, usdToUahRate }: FormatPriceOptions
): string {
  const usd = Number(amountUsd);

  if (currency === "UAH" && usdToUahRate) {
    return FORMATTERS.UAH.format(usd * usdToUahRate);
  }

  return FORMATTERS.USD.format(usd);
}
