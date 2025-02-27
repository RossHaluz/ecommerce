import React from "react";
import Categories from "./_components/categories";
import { getCategories } from "@/actions/get-data";
import Section from "@/components/section";

const CategoriesPage = async () => {
  const categories = (await getCategories()) || [];

  return (
    <Section title="Категорії" sectionStyles="mt-20 mt-[100px]">
      <Categories categories={categories} />
    </Section>
  );
};

export default CategoriesPage;
