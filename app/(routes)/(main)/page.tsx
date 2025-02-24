import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getAllProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import { FC } from "react";

export const fetchCache = "force-cache";
export const revalidate = 60;

const Products = dynamic(() => import("../_components/products"), {
  ssr: false,
});

interface HomeProps {
  searchParams: {
    filterIds: string;
    page: string;
    searchValue: string;
    sortByPrice: string;
    modelId: string;
  };
}

const ProductsWrapper = async ({ searchParams }: HomeProps) => {
  const { filterIds, page, sortByPrice, modelId } = searchParams;

  const products = await getAllProducts({
    page,
    filterIds,
    sortByPrice,
    modelId,
    pageSize: 30,
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

const Home: FC<HomeProps> = ({ searchParams }) => {
  return (
    <MainSection title="Запчастини до Audi" params={searchParams}>
      <Suspense fallback={<p>Завантаження товарів...</p>}>
        <ProductsWrapper searchParams={searchParams} />
      </Suspense>
    </MainSection>
  );
};

export default Home;
