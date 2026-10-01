import React, { FC } from "react";
import NotFoundItems from "@/components/not-found-items";
import { getCategories, getCategoryDetails } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

const Products = dynamic(() => import("@/app/[locale]/(routes)/_components/products"), {
  ssr: true,
});

interface CategoryPageProps {
  params: {
    locale: string;
    categoryId: string;
  };
  searchParams: {
    page: string;
    stockStatus?: string;
    sortByPrice?: string;
    searchValue?: string;
    modelId: string;
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return (categories ?? []).map((category) => ({
    categoryId: category.category_name,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = params;

  let categoryName: string;

  const category = await getCategoryDetails({
    categoryId,
  });
  categoryName = category?.category?.name || "Запчастини під усі моделі Audi";

  return {
    alternates: buildAlternates(`/categories/${categoryId}`, params.locale),
    title: `Купити ${categoryName.toLowerCase()} на Audi (Ауді) за вигідною ціною в магазині Audiparts`,
    description: `Купити ${categoryName} на Audi (Ауді) в інтернет-магазині. ✓ Більше 4000 оригінальних деталей. ✓ Запчастини на Audi (Ауді) під модель A4, A5, A6, A7, A8, Q5, Q7, Q8. Доставка протягом 2-3 днів по всій Україні.`,
  };
}

const ProductsWrapper = async ({
  categoryId,
  searchParams,
}: {
  categoryId: string;
  searchParams: CategoryPageProps["searchParams"];
}) => {
  const {
    page = "1",
    sortByPrice = "",
    stockStatus,
  } = searchParams;

  const category = await getCategoryDetails({
    categoryId,
    page,
    sortByPrice,
    stockStatus,
    pageSize: "50",
  });


  if (!category || !category.products || category.products.length === 0) {
    const t = await getTranslations("filters");
    return <NotFoundItems text={t("notFoundInCategory")} />;
  }

  return (
    <Products
      key={categoryId}
      products={category.products}
      page={category.meta?.page || 1}
      totalPages={category.meta?.totalPages || 1}
      searchParams={searchParams}
      categoryId={categoryId}
    />
  );
};

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId } = params;

  const category = await getCategoryDetails({
    categoryId,
  });

  const categoryName = category?.category?.name || "Запчастини до Audi";

  return (
    <MainSection title={categoryName} params={searchParams}>
      <ProductsWrapper categoryId={categoryId} searchParams={searchParams} />
    </MainSection>
  );
};

export default CategoryPage;
