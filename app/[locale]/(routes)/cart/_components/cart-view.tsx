"use client";

import { useTranslations } from "next-intl";
import { CartLine, CartSuggestions, EmptyCart } from "@/features/cart";
import { selectOrderItems } from "@/redux/order/selector";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { useMounted } from "@/hooks/use-mounted";
import { CartSummary } from "./cart-summary";

/**
 * Телефон: товари → підсумок і кнопки → схожі (під головною дією).
 * Комп'ютер: товари й схожі ліворуч, підсумок праворуч — через розміщення в сітці, порядок у DOM той самий.
 */
export const CartView = () => {
  const t = useTranslations("cart");
  const items = useHydratedSelector(selectOrderItems) ?? [];
  const mounted = useMounted();

  // Кошик у localStorage: до монтування невідомий, а повна висота не дає футеру підстрибнути (CLS).
  if (!mounted) return <div className="min-h-[100svh]" aria-busy />;
  if (!items.length) return <EmptyCart />;

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <h1 className="m-0 text-xl font-extrabold text-[#2E2E2E] lg:text-[32px]">{t("title", { count: items.length })}</h1>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-6">
        <div className="flex flex-col gap-3 lg:col-start-1 lg:row-start-1">
          {items.map((item) => (
            <CartLine key={item.orderItemId} item={item} variant="page" />
          ))}
        </div>
        <div className="lg:sticky lg:top-6 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <CartSummary items={items} />
        </div>
        <div className="pt-2 lg:col-start-1 lg:row-start-2">
          <CartSuggestions items={items} expandable />
        </div>
      </div>
    </div>
  );
};
