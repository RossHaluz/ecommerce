import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { searchResultsHref } from "../../model/results-href";
import { FindForMeForm } from "./find-for-me-form";
import { SearchTips } from "./search-tips";

/**
 * Нічого не знайшли — не глухий кут, а заявка: менеджер шукає деталь під замовлення.
 * `withinModel`: шукали лише серед однієї моделі, тож спершу пропонуємо пошук по всіх.
 */
export const SearchEmptyState = ({ query, withinModel = false }: { query: string; withinModel?: boolean }) => {
  const t = useTranslations("search");

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="flex flex-col gap-4 rounded-xl bg-white p-4 lg:p-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="m-0 text-xl font-extrabold text-[#2E2E2E]">{t("emptyTitle")}</h2>
          <p className="m-0 text-[15px] leading-6 text-[#484848]">{t("emptyText", { query })}</p>
        </div>
        {withinModel && (
          <Link
            href={searchResultsHref(query, null)}
            className="flex min-h-[44px] items-center self-start rounded-lg border-2 border-[#C0092A] px-4 text-sm font-extrabold text-[#C0092A] hover:bg-[#FFF2F4]"
          >
            {t("searchAllModels")}
          </Link>
        )}
        <FindForMeForm query={query} />
      </section>
      <div className="rounded-xl bg-white p-4 lg:p-6">
        <SearchTips />
      </div>
    </div>
  );
};
