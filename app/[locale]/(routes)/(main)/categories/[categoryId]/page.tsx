import React, { FC } from "react";
import NotFoundItems from "@/components/not-found-items";
import { getCategories, getCategoryDetails } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import { toProductPage } from "@/features/catalog/fetch-product-page";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fetchCategoryProducts } from "@/lib/api";
import { notFoundOn404 } from "@/lib/api/not-found-on-404";
import { RelatedModelLinks } from "@/components/seo/related-model-links";
import { getCategorySeo } from "./category-seo";

const Products = dynamic(() => import("@/app/[locale]/(routes)/_components/products"), {
  ssr: true,
});

interface CategoryPageProps {
  params: {
    locale: string;
    categoryId: string;
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
  // Ті самі параметри, що й у сторінки: один запит у кеші даних на обидва виклики.
  const category = await getCategoryDetails({ categoryId, pageSize: "50" });
  const alternates = buildAlternates(`/categories/${categoryId}`, params.locale);

  if (!category?.category?.name || !category.products?.length) {
    return { alternates, robots: { index: false, follow: true } };
  }

  const seo = await getCategorySeo({
    locale: params.locale,
    categoryName: category.category.name,
    productCount: category.meta?.totalItem ?? category.products.length,
  });
  return { alternates, title: seo.title, description: seo.description };
}

// searchParams навмисно не читаємо: сторінка кешується, а фільтри з адреси
// підхоплює список у браузері (useListParams).
const CategoryPage: FC<CategoryPageProps> = async ({ params }) => {
  const { categoryId } = params;
  // Без цього getTranslations читає мову з headers() і сторінка стає динамічною.
  setRequestLocale(params.locale);
  const [category, t] = await Promise.all([
    fetchCategoryProducts({ categorySlug: categoryId, pageSize: "50" }).catch(notFoundOn404),
    getTranslations(),
  ]);

  const first = toProductPage(category);
  const seo = await getCategorySeo({
    locale: params.locale,
    categoryName: category.category.name,
    productCount: category.meta?.totalItem ?? first.products.length,
  });

  return (
    <MainSection title={seo.h1}>
      {first.products.length ? (
        <Products
          key={categoryId}
          products={first.products}
          page={first.page}
          totalPages={first.totalPages}
          categoryId={categoryId}
        />
      ) : (
        <NotFoundItems text={t("filters.notFoundInCategory")} />
      )}
      {category.related && (
        <div className="mt-6">
          <RelatedModelLinks
            title={t("seo.categoryModelsTitle", { category: seo.category })}
            models={category.related.models}
            categorySlug={categoryId}
          />
        </div>
      )}
    </MainSection>
  );
};

export default CategoryPage;
