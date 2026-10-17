import { useTranslations } from "next-intl";

export const SearchTips = () => {
  const t = useTranslations("search");

  return (
    <section className="flex flex-col gap-2">
      <h3 className="m-0 text-base font-extrabold text-[#2E2E2E]">{t("tipsTitle")}</h3>
      <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-[#484848]">
        <li>{t("tipOe")}</li>
        <li>{t("tipShorter")}</li>
        <li>{t("tipModel")}</li>
      </ul>
    </section>
  );
};
