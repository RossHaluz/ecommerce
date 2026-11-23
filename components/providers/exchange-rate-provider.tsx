"use client";

import { createContext, type ReactNode } from "react";
import type { ShopRate } from "@/lib/api/exchange-rate";

/** Курс, отриманий сервером один раз на рендер: сервер і браузер форматують ціну однаково, без «стрибка». */
export const ExchangeRateContext = createContext<ShopRate | null>(null);

export const ExchangeRateProvider = ({ rate, children }: { rate: ShopRate | null; children: ReactNode }) => (
  <ExchangeRateContext.Provider value={rate}>{children}</ExchangeRateContext.Provider>
);
