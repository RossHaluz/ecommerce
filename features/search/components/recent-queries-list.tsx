"use client";

import { Clock, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface RecentQueriesListProps {
  queries: string[];
  onSearch: (query: string) => void;
  onForget: (query: string) => void;
  onClear: () => void;
}

export const RecentQueriesList = ({ queries, onSearch, onForget, onClear }: RecentQueriesListProps) => {
  const t = useTranslations("search");
  if (!queries.length) return null;

  return (
    <section className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#8A8A8A]">{t("recent")}</h3>
        <button type="button" onClick={onClear} className="min-h-[44px] text-sm font-bold text-[#C0092A]">
          {t("clearRecent")}
        </button>
      </div>
      <ul className="flex flex-col">
        {queries.map((query) => (
          <li key={query} className="flex items-center rounded-lg hover:bg-[#F5F5F5]">
            <button type="button" onClick={() => onSearch(query)} className="flex min-h-[44px] min-w-0 flex-1 items-center gap-3 px-2 text-left text-[15px] text-[#2E2E2E]">
              <Clock aria-hidden className="h-4 w-4 shrink-0 text-[#8A8A8A]" />
              <span className="truncate">{query}</span>
            </button>
            <button
              type="button"
              onClick={() => onForget(query)}
              aria-label={t("removeRecent", { query })}
              className="flex h-11 w-11 shrink-0 items-center justify-center text-[#8A8A8A] hover:text-[#2E2E2E]"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
