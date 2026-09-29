"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

interface ExchangeRateResponse {
  usdToUah: number | null;
  asOf: string | null;
}

const SIX_HOURS = 6 * 60 * 60 * 1000;

/**
 * Курс долара з НБУ — та сама периодичність оновлення, що й на бекенді
 * маршруту (`revalidate: 6 годин`); `staleTime` тут узгоджений з тим TTL,
 * щоб клієнт не рефетчив частіше, ніж сервер реально оновлює дані.
 */
export const useExchangeRate = () =>
  useQuery({
    queryKey: queryKeys.exchangeRate("USD-UAH"),
    queryFn: async (): Promise<ExchangeRateResponse> => {
      const response = await fetch("/api/exchange-rate");
      if (!response.ok) throw new Error("Не вдалось отримати курс валют");
      return response.json();
    },
    staleTime: SIX_HOURS,
  });
