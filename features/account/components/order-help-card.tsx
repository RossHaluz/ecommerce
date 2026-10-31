import { useTranslations } from "next-intl";
import { TELEGRAM_URL, VIBER_URL } from "@/entities/store/model/contacts";

const CHANNEL = "flex h-11 items-center justify-center rounded-lg font-extrabold text-white";

export const OrderHelpCard = ({ number }: { number: number }) => {
  const t = useTranslations("account.order");

  return (
    <section aria-label={t("help")} className="flex flex-col gap-2.5 rounded-[14px] bg-[#2E2E2E] p-3.5 text-white lg:rounded-2xl lg:p-5">
      <strong className="text-base">{t("help")}</strong>
      <span className="text-sm text-[#DADADA]">{t("helpNote", { number })}</span>
      <div className="grid grid-cols-2 gap-2">
        <a href={VIBER_URL} target="_blank" rel="noopener noreferrer" className={`${CHANNEL} bg-[#7360F2]`}>
          {t("viber")}
        </a>
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${CHANNEL} bg-[#229ED9]`}>
          {t("telegram")}
        </a>
      </div>
    </section>
  );
};
