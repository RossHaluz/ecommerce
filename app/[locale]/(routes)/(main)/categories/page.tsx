import React from "react";
import Categories from "./_components/categories";
import { getCategories } from "@/actions/get-data";
import Section from "@/components/section";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

const CategoriesPage = async () => {
  const categories = (await getCategories()) || [];
  const t = await getTranslations("nav");

  return (
    <Section title={t("categories")} sectionStyles="mt-[100px]">
      <Categories categories={categories} />
    </Section>
  );
};

export default CategoriesPage;
