import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatOrderDate, formatOrderTime } from "../model/order-format";
import { stepStates } from "../model/order-stage";
import type { OrderDetails } from "../model/order-types";
import { AccountBackLink } from "./account-back-link";
import { OrderHelpCard } from "./order-help-card";
import { OrderLines } from "./order-lines";
import { OrderPrintButton } from "./order-print-button";
import { OrderRecipientCard } from "./order-recipient-card";
import { OrderStatusChip } from "./order-status-chip";
import { OrderSteps } from "./order-steps";
import { OrderSummaryCard } from "./order-summary-card";

export const AccountOrderView = ({ order }: { order: OrderDetails }) => {
  const t = useTranslations("account");
  const locale = useLocale();
  const date = formatOrderDate(order.createdAt, locale);
  const time = formatOrderTime(order.createdAt, locale);

  return (
    <>
      <nav aria-label={t("cabinet")} className="hidden gap-2 text-sm text-[#6B6B6B] lg:flex">
        <Link href="/account">{t("cabinet")}</Link>
        <span aria-hidden>›</span>
        <Link href="/account/orders">{t("orders.title")}</Link>
        <span aria-hidden>›</span>
        <span className="text-[#2E2E2E]">{t("order.shortTitle", { number: order.number })}</span>
      </nav>
      <AccountBackLink href="/account/orders" label={t("orders.title")} />
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="m-0 text-[22px] font-extrabold lg:text-[30px]">{t("order.title", { number: order.number })}</h1>
          <span className="text-[13px] text-[#6B6B6B] lg:text-[15px]">{t("order.from", { date, time })}</span>
        </div>
        <OrderStatusChip stage={order.stage} />
      </header>
      <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-5">
        <div className="flex min-w-0 flex-col gap-3 lg:gap-4">
          {stepStates(order.stage) && (
            <section aria-labelledby="order-stages" className="rounded-[14px] bg-white p-3.5 lg:rounded-2xl lg:p-5">
              <h2 id="order-stages" className="m-0 mb-3 text-lg font-extrabold">
                {t("order.stages")}
              </h2>
              <OrderSteps stage={order.stage} />
            </section>
          )}
          <OrderLines items={order.items} />
        </div>
        <aside className="flex min-w-0 flex-col gap-3 lg:gap-4">
          <OrderSummaryCard order={order} />
          <OrderRecipientCard order={order} />
          <OrderHelpCard number={order.number} />
          <OrderPrintButton order={order} />
        </aside>
      </div>
    </>
  );
};
