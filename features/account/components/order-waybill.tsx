import { useTranslations } from "next-intl";
import { formatTtn, novaPoshtaTrackingUrl } from "../model/waybill";
import { CopyButton } from "./copy-button";

/** The waybill with copy and a link to Nova Poshta; live movement inside the account comes with tracking. */
export const OrderWaybill = ({ ttn }: { ttn: string }) => {
  const t = useTranslations("account.order");

  return (
    <div className="flex flex-col gap-2.5 rounded-[10px] bg-[#F7F7F7] p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 flex-col">
          <span className="text-xs font-extrabold text-[#6B6B6B]">{t("ttn")}</span>
          <strong className="text-lg tracking-[.02em]">{formatTtn(ttn)}</strong>
        </span>
        <CopyButton text={ttn} label={t("copyTtn")} />
      </div>
      <a
        href={novaPoshtaTrackingUrl(ttn)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center justify-center rounded-[10px] border-2 border-[#C0092A] bg-white px-3 text-sm font-extrabold text-[#C0092A]"
      >
        {t("trackOnNp")}
      </a>
    </div>
  );
};
