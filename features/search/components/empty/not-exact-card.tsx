import { useTranslations } from "next-intl";
import { FindForMeForm } from "./find-for-me-form";

/** Під результатами: хто догорнув до кінця й не знайшов свого — не йде, а лишає заявку. */
export const NotExactCard = ({ query }: { query: string }) => {
  const t = useTranslations("search");

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-4 lg:flex-row lg:items-start lg:gap-8 lg:p-6">
      <div className="flex flex-col gap-1 lg:w-[360px] lg:shrink-0">
        <h2 className="m-0 text-lg font-extrabold text-[#2E2E2E]">{t("notExactTitle")}</h2>
        <p className="m-0 text-[15px] leading-6 text-[#484848]">{t("notExactText")}</p>
      </div>
      <div className="min-w-0 flex-1">
        <FindForMeForm query={query} />
      </div>
    </section>
  );
};
