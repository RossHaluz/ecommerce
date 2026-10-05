"use client";
import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import ProductItem from "./product-item";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { useWarmProductRoute } from "@/features/catalog";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import RefreshIcon from "/public/refresh.svg";
import Pagination from "@/components/pagination";
import { isHistoryNavigation } from "@/hooks/back-navigation";
import { useNearViewport } from "@/hooks/use-near-viewport";

// Перший екран телефона з запасом. Решта до lg прихована (display:none), доки людина
// не догорне: інакше Chrome заздалегідь тягне 25+ фото «біля екрана» і вони
// відсувають перше фото. На ПК видно все одразу — домальовування там зсувало футер (CLS).
const FIRST_PAINT_ITEMS = 8;
const EXPAND_MARGIN = "400px";

interface ProductListLayoutProps {
  items: Product[];
  page: number;
  totalPages: number;
  canShowMore: boolean;
  isFetchingMore?: boolean;
  isStale?: boolean;
  onShowMore?: () => void;
}

/** Лише вигляд списку: і кешований HTML, і живий список рендерять саме його. */
export const ProductListLayout: FC<ProductListLayoutProps> = ({
  items,
  page,
  totalPages,
  canShowMore,
  isFetchingMore = false,
  isStale = false,
  onShowMore,
}) => {
  const t = useTranslations("common");
  const currentCustomizer = useHydratedSelector(selectCurrentCustomizer);
  // «Назад» до списку — одразу весь, щоб браузер відновив прокрутку на потрібну картку.
  const [startsFull] = useState(isHistoryNavigation);
  const [expandedByUser, setExpandedByUser] = useState(false);
  const [sentinelRef, isNearEnd] = useNearViewport<HTMLDivElement>(EXPAND_MARGIN, !startsFull);
  const showAll = startsFull || expandedByUser || isNearEnd || items.length <= FIRST_PAINT_ITEMS;
  useWarmProductRoute(items[0]?.product_name);

  return (
    <div className="flex flex-col gap-6 w-full">
      <ul
        aria-busy={isStale}
        className={cn("grid grid-cols-1 gap-3 transition-opacity", {
          "grid-cols-1": currentCustomizer === "list",
          "grid-cols-2 lg:grid-cols-4": currentCustomizer === "grid",
          "opacity-60": isStale,
        })}
      >
        {items.map((item, index) => (
          <ProductItem
            key={item.id}
            item={item}
            index={index}
            className={!showAll && index >= FIRST_PAINT_ITEMS ? "max-lg:hidden" : undefined}
          />
        ))}
      </ul>
      {!showAll && <div ref={sentinelRef} aria-hidden />}

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          className="flex items-center gap-4 max-w-max border border-solid shadow-md text-[#111111] bg-white hover:text-white mx-auto"
          disabled={!canShowMore || isFetchingMore}
          onClick={() => {
            setExpandedByUser(true);
            onShowMore?.();
          }}
        >
          <RefreshIcon
            className={cn({
              "animate-spin transform transition-all duration-300": isFetchingMore,
            })}
          />
          {t("showMore")}
        </Button>

        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
};
