import { useTranslations } from "next-intl";
import { TELEGRAM_URL } from "@/entities/store/model/contacts";

/** Номер змінюють після рестайлінгу: краще перепитати за VIN, ніж продати не ту деталь. */
export const OeRenumberNote = () => {
  const t = useTranslations("search");

  return (
    <p className="m-0 rounded-lg bg-[#F7F7F7] px-3 py-2.5 text-sm text-[#484848]">
      {t("renumberNote")}{" "}
      <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#C0092A] underline underline-offset-2">
        {t("checkByVin")}
      </a>
    </p>
  );
};
