"use client";

import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useAddToCart } from "@/features/cart";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { selectOrderItems } from "@/redux/order/selector";
import { canBuy, inStockTotal, type FavoriteRowView } from "../model/favorite-status";
import { FavoritesShare } from "./favorites-share";

export const FavoritesSummary = ({ rows }: { rows: FavoriteRowView[] }) => {
  const t = useTranslations("favorites");
  const { format } = usePriceFormatter();
  const addToCart = useAddToCart();
  const inCart = useHydratedSelector(selectOrderItems) ?? [];
  const { count, sum } = inStockTotal(rows);

  // Повторне «Додати все» не має подвоїти вже покладене в кошик.
  const addAll = () => {
    const added = rows.filter(canBuy).filter((row) => !inCart.some((line) => line.id === row.product.id) && addToCart(row.product));
    if (added.length) toast.success(t("addedAll", { count: added.length }));
  };

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-4 md:p-5">
      {count > 0 && (
        <span className="flex flex-col text-sm text-[#484848]">
          {t("inStockSum", { count })}
          <b className="text-2xl font-extrabold text-[#2E2E2E] md:text-3xl">{format(sum)}</b>
        </span>
      )}
      <button
        type="button"
        onClick={addAll}
        disabled={!rows.some(canBuy)}
        className="h-12 rounded-lg bg-[#C0092A] text-base font-extrabold text-white disabled:opacity-50"
      >
        {t("addAll")}
      </button>
      <FavoritesShare items={rows.map((row) => row.item)} />
    </section>
  );
};
