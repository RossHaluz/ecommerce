import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { OrdersPage, OrdersTab } from "../model/order-types";
import { AccountBackLink } from "./account-back-link";
import { OrderCard } from "./order-card";
import { OrdersEmpty } from "./orders-empty";
import { OrdersSearch } from "./orders-search";
import { OrdersTabs } from "./orders-tabs";

interface AccountOrdersViewProps {
  page: OrdersPage;
  tab: OrdersTab;
  query: string;
}

const olderHref = (tab: OrdersTab, query: string, cursor: number) => {
  const params = new URLSearchParams({ cursor: String(cursor), ...(tab !== "all" && { tab }), ...(query && { q: query }) });
  return `/account/orders?${params}`;
};

export const AccountOrdersView = ({ page, tab, query }: AccountOrdersViewProps) => {
  const t = useTranslations("account.orders");
  const cabinet = useTranslations("account");

  return (
    <>
      <AccountBackLink href="/account" label={cabinet("cabinet")} />
      <h1 className="m-0 text-[22px] font-extrabold lg:text-[28px]">{t("title")}</h1>
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <OrdersTabs current={tab} counts={page.counts} />
        <OrdersSearch tab={tab} query={query} />
      </div>
      {page.items.length === 0 ? (
        <OrdersEmpty searched={Boolean(query)} />
      ) : (
        page.items.map((order) => <OrderCard key={order.number} order={order} />)
      )}
      {page.nextCursor !== null && (
        <Link href={olderHref(tab, query, page.nextCursor)} className="flex min-h-11 items-center self-center font-extrabold text-[#C0092A]">
          {t("older")}
        </Link>
      )}
      <p className="m-0 text-sm text-[#6B6B6B]">{t("linked")}</p>
    </>
  );
};
