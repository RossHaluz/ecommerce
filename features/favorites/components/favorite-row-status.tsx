import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { StockStatus } from "@/entities/product/ui/stock-status";
import type { FavoriteRowView } from "../model/favorite-status";

/** Що змінилось з моменту ♡: наявність, знижка або «вже немає» з виходом на аналоги. */
export const FavoriteRowStatus = ({ row }: { row: FavoriteRowView }) => {
  const t = useTranslations("favorites");

  if (row.availability === "unavailable") {
    return (
      <span className="flex flex-wrap items-center gap-x-3 text-[13px] font-bold">
        <span className="text-[#6B6B6B]">{t("unavailable")}</span>
        {/* Об'єкт, не рядок: OE буває з пробілом («4M8807065C GRU»), query закодує Link. */}
        <Link href={{ pathname: "/search", query: { searchValue: row.item.catalogNumber } }} className="text-[#C0092A] underline">
          {t("findAnalogs")}
        </Link>
      </span>
    );
  }
  if (!row.product) return null;

  return (
    <span className="flex flex-wrap items-center gap-x-3 text-[13px] font-bold">
      <StockStatus quantity={row.product.quantity} />
      {row.oldPrice !== undefined && <span className="text-[#C0092A]">↓ {t("priceDropped")}</span>}
    </span>
  );
};
