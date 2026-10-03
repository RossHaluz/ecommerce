"use client";
import { FC } from "react";
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
import { useAfterLoad } from "@/hooks/use-after-load";

// ~6 екранів телефона. Решта сторінки домальовується після завантаження: 52
// картки одразу — це HTML, фото «біля екрана» і гідратація, що відсували перше фото.
const FIRST_PAINT_ITEMS = 12;

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
  const isLoaded = useAfterLoad();
  const visibleItems = isLoaded ? items : items.slice(0, FIRST_PAINT_ITEMS);
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
        {visibleItems.map((item, index) => (
          <ProductItem key={item.id} item={item} index={index} />
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          className="flex items-center gap-4 max-w-max border border-solid shadow-md text-[#111111] bg-white hover:text-white mx-auto"
          disabled={!canShowMore || isFetchingMore}
          onClick={onShowMore}
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
