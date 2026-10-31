import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { OrderSummary } from "../model/order-types";
import { RecentOrderRow } from "./recent-order-row";

export const RecentOrders = ({ orders, total }: { orders: OrderSummary[]; total: number }) => {
  const t = useTranslations("account.orders");

  return (
    <section aria-labelledby="recent-orders" className="flex flex-col gap-2.5 rounded-[14px] bg-white p-3.5 lg:rounded-2xl lg:p-5">
      <div className="flex items-center justify-between">
        <h2 id="recent-orders" className="m-0 text-lg font-extrabold lg:text-xl">
          {t("title")}
        </h2>
        <Link href="/account/orders" className="flex min-h-11 items-center text-sm font-extrabold text-[#C0092A]">
          {t("seeAll", { count: total })} ›
        </Link>
      </div>
      {orders.map((order) => (
        <RecentOrderRow key={order.number} order={order} />
      ))}
    </section>
  );
};
