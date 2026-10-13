"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCategories } from "../../hooks/use-categories";
import { categoryHref } from "../../lib/category-href";
import { activeCategory } from "../../lib/active-category";
import { CategorySidebarLink } from "./category-sidebar-link";

/** Справжні посилання (їх бачить Google), поточна категорія розгорнута — видно, де ти і що поруч. */
export const CategorySidebar = () => {
  const t = useTranslations("nav");
  const { data: categories = [], isPending } = useCategories();
  const params = useParams<{ categoryId?: string; modelName?: string }>();
  const { root, child } = activeCategory(categories, params?.categoryId);
  const hrefOf = (slug: string) => categoryHref(slug, params?.modelName);

  // isPending, не isLoading: у TanStack v5 isLoading на сервері false, а на клієнті true — ламало гідратацію.
  if (isPending) return <div className="h-[520px] rounded-xl bg-white" />;

  return (
    <nav aria-label={t("categories")} className="flex flex-col gap-0.5 rounded-xl bg-white p-2">
      <CategorySidebarLink href={params?.modelName ? `/${params.modelName}` : "/"} label={t("everyPart")} isActive={!root} />
      {categories.map((category) => {
        const isOpen = category.id === root?.id;
        return (
          <div key={category.id} className="flex flex-col gap-0.5">
            <CategorySidebarLink
              href={hrefOf(category.category_name)}
              label={category.name}
              isActive={isOpen && !child}
              hasChildren={!isOpen && Boolean(category.children?.length)}
            />
            {isOpen &&
              category.children?.map((sub) => (
                <CategorySidebarLink key={sub.id} href={hrefOf(sub.category_name)} label={sub.name} isActive={sub.id === child?.id} isChild />
              ))}
          </div>
        );
      })}
    </nav>
  );
};
