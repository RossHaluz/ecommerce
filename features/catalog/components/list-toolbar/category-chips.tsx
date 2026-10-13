"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useCategories } from "../../hooks/use-categories";
import { categoryHref } from "../../lib/category-href";
import { activeCategory } from "../../lib/active-category";
import { cn } from "@/lib/utils";

const CHIP = "flex h-10 shrink-0 items-center rounded-full px-3.5 text-sm font-bold";
const chipTone = (isActive: boolean) => (isActive ? "bg-[#2E2E2E] text-white" : "border border-[#DDDDDD] bg-white text-[#2E2E2E]");

/**
 * Телефон: на ПК для цього бічне меню. Усередині категорії з підкатегоріями — сусіди по ній
 * («Уся оптика · Фари · Ліхтарі»), а не знову весь каталог.
 */
export const CategoryChips = () => {
  const t = useTranslations("nav");
  const { data: categories = [] } = useCategories();
  const params = useParams<{ categoryId?: string; modelName?: string }>();
  const { root, child } = activeCategory(categories, params?.categoryId);
  const hrefOf = (slug: string) => categoryHref(slug, params?.modelName);
  const branch = root?.children?.length ? root : undefined;

  const first = branch
    ? { href: hrefOf(branch.category_name), label: `${t("allIn")} ${branch.name.toLowerCase()}`, isActive: !child }
    : { href: params?.modelName ? `/${params.modelName}` : "/", label: t("all"), isActive: !root };
  const rest = (branch?.children ?? categories).map((item) => ({
    id: item.id,
    href: hrefOf(item.category_name),
    label: item.name,
    isActive: item.id === (branch ? child?.id : root?.id),
  }));

  return (
    <nav aria-label={t("categories")} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden">
      <Link href={first.href} aria-current={first.isActive ? "page" : undefined} className={cn(CHIP, chipTone(first.isActive))}>
        {first.label}
      </Link>
      {rest.map((chip) => (
        <Link key={chip.id} href={chip.href} aria-current={chip.isActive ? "page" : undefined} className={cn(CHIP, chipTone(chip.isActive))}>
          {chip.label}
        </Link>
      ))}
    </nav>
  );
};
