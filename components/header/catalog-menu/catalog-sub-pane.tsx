import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Category } from "@/lib/types";

interface CatalogSubPaneProps {
  category: Category;
  hrefOf: (category: Category) => string;
  onNavigate: () => void;
}

export const CatalogSubPane = ({ category, hrefOf, onNavigate }: CatalogSubPaneProps) => {
  const t = useTranslations("nav");
  const children = category.children ?? [];

  return (
    <div className="flex flex-col gap-3.5 overflow-y-auto px-6 py-5">
      <Link href={hrefOf(category)} onClick={onNavigate} className="text-xl font-extrabold text-[#2E2E2E] hover:text-[#C0092A]">
        {category.name} <span className="text-sm font-normal text-[#6B6B6B]">· {t("allParts")}</span>
      </Link>
      {children.length > 0 && (
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
          {children.map((child) => (
            <li key={child.id}>
              <Link
                href={hrefOf(child)}
                onClick={onNavigate}
                className="flex min-h-[38px] items-center border-b border-[#F2F2F2] py-1.5 text-[15px] text-[#2E2E2E] hover:text-[#C0092A]"
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
