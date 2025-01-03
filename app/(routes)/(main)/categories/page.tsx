import Section from "@/components/section";
import React from "react";
import Categories from "./_components/categories";
import { getCategories } from "@/actions/get-data";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const CategoriesPage = async () => {
  const categories = (await getCategories()) || [];

  return (
    <Section title="Категорії">
      <Categories categories={categories} />
    </Section>
  );
};

export default CategoriesPage;
