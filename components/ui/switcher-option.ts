import { cn } from "@/lib/utils";

/**
 * Стиль пункту перемикача (мова, валюта) на темному тлі шапки й футера.
 * Червоний на #484848 давав контраст 1,44 — обраний пункт позначаємо
 * підкресленням, неактивний — білим 75% (5,94).
 */
export const switcherOptionClass = (active: boolean) =>
  cn("uppercase transition-opacity", {
    "underline underline-offset-4": active,
    "opacity-75 hover:opacity-100": !active,
  });
