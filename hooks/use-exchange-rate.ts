"use client";

import { useContext } from "react";
import { ExchangeRateContext } from "@/components/providers/exchange-rate-provider";

/** Курс магазину з layout; форма `{ data }` та сама, що була в запиту, тож компоненти з цінами не змінювались. */
export const useExchangeRate = () => ({ data: useContext(ExchangeRateContext) });
