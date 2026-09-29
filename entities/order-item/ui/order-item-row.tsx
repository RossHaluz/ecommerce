"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Trash from "/public/images/trash.svg";
import { Button } from "@/components/ui/button";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import type { OrderItem } from "@/redux/order/slice";

interface OrderItemRowProps {
  item: OrderItem;
  onRemove: (orderItemId: string) => void;
  /** Степер кількості в мобільному кошику (`mobile-sidebar.tsx`) — єдине
   *  місце, де рядок кошика можна редагувати, не лише переглядати. Структура
   *  (фото, назва, ціна, видалення) та сама, тому не окремий компонент. */
  extra?: React.ReactNode;
}

const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const OrderItemRow = ({ item, onRemove, extra }: OrderItemRowProps) => {
  const { format } = usePriceFormatter();
  const t = useTranslations("cart");
  const imageUrl = productImageUrl(item.images?.[0]?.url);

  return (
    <div className="flex items-start gap-3 w-full rounded-[5px]">
      <div className="w-[65px] h-[65px] rounded-[5px] overflow-hidden relative">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={item.images?.[0]?.id ?? item.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
            {capitalizeFirstLetter(item.title)}
          </h3>

          <Button
            aria-label={t("removeItem")}
            variant="ghost"
            size="reset"
            onClick={() => onRemove(item.orderItemId)}
          >
            <Trash />
          </Button>
        </div>

        <div className="flex items-center justify-between lg:items-start w-full lg:flex-col lg:gap-[10px]">
          <span className="text-lg text-[#c0092a] font-bold">
            {format(item.price)}
          </span>
          {extra}
        </div>
      </div>
    </div>
  );
};

export default OrderItemRow;
