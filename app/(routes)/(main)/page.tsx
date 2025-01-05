import { getAllProducts } from "@/actions/get-data";
import { FC } from "react";
import Products from "../_components/products";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface HomeProps {
  searchParams: {
    filterIds: string;
    page: string;
    searchValue: string;
    sortByPrice: string;
    modelId: string;
  };
}

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const { filterIds, page, sortByPrice, modelId } = searchParams;

  const products = await getAllProducts({
    page,
    filterIds,
    sortByPrice,
    modelId,
  });

  return (
    <MainSection title="Запчастини до Audi" params={searchParams}>
      {products && products?.products?.length > 0 ? (
        <Products
          products={products?.products}
          page={products?.meta?.page}
          totalPages={products?.meta?.totalPages}
          searchParams={searchParams}
        />
      ) : (
        <NotFoundItems text="Товарів які відносяться до данної категорії не знайдено..." />
      )}
    </MainSection>
  );
};

export default Home;
