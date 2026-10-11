import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CatalogRootListProps {
  categories: Category[];
  activeId?: string;
  hrefOf: (category: Category) => string;
  onActivate: (id: string) => void;
  onNavigate: () => void;
}

export const CatalogRootList = ({ categories, activeId, hrefOf, onActivate, onNavigate }: CatalogRootListProps) => {
  const t = useTranslations("nav");

  return (
    <ul className="flex flex-col overflow-y-auto border-r border-[#EEEEEE] p-2">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={hrefOf(category)}
            onMouseEnter={() => onActivate(category.id)}
            onFocus={() => onActivate(category.id)}
            onClick={onNavigate}
            className={cn(
              "flex min-h-[38px] items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-[15px] text-[#2E2E2E]",
              category.id === activeId && "bg-[#FFF1F2] font-extrabold text-[#C0092A]",
            )}
          >
            {category.name}
            {Boolean(category.children?.length) && <ChevronRight size={16} className="shrink-0 opacity-50" aria-hidden />}
          </Link>
        </li>
      ))}
      <li>
        <Link href="/categories" onClick={onNavigate} className="flex h-[38px] items-center px-3 text-sm font-extrabold text-[#C0092A]">
          {t("allCategories")}
        </Link>
      </li>
    </ul>
  );
};
