import { useTranslations } from "next-intl";
import { TELEGRAM_URL, VIBER_URL } from "@/entities/store/model/contacts";

/** Серед результатів: головний страх — купити не ту деталь; знімаємо його безкоштовною перевіркою. */
export const VinCheckBanner = () => {
  const t = useTranslations("search");

  return (
    <aside className="flex flex-col gap-3 rounded-xl bg-[#2E2E2E] p-4 text-white md:flex-row md:items-center md:gap-5 md:px-5">
      <div className="flex flex-1 flex-col gap-1">
        <p className="m-0 text-base font-extrabold md:text-lg">{t("vinBannerTitle")}</p>
        <p className="m-0 text-sm text-[#DADADA] md:text-[15px]">{t("vinBannerText")}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 md:flex">
        <a href={VIBER_URL} className="flex h-11 items-center justify-center rounded-lg bg-[#7360F2] px-5 font-extrabold text-white">
          Viber
        </a>
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center rounded-lg bg-[#229ED9] px-5 font-extrabold text-white">
          Telegram
        </a>
      </div>
    </aside>
  );
};
