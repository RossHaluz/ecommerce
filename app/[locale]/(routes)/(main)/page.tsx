import { getAllProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";

const Products = dynamic(() => import("../_components/products"), {
  ssr: true,
});

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return { alternates: buildAlternates("/", params.locale) };
}

// searchParams навмисно не читаємо: сторінка кешується, а фільтри з адреси
// підхоплює список у браузері (useListParams).
const Home = async ({ params }: { params: { locale: string } }) => {
  // Без цього getTranslations читає мову з headers() і сторінка стає динамічною.
  setRequestLocale(params.locale);
  const [initialProducts, t] = await Promise.all([
    getAllProducts({ pageSize: 52 }),
    getTranslations(),
  ]);

  if (!initialProducts?.products?.length) {
    return <NotFoundItems text={t("filters.notFoundInCategory")} />;
  }

  return (
    <MainSection title={t("common.allPartsTitle")}>
      <Products
        products={initialProducts.products}
        page={initialProducts.meta.page}
        totalPages={initialProducts.meta.totalPages}
      />
    </MainSection>
  );
};

export default Home;
