import { useTranslations } from "next-intl";
import type { OrdersTab } from "../model/order-types";

/** A plain GET form: the search lives in the address, so it survives a reload and needs no client state. */
export const OrdersSearch = ({ tab, query }: { tab: OrdersTab; query: string }) => {
  const t = useTranslations("account.orders");

  return (
    <form role="search" className="flex w-full gap-2 lg:max-w-[420px]">
      {tab !== "all" && <input type="hidden" name="tab" value={tab} />}
      <label className="flex h-11 min-w-0 grow items-center rounded-xl bg-white px-3.5">
        <span className="sr-only">{t("searchLabel")}</span>
        <input
          name="q"
          defaultValue={query}
          placeholder={t("searchPlaceholder")}
          className="w-full min-w-0 border-0 bg-transparent text-base outline-none"
        />
      </label>
      <button type="submit" className="h-11 shrink-0 rounded-xl bg-[#2E2E2E] px-4 text-sm font-extrabold text-white">
        {t("search")}
      </button>
    </form>
  );
};
