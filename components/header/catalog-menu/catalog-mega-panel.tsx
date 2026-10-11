"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCategories } from "@/features/catalog";
import { categoryHref } from "@/features/catalog/lib/category-href";
import type { Category } from "@/lib/types";
import { CatalogRootList } from "./catalog-root-list";
import { CatalogSubPane } from "./catalog-sub-pane";

export const CatalogMegaPanel = ({ onNavigate }: { onNavigate: () => void }) => {
  const { data: categories = [] } = useCategories();
  const params = useParams<{ modelName?: string }>();
  const t = useTranslations("nav");
  const [activeId, setActiveId] = useState<string>();
  const active = categories.find((category) => category.id === activeId) ?? categories[0];
  const hrefOf = (category: Category) => categoryHref(category.category_name, params?.modelName);

  return (
    <nav
      aria-label={t("catalogProducts")}
      className="grid h-[min(540px,calc(100vh-140px))] grid-cols-[300px_minmax(0,1fr)] overflow-hidden rounded-xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.2)]"
    >
      <CatalogRootList
        categories={categories}
        activeId={active?.id}
        hrefOf={hrefOf}
        onActivate={setActiveId}
        onNavigate={onNavigate}
      />
      {active && <CatalogSubPane category={active} hrefOf={hrefOf} onNavigate={onNavigate} />}
    </nav>
  );
};
