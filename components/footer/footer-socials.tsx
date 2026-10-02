import { useTranslations } from "next-intl";
import Telegram from "/public/images/telegram-icon.svg";
import { TELEGRAM_URL } from "@/entities/store/model/contacts";

/** На телефоні — лише іконки по центру, з md — під заголовком. */
export const FooterSocials = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="hidden md:block text-[24px] leading-[33.6px]">{t("nav.socials")}</h3>
      <div className="flex items-center justify-center md:justify-start gap-6">
        <a
          aria-label={t("footer.writeTelegram")}
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="h-auto"
        >
          <Telegram />
        </a>
      </div>
    </div>
  );
};
