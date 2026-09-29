"use client";

import { useTranslations } from "next-intl";
import OrderItemRow from "@/entities/order-item/ui/order-item-row";
import type { OrderItem } from "@/redux/order/slice";

interface CartPreviewProps {
  items: OrderItem[];
  onRemove: (orderItemId: string) => void;
  /** Опційний слот під рядок (наприклад степер кількості в мобільному
   *  кошику) — передається як функція, бо потрібен доступ до `item`. */
  renderExtra?: (item: OrderItem) => React.ReactNode;
}

/**
 * Вміст компактного прев'ю кошика — список рядків або порожній стан.
 * Використовується і з іконки кошика в шапці, і з модалки після "Купити"
 * (раніше кожна мала власну копію цього самого рендеру).
 */
const CartPreview = ({ items, onRemove, renderExtra }: CartPreviewProps) => {
  const t = useTranslations("cart");

  if (!items?.length) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h3 className="text-[#484848] text-sm">{t("empty")}</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <OrderItemRow
          key={item.orderItemId}
          item={item}
          onRemove={onRemove}
          extra={renderExtra?.(item)}
        />
      ))}
    </div>
  );
};

export default CartPreview;
