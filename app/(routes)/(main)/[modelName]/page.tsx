import { Suspense } from "react";
import { getModelDetails, getProductsByModel } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import { FC } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const fetchCache = "force-cache";
export const revalidate = 60;

const Products = dynamic(() => import("../../_components/products"), {
  ssr: false,
});

interface HomeProps {
  searchParams: {
    page: string;
    searchValue: string;
    sortByPrice: string;
  };
  params: {
    modelName: string;
  };
}

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { modelName } = params;

  let title: string;
  const model = await getModelDetails(modelName);
  title = model.name || "Запчастини під усі моделі Audi";

  return {
    title: `Купити запчастини на Audi (Ауді) ${title} за вигідною ціною в магазині Audiparts`,
    description: `Купити запчастини на Audi (Ауді) ${title} в інтернет-магазині. ✓ Більше 4000 оригінальних деталей. ✓ Запчастини на Audi (Ауді) під модель A4, A5, A6, A7, A8, Q5, Q7, Q8. Доставка протягом 2-3 днів по всій Україні.`,
  };
}

const ProductsWrapper = async ({ searchParams, params }: HomeProps) => {
  const { page, sortByPrice } = searchParams;
  const { modelName } = params;

  const products = await getProductsByModel({
    page,
    sortByPrice,
    pageSize: 30,
    modelName,
  });

  if (!products || !products.products || products.products.length === 0) {
    return (
      <NotFoundItems text="Товарів які відносяться до данної категорії не знайдено..." />
    );
  }

  return products?.products?.length > 0 ? (
    <Products
      products={products?.products}
      page={products?.meta?.page}
      totalPages={products?.meta?.totalPages}
      searchParams={searchParams}
    />
  ) : (
    <NotFoundItems text="Товарів які відносяться до данної категорії не знайдено..." />
  );
};

const Home: FC<HomeProps> = async ({ searchParams, params }) => {
  const { modelName } = params;
  const model = await getModelDetails(modelName);
  const title = modelName
    ? `Запчастини до Audi ${model?.name}`
    : "Запчастини до Audi";
  return (
    <MainSection title={title} params={searchParams}>
      <Suspense fallback={<p>Завантаження товарів...</p>}>
        <ProductsWrapper searchParams={searchParams} params={params} />
      </Suspense>
    </MainSection>
  );
};

export default Home;
