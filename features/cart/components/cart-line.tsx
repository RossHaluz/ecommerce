"use client";

import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { OrderItemThumb } from "@/entities/order-item/ui/order-item-thumb";
import { maxOrderable } from "@/entities/order-item/model/max-orderable";
import { productHref } from "@/entities/product/model/product-href";
import type { OrderItem } from "@/redux/order/slice";
import { useRemoveFromCart } from "../hooks/use-remove-from-cart";
import { CartLineQuantity } from "./cart-line-quantity";

interface CartLineProps {
  item: OrderItem;
  /** page — картка на сторінці кошика; compact — рядок у шторці. */
  variant: "page" | "compact";
}

/** Рядок кошика: фото, назва, кількість у межах залишку, сума й видалення. */
export const CartLine = ({ item, variant }: CartLineProps) => {
  const t = useTranslations("cart");
  const { format } = usePriceFormatter();
  const removeFromCart = useRemoveFromCart();
  const isPage = variant === "page";
  const atStockLimit = item.quantity >= maxOrderable(item.stock);

  return (
    <article className={cn("flex gap-3", isPage ? "rounded-xl bg-white p-3" : "border-b border-[#EEEEEE] py-3")}>
      <Link href={productHref(item.product_name)} prefetch={false} tabIndex={-1} aria-hidden>
        <OrderItemThumb imageUrl={item.images?.[0]?.url} sizes="88px" className={cn("rounded-lg", isPage ? "h-[66px] w-[88px]" : "h-12 w-16")} />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-0.5">
            <Link href={productHref(item.product_name)} prefetch={false} className="line-clamp-2 text-sm font-bold leading-[18px] text-[#2E2E2E] first-letter:uppercase lg:text-[15px] lg:leading-5">
              {item.title}
            </Link>
            {isPage && item.catalog_number && <span className="text-[13px] text-[#6B6B6B]">OE {item.catalog_number}</span>}
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.orderItemId)}
            aria-label={`${t("removeItem")}: ${item.title}`}
            className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center text-[#6B6B6B]"
          >
            <Trash2 size={20} aria-hidden />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CartLineQuantity item={item} size="md" />
          <span className="flex flex-col items-end">
            <span className="text-[17px] font-extrabold text-[#2E2E2E]">{format(item.price)}</span>
            {item.quantity > 1 && <span className="text-xs text-[#6B6B6B]">{t("each", { price: format(item.priceForOne) })}</span>}
          </span>
        </div>
        {atStockLimit && <span className="text-xs font-bold text-[#6B6B6B]">{t("stockLimit", { count: item.quantity })}</span>}
      </div>
    </article>
  );
};
