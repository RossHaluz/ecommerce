import { request } from "./http";

export interface ShopRate {
  usdToUah: number;
  asOf: string;
}

// Бекенд сам тримає курс годину; 10 хвилин тут — щоб нова ціна дійшла до сторінок без зайвих запитів.
const REVALIDATE_SECONDS = 600;

/**
 * Курс магазину (готівковий продаж ПриватБанку) — той самий, яким бекенд рахує наложку ТТН. На сервері, щоб ціна в
 * гривнях була вже в HTML (для покупця й Google). `null`, коли курсу немає: тоді сайт показує долари, а не ламається.
 */
export async function fetchShopRate(): Promise<ShopRate | null> {
  try {
    const rate = await request<ShopRate | null>("/exchange-rate", { revalidate: REVALIDATE_SECONDS });
    return rate && typeof rate.usdToUah === "number" && rate.usdToUah > 0 ? { usdToUah: rate.usdToUah, asOf: rate.asOf } : null;
  } catch (error) {
    console.error("[api] exchange-rate:", error);
    return null;
  }
}
