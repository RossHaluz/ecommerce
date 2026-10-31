import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatOrderDate } from "../model/order-format";
import type { OrderSummary } from "../model/order-types";
import { OrderCaption } from "./order-caption";
import { OrderPrice } from "./order-price";
import { OrderStatusChip } from "./order-status-chip";

export const RecentOrderRow = ({ order }: { order: OrderSummary }) => {
  const t = useTranslations("account.order");
  const locale = useLocale();

  return (
    <Link
      href={`/account/orders/${order.number}`}
      className="flex min-h-[60px] items-center justify-between gap-2.5 border-t border-[#EEEEEE] py-2 text-[#2E2E2E]"
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <strong className="text-[15px]">
          {t("shortTitle", { number: order.number })} · <OrderPrice amount={order.totalPrice} />
        </strong>
        <span className="truncate text-[13px] text-[#6B6B6B]">
          {formatOrderDate(order.createdAt, locale)} · <OrderCaption items={order.items} />
        </span>
      </span>
      <OrderStatusChip stage={order.stage} />
    </Link>
  );
};
