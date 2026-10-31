import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ORDERS_TABS } from "../model/order-stage";
import type { OrdersTab, TabCounts } from "../model/order-types";

export const OrdersTabs = ({ current, counts }: { current: OrdersTab; counts: TabCounts }) => {
  const t = useTranslations("account.orders.tabs");

  return (
    <nav aria-label={t("label")} className="flex gap-1.5 overflow-x-auto rounded-xl lg:bg-white lg:p-1">
      {ORDERS_TABS.map((tab) => (
        <Link
          key={tab}
          href={tab === "all" ? "/account/orders" : `/account/orders?tab=${tab}`}
          aria-current={tab === current ? "page" : undefined}
          className={`flex h-10 shrink-0 items-center gap-1 rounded-full px-3.5 text-sm font-extrabold lg:rounded-[9px] ${
            tab === current ? "bg-[#2E2E2E] text-white" : "bg-white text-[#2E2E2E]"
          }`}
        >
          {t(tab)} <span className="opacity-70">{counts[tab]}</span>
        </Link>
      ))}
    </nav>
  );
};
