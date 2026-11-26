import { getAllProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toProductPage } from "@/features/catalog/fetch-product-page";
import { FaqSection } from "@/components/seo/faq-section";
import { getCatalogFaq } from "@/lib/seo/catalog-faq";
import { SeoText } from "@/components/seo/seo-text";
import { buildPageMetadata, getPageSeo } from "@/lib/seo/page-seo";

const Products = dynamic(() => import("../_components/products"), {
  ssr: true,
});

export const generateMetadata = ({ params }: { params: { locale: string } }) => buildPageMetadata(params.locale, "home", "/");

// searchParams навмисно не читаємо: сторінка кешується, а фільтри з адреси
// підхоплює список у браузері (useListParams).
const Home = async ({ params }: { params: { locale: string } }) => {
  // Без цього getTranslations читає мову з headers() і сторінка стає динамічною.
  setRequestLocale(params.locale);
  const [data, t, seo] = await Promise.all([getAllProducts({ pageSize: 52 }), getTranslations(), getPageSeo(params.locale, "home")]);
  const first = toProductPage(data);

  if (!first.products.length) {
    return <NotFoundItems text={t("filters.notFoundInCategory")} />;
  }

  // Довгий H1 у питанні FAQ звучить незграбно — там коротка назва розділу.
  const faq = await getCatalogFaq({ locale: params.locale, subject: t("common.allPartsTitle"), count: data?.meta?.totalProducts ?? first.products.length });

  return (
    <MainSection title={seo.h1}>
      <Products products={first.products} page={first.page} totalPages={first.totalPages} />
      <SeoText title={t("seo.home.title")} text={t("seo.home.text")} />
      <FaqSection title={t("seo.faqTitle")} items={faq} />
    </MainSection>
  );
};

export default Home;
