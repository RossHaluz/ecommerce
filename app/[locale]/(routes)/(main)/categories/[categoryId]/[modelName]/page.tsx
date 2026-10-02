import React, { FC } from "react";
import NotFoundItems from "@/components/not-found-items";
import { getCategoryByModel, getModelDetails } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import { toProductPage } from "@/features/catalog/fetch-product-page";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";

const Products = dynamic(() => import("@/app/[locale]/(routes)/_components/products"), {
  ssr: true,
});

interface CategoryPageProps {
  params: {
    locale: string;
    categoryId: string;
    modelName: string;
  };
}

// Порожній список: пар «категорія + модель» понад тисячу, тому не генеруємо їх
// при збірці — Next рендерить сторінку при першому запиті й далі віддає з кешу.
// Без цієї функції Next 14 рендерить такий маршрут на кожен запит (no-store).
export const generateStaticParams = () => [];

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
  const isEmpty = !category?.products?.length;

  return {
    alternates: buildAlternates(`/categories/${categoryId}/${modelName}`, params.locale),
    // Порожня пара — тонка сторінка: не індексуємо, але посилання з неї Google проходить.
    ...(isEmpty && { robots: { index: false, follow: true } }),
    title: `Купити ${categoryName.toLowerCase()} на Audi (Ауді) ${
      model?.name
    }  за вигідною ціною в магазині Audiparts`,
    description: `Купити ${categoryName}  на Audi (Ауді) ${model?.name} в інтернет-магазині. ✓ Більше 4000 оригінальних деталей. ✓ Запчастини на Audi (Ауді) під модель A4, A5, A6, A7, A8, Q5, Q7, Q8. Доставка протягом 2-3 днів по всій Україні.`,
  };
}

// searchParams навмисно не читаємо: сторінка кешується, а фільтри з адреси
// підхоплює список у браузері (useListParams).
const CategoryPage: FC<CategoryPageProps> = async ({ params }) => {
  const { categoryId, modelName } = params;
  // Без цього getTranslations читає мову з headers() і сторінка стає динамічною.
  setRequestLocale(params.locale);
  const [category, model, t] = await Promise.all([
    getCategoryByModel({ categoryId, modelName }),
    getModelDetails(modelName),
    getTranslations(),
  ]);

  const title = [category?.category?.name || t("common.allPartsTitle"), model?.name]
    .filter(Boolean)
    .join(" ");
  const first = toProductPage(category);

  return (
    <MainSection title={title}>
      {first.products.length ? (
        <Products
          products={first.products}
          page={first.page}
          totalPages={first.totalPages}
          modelId={modelName}
          categoryId={categoryId}
        />
      ) : (
        <NotFoundItems text={t("filters.notFoundInCategory")} />
      )}
    </MainSection>
  );
};

export default CategoryPage;
