import React, { FC } from "react";
import NotFoundItems from "@/components/not-found-items";
import { getCategoryByModel, getModelDetails } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import { toProductPage } from "@/features/catalog/fetch-product-page";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedLinks } from "@/components/seo/related-links";
import { getCategoryModelSeo } from "./category-model-seo";

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
  const [category, model] = await Promise.all([
    getCategoryByModel({ categoryId, modelName }),
    getModelDetails(modelName),
  ]);
  const alternates = buildAlternates(`/categories/${categoryId}/${modelName}`, params.locale);

  // Порожня пара чи невідома модель — тонка сторінка: не індексуємо, але посилання Google проходить.
  if (!category?.products?.length || !category?.category?.name || !model?.name) {
    return { alternates, robots: { index: false, follow: true } };
  }

  const seo = await getCategoryModelSeo({
    locale: params.locale,
    categoryName: category.category.name,
    modelName: model.name,
    productCount: category.meta?.totalItem ?? category.products.length,
  });
  return { alternates, title: seo.title, description: seo.description };
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

  const first = toProductPage(category);
  const seo =
    category?.category?.name && model?.name
      ? await getCategoryModelSeo({
          locale: params.locale,
          categoryName: category.category.name,
          modelName: model.name,
          productCount: category.meta?.totalItem ?? first.products.length,
        })
      : null;

  return (
    <MainSection title={seo?.h1 ?? t("common.allPartsTitle")}>
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
      {seo && category?.related && (
        <RelatedLinks
          related={category.related}
          categorySlug={categoryId}
          modelSlug={modelName}
          categoriesTitle={t("seo.relatedCategoriesTitle", { model: seo.model })}
          modelsTitle={t("seo.relatedModelsTitle", { category: seo.category })}
        />
      )}
    </MainSection>
  );
};

export default CategoryPage;
