import { useTranslations } from "next-intl";
import Logo from "@/components/ui/logo";
import { STORE_EMAIL } from "@/entities/store/model/contacts";

export const FooterAbout = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-3 py-3 text-sm leading-5 md:py-0">
      <Logo className="text-[22px] md:text-[26px]" />
      <p className="hidden md:block">{t("footer.about")}</p>
      <address className="not-italic">
        {t("contact.addressValue")}
        <br />
        {t("contact.scheduleWeekdays")}, {t("contact.scheduleWeekend")}
      </address>
      <a href={`mailto:${STORE_EMAIL}`} className="text-[#E4E4E4] hover:text-white">
        {STORE_EMAIL}
      </a>
    </div>
  );
};
