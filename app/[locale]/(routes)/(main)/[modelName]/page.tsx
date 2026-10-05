import { getProductsByModel } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import { FC } from "react";
import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import { toProductPage } from "@/features/catalog/fetch-product-page";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fetchModelDetails } from "@/lib/api";
import { notFoundOn404 } from "@/lib/api/not-found-on-404";
import { RelatedCategoryLinks } from "@/components/seo/related-category-links";
import { getModelSeo } from "./model-seo";

const Products = dynamic(() => import("../../_components/products"), {
  ssr: true,
});

interface HomeProps {
  params: {
    locale: string;
    modelName: string;
  };
}

// Порожній список: сторінка моделі рендериться при першому запиті й далі
// віддається з кешу. Без цієї функції Next 14 рендерить її на кожен запит.
export const generateStaticParams = () => [];

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { modelName } = params;
  const [model, products] = await Promise.all([
    // Невідома адреса (/about-us) — справжня 404. Саме тут, а не в сторінці:
    // метадані резолвляться до стрімінгу, а після loading.tsx статус уже 200.
    fetchModelDetails(modelName).catch(notFoundOn404),
    getProductsByModel({ pageSize: 52, modelName }),
  ]);
  const alternates = buildAlternates(`/${modelName}`, params.locale);

  // Модель без товарів — тонка сторінка: не індексуємо, але посилання Google проходить.
  if (!products?.products?.length) {
    return { alternates, robots: { index: false, follow: true } };
  }

  const seo = await getModelSeo({
    locale: params.locale,
    modelName: model.name,
    productCount: products.meta?.totalProducts ?? products.products.length,
  });
  return { alternates, title: seo.title, description: seo.description };
}

// searchParams навмисно не читаємо: сторінка кешується, а фільтри з адреси
// підхоплює список у браузері (useListParams).
const Home: FC<HomeProps> = async ({ params }) => {
  const { modelName } = params;
  // Без цього getTranslations читає мову з headers() і сторінка стає динамічною.
  setRequestLocale(params.locale);
  const [model, products, t] = await Promise.all([
    fetchModelDetails(modelName).catch(notFoundOn404),
    getProductsByModel({ pageSize: 52, modelName }),
    getTranslations(),
  ]);

  const first = toProductPage(products);
  const seo = await getModelSeo({
    locale: params.locale,
    modelName: model.name,
    productCount: products?.meta?.totalProducts ?? first.products.length,
  });

  return (
    <MainSection title={seo.h1}>
      {first.products.length ? (
        <Products
          products={first.products}
          page={first.page}
          totalPages={first.totalPages}
          modelId={modelName}
        />
      ) : (
        <NotFoundItems text={t("filters.notFoundInCategory")} />
      )}
      {products?.related && (
        <div className="mt-6">
          <RelatedCategoryLinks
            title={t("seo.modelCategoriesTitle", { model: seo.model })}
            categories={products.related.categories}
            modelSlug={modelName}
          />
        </div>
      )}
    </MainSection>
  );
};

export default Home;
