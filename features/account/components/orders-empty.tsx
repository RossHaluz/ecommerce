import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const OrdersEmpty = ({ searched = false }: { searched?: boolean }) => {
  const t = useTranslations("account.orders");

  return (
    <div className="flex flex-col items-center gap-2 rounded-[14px] border border-dashed border-[#CFCFCF] bg-white p-5 text-center">
      <span className="text-[15px] text-[#484848]">{t(searched ? "nothingFound" : "empty")}</span>
      {!searched && (
        <Link href="/categories" className="font-extrabold text-[#C0092A]">
          {t("toCatalog")}
        </Link>
      )}
    </div>
  );
};
