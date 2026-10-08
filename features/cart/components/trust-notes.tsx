import { useTranslations } from "next-intl";
import { richTags } from "@/i18n/rich-tags";

/** Знімає два головні сумніви перед кнопкою: «а якщо не підійде» і «а хто підтвердить». */
export const TrustNotes = () => {
  const t = useTranslations("checkout");

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-[#F7F7F7] p-3.5 text-[13px] text-[#484848]">
      <span>{t.rich("trustReturns", richTags)}</span>
      <span>{t.rich("trustCallback", richTags)}</span>
    </div>
  );
};
