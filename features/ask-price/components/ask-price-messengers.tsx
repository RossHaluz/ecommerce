import { useTranslations } from "next-intl";
import { TELEGRAM_URL, viberDraftUrl } from "@/entities/store/model/contacts";

/** Хто не хоче лишати телефон — пише сам; у Viber текст уже набрано. */
export const AskPriceMessengers = ({ text }: { text: string }) => {
  const t = useTranslations("askPrice");

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-[#6B6B6B]">{t("orWrite")}</span>
      <div className="grid grid-cols-2 gap-2">
        <a href={viberDraftUrl(text)} className="flex h-11 items-center justify-center rounded-lg bg-[#7360F2] font-extrabold text-white">
          Viber
        </a>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center rounded-lg bg-[#229ED9] font-extrabold text-white"
        >
          Telegram
        </a>
      </div>
    </div>
  );
};
