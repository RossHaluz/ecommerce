import { getAllProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import { toProductPage } from "@/features/catalog/fetch-product-page";
import { FaqSection } from "@/components/seo/faq-section";
import { getCatalogFaq } from "@/lib/seo/catalog-faq";

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
  const [data, t] = await Promise.all([getAllProducts({ pageSize: 52 }), getTranslations()]);
  const first = toProductPage(data);

  if (!first.products.length) {
    return <NotFoundItems text={t("filters.notFoundInCategory")} />;
  }

  const title = t("common.allPartsTitle");
  const faq = await getCatalogFaq({ locale: params.locale, subject: title, count: data?.meta?.totalProducts ?? first.products.length });

  return (
    <MainSection title={title}>
      <Products products={first.products} page={first.page} totalPages={first.totalPages} />
      <FaqSection title={t("seo.faqTitle")} items={faq} />
    </MainSection>
  );
};

export default Home;
