import React from "react";
import Categories from "./_components/categories";
import { getCategories } from "@/actions/get-data";
import Section from "@/components/section";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";

export const revalidate = 60;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return { alternates: buildAlternates("/categories", params.locale) };
}

const CategoriesPage = async () => {
  const categories = (await getCategories()) || [];
  const t = await getTranslations("nav");

  return (
    <Section title={t("categories")} titleAs="h1" sectionStyles="mt-[100px]">
      <Categories categories={categories} />
    </Section>
  );
};

export default CategoriesPage;
