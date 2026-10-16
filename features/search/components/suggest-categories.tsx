"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { SuggestCategory } from "../model/types";
import { categoryHref } from "../model/results-href";

interface SuggestCategoriesProps {
  categories: SuggestCategory[];
  modelSlug: string | null;
  onPick: () => void;
}

export const SuggestCategories = ({ categories, modelSlug, onPick }: SuggestCategoriesProps) => {
  const t = useTranslations("search");
  if (!categories.length) return null;

  return (
    <section className="flex flex-col gap-1">
      <h3 className="px-2 text-xs font-extrabold uppercase tracking-wide text-[#8A8A8A]">{t("inCategories")}</h3>
      <ul className="flex flex-col">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={categoryHref(category.slug, modelSlug)}
              onClick={onPick}
              className="flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-2 text-[15px] text-[#2E2E2E] hover:bg-[#F5F5F5]"
            >
              <span className="min-w-0 truncate">
                {category.parentName && <span className="text-[#8A8A8A]">{category.parentName} › </span>}
                {category.name}
              </span>
              <span className="shrink-0 rounded-full bg-[#F0F0F0] px-2 text-xs font-bold text-[#6B6B6B]">{category.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
