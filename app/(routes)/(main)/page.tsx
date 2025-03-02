import dynamic from "next/dynamic";
import { getAllProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import { FC } from "react";

export const fetchCache = "force-cache";
export const revalidate = 300;

const Products = dynamic(() => import("../_components/products"), {
  ssr: true,
});

interface HomeProps {
  searchParams: {
    page: string;
    searchValue: string;
    sortByPrice: string;
  };
}

const ProductsWrapper = async ({ searchParams }: HomeProps) => {
  const { page, sortByPrice } = searchParams;

  const products = await getAllProducts({
    page,
    sortByPrice,
    pageSize: 20,
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
      <ProductsWrapper searchParams={searchParams} />
    </MainSection>
  );
};

export default Home;
