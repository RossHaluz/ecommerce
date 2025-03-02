import React, { FC } from "react";
import NotFoundItems from "@/components/not-found-items";
import { getCategoryByModel, getModelDetails } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const fetchCache = "force-cache";
export const revalidate = 300;

const Products = dynamic(() => import("@/app/(routes)/_components/products"), {
  ssr: true,
});

interface CategoryPageProps {
  params: {
    categoryId: string;
    modelName: string;
  };
  searchParams: {
    page?: string;
    sortByPrice?: string;
    searchValue?: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId, modelName } = params;

  let categoryName: string;

  const category = await getCategoryByModel({
    categoryId,
    modelName,
  });
  const model = await getModelDetails(modelName);
  categoryName = category?.category?.name || "Запчастини під усі моделі Audi";

  return {
    title: `Купити ${categoryName.toLowerCase()} на Audi (Ауді) ${
      model?.name
    }  за вигідною ціною в магазині Audiparts`,
    description: `Купити ${categoryName}  на Audi (Ауді) ${model?.name} в інтернет-магазині. ✓ Більше 4000 оригінальних деталей. ✓ Запчастини на Audi (Ауді) під модель A4, A5, A6, A7, A8, Q5, Q7, Q8. Доставка протягом 2-3 днів по всій Україні.`,
  };
}

const ProductsWrapper = async ({
  categoryId,
  modelName,
  searchParams,
}: {
  categoryId: string;
  modelName: string;
  searchParams: CategoryPageProps["searchParams"];
}) => {
  const { page = "1", sortByPrice = "" } = searchParams;

  const category = await getCategoryByModel({
    categoryId,
    page,
    sortByPrice,
    modelName,
  });

  if (!category || !category.products || category.products.length === 0) {
    return (
      <NotFoundItems text="Товарів які відносяться до даної категорії не знайдено..." />
    );
  }

  return (
    <Products
      products={category.products}
      page={category.meta?.page || 1}
      totalPages={category.meta?.totalPages || 1}
      searchParams={{ page }}
    />
  );
};

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId, modelName } = params;

  const category = await getCategoryByModel({
    categoryId,
    modelName,
  });

  const categoryName = category?.category?.name || "Запчастини до Audi";
  const model = await getModelDetails(modelName);

  return (
    <MainSection title={`${categoryName} ${model?.name}`} params={searchParams}>
      <ProductsWrapper
        categoryId={categoryId}
        modelName={modelName}
        searchParams={searchParams}
      />
    </MainSection>
  );
};

export default CategoryPage;
