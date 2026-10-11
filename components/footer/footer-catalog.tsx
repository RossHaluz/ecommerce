"use client";

import { useTranslations } from "next-intl";
import { useCategories } from "@/features/catalog";
import { FooterSection } from "./footer-section";
import { FooterLink } from "./footer-link";

const VISIBLE_CATEGORIES = 5;

export const FooterCatalog = () => {
  const { data: categories = [] } = useCategories();
  const t = useTranslations();

  return (
    <FooterSection title={t("nav.catalog")}>
      {categories.slice(0, VISIBLE_CATEGORIES).map((category) => (
        <FooterLink key={category.id} href={`/categories/${category.category_name}`}>
          {category.name}
        </FooterLink>
      ))}
      <FooterLink href="/categories">{t("footer.allCategories")}</FooterLink>
    </FooterSection>
  );
};
