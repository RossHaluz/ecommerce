"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useCategories } from "@/features/catalog";
import { FooterSection } from "./footer-section";

const VISIBLE_CATEGORIES = 4;

export const FooterCatalog = () => {
  const { data: categories = [] } = useCategories();
  const t = useTranslations();

  return (
    <FooterSection title={t("nav.catalogProducts")}>
      <ul className="flex flex-col gap-[15px] md:gap-5">
        {categories.slice(0, VISIBLE_CATEGORIES).map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.category_name}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      {categories.length > VISIBLE_CATEGORIES && (
        <Link href="/categories" className="underline font-bold">
          {t("common.showAll")}
        </Link>
      )}
    </FooterSection>
  );
};
