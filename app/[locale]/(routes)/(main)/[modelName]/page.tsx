import { getModelDetails, getProductsByModel } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import { FC } from "react";
import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";


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

  let title: string;
  const model = await getModelDetails(modelName);
  title = model?.name || "Запчастини під усі моделі Audi";

  return {
    alternates: buildAlternates(`/${modelName}`, params.locale),
    title: `Купити запчастини на Audi (Ауді) ${title} за вигідною ціною в магазині Audiparts`,
    description: `Купити запчастини на Audi (Ауді) ${title} в інтернет-магазині. ✓ Більше 4000 оригінальних деталей. ✓ Запчастини на Audi (Ауді) під модель A4, A5, A6, A7, A8, Q5, Q7, Q8. Доставка протягом 2-3 днів по всій Україні.`,
  };
}

// searchParams навмисно не читаємо: сторінка кешується, а фільтри з адреси
// підхоплює список у браузері (useListParams).
const Home: FC<HomeProps> = async ({ params }) => {
  const { modelName } = params;
  // Без цього getTranslations читає мову з headers() і сторінка стає динамічною.
  setRequestLocale(params.locale);
  const [products, model, t] = await Promise.all([
    getProductsByModel({ pageSize: 52, modelName }),
    getModelDetails(modelName),
    getTranslations(),
  ]);

  const title = [t("common.allPartsTitle"), model?.name].filter(Boolean).join(" ");

  return (
    <MainSection title={title}>
      {products?.products?.length ? (
        <Products
          products={products.products}
          page={products.meta?.page}
          totalPages={products.meta?.totalPages}
          modelId={modelName}
        />
      ) : (
        <NotFoundItems text={t("filters.notFoundInCategory")} />
      )}
    </MainSection>
  );
};

export default Home;
