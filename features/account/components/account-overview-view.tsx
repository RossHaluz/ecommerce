import { useTranslations } from "next-intl";
import type { AccountOverview } from "../model/order-types";
import { AccountIdentity } from "./account-identity";
import { AccountLinks } from "./account-links";
import { ActiveOrderCard } from "./active-order-card";
import { ConfirmPhone } from "./confirm-phone";
import { OrdersEmpty } from "./orders-empty";
import { RecentOrders } from "./recent-orders";

export const AccountOverviewView = ({ overview }: { overview: AccountOverview }) => {
  const t = useTranslations("account");
  const { firstName, lastName, phone, phoneConfirmed, active, recent, counts } = overview;
  if (!phoneConfirmed) return <ConfirmPhone name={firstName} />;

  return (
    <>
      <div className="lg:hidden">
        <AccountIdentity firstName={firstName} lastName={lastName} phone={phone} />
      </div>
      <h1 className="m-0 hidden text-[28px] font-extrabold lg:block">
        {firstName ? t("greeting", { name: firstName }) : t("greetingNoName")}
      </h1>
      {active && <ActiveOrderCard order={active} />}
      {recent.length > 0 && <RecentOrders orders={recent} total={counts.all} />}
      {counts.all === 0 && <OrdersEmpty />}
      <AccountLinks />
    </>
  );
};
