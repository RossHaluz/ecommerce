import { useTranslations } from "next-intl";
import { ContactButtons } from "@/components/contacts/contact-buttons";
import { MAIN_PHONE } from "@/entities/store/model/contacts";

/** Дорогу деталь купують після розмови з продавцем — даємо три найкоротші дороги до нього. */
export const FitHelpCard = () => {
  const t = useTranslations("product");
  const tContact = useTranslations("contact");

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-[#FFFDFD] p-4 lg:p-6">
      <h2 className="m-0 text-lg lg:text-xl font-extrabold text-[#2E2E2E]">{t("helpTitle")}</h2>
      <p className="m-0 text-sm lg:text-[15px] leading-relaxed text-[#484848]">{t("helpText")}</p>
      <ContactButtons />
      <p className="m-0 text-[13px] leading-[18px] text-[#6B6B6B]">
        {MAIN_PHONE.display} · {tContact("scheduleWeekdays")}
        <br />
        {tContact("addressValue")}
      </p>
    </section>
  );
};
