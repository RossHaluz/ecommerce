import { cn } from "@/lib/utils";

/**
 * Стиль пункту перемикача (мова, валюта) на темному тлі шапки й футера.
 * Червоний на #484848 давав контраст 1,44 — обраний пункт позначаємо
 * підкресленням, неактивний — білим 75% (5,94). Зона натискання не менша за
 * 24×24 px (Lighthouse target-size), інакше UK/PL і $/₴ надто дрібні під палець.
 */
export const switcherOptionClass = (active: boolean) =>
  cn("uppercase transition-opacity inline-flex items-center justify-center min-w-[24px] min-h-[24px]", {
    "underline underline-offset-4": active,
    "opacity-75 hover:opacity-100": !active,
  });
