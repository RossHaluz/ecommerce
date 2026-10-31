import { useLocale, useTranslations } from "next-intl";
import { OrderItemThumb } from "@/entities/order-item/ui/order-item-thumb";
import { Link } from "@/i18n/routing";
import { formatOrderDate } from "../model/order-format";
import type { OrderSummary } from "../model/order-types";
import { OrderCaption } from "./order-caption";
import { OrderPrice } from "./order-price";
import { OrderSteps } from "./order-steps";

export const ActiveOrderCard = ({ order }: { order: OrderSummary }) => {
  const t = useTranslations("account");
  const locale = useLocale();

  return (
    <section className="flex flex-col gap-4 rounded-[14px] border-2 border-[#1E7B3C] bg-white p-3.5 lg:gap-[18px] lg:rounded-2xl lg:border-0 lg:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="m-0 text-base font-extrabold lg:text-xl">{t("order.title", { number: order.number })}</h2>
          <span className="text-sm text-[#6B6B6B]">
            {formatOrderDate(order.createdAt, locale)} · <OrderCaption items={order.items} /> · <OrderPrice amount={order.totalPrice} />
          </span>
        </div>
        <div className="hidden gap-1.5 lg:flex">
          {order.items.slice(0, 2).map((line) => (
            <OrderItemThumb key={line.slug} imageUrl={line.image ?? undefined} sizes="64px" className="h-12 w-16 rounded-lg" />
          ))}
        </div>
      </div>
      <OrderSteps stage={order.stage} />
      <Link
        href={`/account/orders/${order.number}`}
        className="flex min-h-[46px] items-center justify-center rounded-[10px] bg-[#C0092A] px-4 font-extrabold text-white lg:self-start"
      >
        {t("orders.open")}
      </Link>
    </section>
  );
};
