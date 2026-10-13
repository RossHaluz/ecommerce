"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useCategories } from "../../hooks/use-categories";
import { categoryHref } from "../../lib/category-href";
import { cn } from "@/lib/utils";

const CHIP = "flex h-10 shrink-0 items-center rounded-full px-3.5 text-sm font-bold";

/** Телефон: категорії одним рядом під пальцем; на ПК для цього є бічне меню. */
export const CategoryChips = () => {
  const t = useTranslations("nav");
  const { data: categories = [] } = useCategories();
  const params = useParams<{ categoryId?: string; modelName?: string }>();
  const active = params?.categoryId;
  const allHref = params?.modelName ? `/${params.modelName}` : "/";

  return (
    <nav aria-label={t("categories")} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden">
      <Link href={allHref} className={cn(CHIP, !active ? "bg-[#2E2E2E] text-white" : "border border-[#DDDDDD] bg-white text-[#2E2E2E]")}>
        {t("all")}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={categoryHref(category.category_name, params?.modelName)}
          aria-current={category.category_name === active ? "page" : undefined}
          className={cn(CHIP, category.category_name === active ? "bg-[#2E2E2E] text-white" : "border border-[#DDDDDD] bg-white text-[#2E2E2E]")}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
};
