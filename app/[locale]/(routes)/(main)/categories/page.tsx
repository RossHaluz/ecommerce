import React from "react";
import Categories from "./_components/categories";
import { getCategories } from "@/actions/get-data";
import Section from "@/components/section";
import { buildPageMetadata, getPageSeo } from "@/lib/seo/page-seo";

export const revalidate = 60;

// Без власного заголовка сторінка брала заголовок головної й забирала в неї запити «запчастини ауді».
export const generateMetadata = ({ params }: { params: { locale: string } }) => buildPageMetadata(params.locale, "catalog", "/categories");

const CategoriesPage = async ({ params }: { params: { locale: string } }) => {
  const [categories, seo] = await Promise.all([getCategories(), getPageSeo(params.locale, "catalog")]);

  return (
    <Section title={seo.h1} titleAs="h1">
      <Categories categories={categories ?? []} />
    </Section>
  );
};

export default CategoriesPage;
