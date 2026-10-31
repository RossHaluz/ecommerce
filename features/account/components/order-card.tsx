import { useLocale, useTranslations } from "next-intl";
import { OrderItemThumb } from "@/entities/order-item/ui/order-item-thumb";
import { Link } from "@/i18n/routing";
import { formatOrderDate } from "../model/order-format";
import type { OrderSummary } from "../model/order-types";
import { OrderCaption } from "./order-caption";
import { OrderPrice } from "./order-price";
import { OrderStatusChip } from "./order-status-chip";

export const OrderCard = ({ order }: { order: OrderSummary }) => {
  const t = useTranslations("account");
  const locale = useLocale();
  const href = `/account/orders/${order.number}`;

  return (
    <article className="grid grid-cols-1 gap-2.5 rounded-[14px] bg-white p-3 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center lg:gap-4 lg:rounded-2xl lg:px-[18px] lg:py-4">
      <Link href={href} className="flex min-w-0 items-center gap-2.5 text-[#2E2E2E] lg:gap-4">
        <OrderItemThumb
          imageUrl={order.items[0]?.image ?? undefined}
          sizes="104px"
          className="h-[54px] w-[72px] shrink-0 rounded-lg lg:h-[78px] lg:w-[104px]"
        />
        <span className="flex min-w-0 grow flex-col gap-1">
          <span className="flex flex-wrap items-center gap-2">
            <strong className="text-[15px] lg:text-[17px]">{t("order.shortTitle", { number: order.number })}</strong>
            <OrderStatusChip stage={order.stage} />
          </span>
          <span className="truncate text-sm lg:text-[15px]">
            <OrderCaption items={order.items} />
          </span>
          <span className="text-[13px] text-[#6B6B6B]">{formatOrderDate(order.createdAt, locale)}</span>
        </span>
      </Link>
      <div className="flex items-center justify-between gap-2 lg:flex-col lg:items-end">
        <strong className="text-base lg:text-[19px]">
          <OrderPrice amount={order.totalPrice} />
        </strong>
        <Link
          href={href}
          className="flex min-h-[42px] items-center rounded-[10px] border-2 border-[#C0092A] px-4 text-sm font-extrabold text-[#C0092A]"
        >
          {t("orders.open")}
        </Link>
      </div>
    </article>
  );
};
