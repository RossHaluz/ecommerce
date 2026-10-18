import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { SearchFacet } from "../../model/types";
import { searchResultsHref } from "../../model/results-href";

interface RefineChipsProps {
  query: string;
  total: number;
  facets: SearchFacet[];
  modelSlug: string | null;
}

/** «26 товарів · Уточніть: Ліва 6 · Matrix 10…» — один дотик звужує список до того, що шукали. */
export const RefineChips = ({ query, total, facets, modelSlug }: RefineChipsProps) => {
  const t = useTranslations();

  return (
    // Телефон: один рядок, що гортається пальцем; три рядки чипів з'їдали б перший екран.
    <nav
      aria-label={t("search.refine")}
      className="-mx-4 flex items-center gap-2 overflow-x-auto bg-white px-4 py-2.5 md:mx-0 md:flex-wrap md:overflow-visible md:rounded-xl lg:px-4"
    >
      <span className="shrink-0 text-sm font-extrabold text-[#2E2E2E]">{t("search.resultsCount", { count: total })}</span>
      {facets.length > 0 && <span className="shrink-0 text-sm text-[#6B6B6B]">· {t("search.refine")}</span>}
      {facets.map((facet) => (
        <Link
          key={facet.key}
          href={searchResultsHref(`${query} ${facet.word}`, modelSlug)}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#D6D6D6] bg-white px-3.5 text-sm font-bold text-[#2E2E2E] hover:border-[#C0092A] hover:text-[#C0092A]"
        >
          {t(`productBadge.${facet.key}`)}
          <span className="font-semibold text-[#8A8A8A]">{facet.count}</span>
        </Link>
      ))}
    </nav>
  );
};
