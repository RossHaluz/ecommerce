import { NextResponse } from "next/server";

const NBU_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json";

/** НБУ публікує курс раз на день — не сенс питати частіше. */
const REVALIDATE_SECONDS = 6 * 60 * 60;

interface NbuRate {
  rate: number;
  exchangedate: string;
}

/**
 * Проксі до НБУ, не прямий клієнтський fetch.
 *
 * Так URL стороннього сервісу лишається на сервері (не в клієнтському
 * бандлі), і кеш даних Next.js робить свою роботу: `revalidate` тут працює
 * так само, як і в `lib/api/`, тому цей ендпоінт не б'є в НБУ на кожен запит
 * ціни.
 */
export async function GET() {
  try {
    const response = await fetch(NBU_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`НБУ відповів ${response.status}`);
    }

    const [usd]: NbuRate[] = await response.json();

    if (!usd?.rate) {
      throw new Error("НБУ не повернув курс долара");
    }

    return NextResponse.json({
      usdToUah: usd.rate,
      asOf: usd.exchangedate,
    });
  } catch (error) {
    console.error("[exchange-rate] НБУ недоступний:", error);
    // 200, не 500: конвертація ціни — не критичний шлях. Клієнт отримує
    // null і показує тільки долари, а не ламає всю сторінку через те, що
    // зовнішній сервіс ліг.
    return NextResponse.json({ usdToUah: null, asOf: null });
  }
}
