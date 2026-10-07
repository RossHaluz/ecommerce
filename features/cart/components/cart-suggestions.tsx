"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { OrderItem } from "@/redux/order/slice";
import { useCartSuggestions } from "../hooks/use-cart-suggestions";
import { SuggestionRow } from "./suggestion-row";

const STEP = 3;

/** «Можливо, вас зацікавлять» під кнопкою оформлення: по 3, щоб не відволікати від головної дії. */
export const CartSuggestions = ({ items, expandable }: { items: OrderItem[]; expandable: boolean }) => {
  const t = useTranslations("cart");
  const suggestions = useCartSuggestions(items);
  const [shown, setShown] = useState(STEP);
  if (!suggestions.length) return null;

  return (
    <section className="flex flex-col gap-2.5" aria-labelledby="cart-suggestions-title">
      <h2 id="cart-suggestions-title" className="m-0 text-base font-extrabold text-[#2E2E2E] lg:text-lg">
        {t("suggestionsTitle")}
      </h2>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {suggestions.slice(0, shown).map((product) => (
          <SuggestionRow key={product.id} product={product} />
        ))}
      </ul>
      {expandable && shown < suggestions.length && (
        <button
          type="button"
          onClick={() => setShown((count) => count + STEP)}
          className="h-12 rounded-lg border border-[#CFCFCF] bg-white text-[15px] font-bold text-[#2E2E2E]"
        >
          {t("showMore")}
        </button>
      )}
    </section>
  );
};
