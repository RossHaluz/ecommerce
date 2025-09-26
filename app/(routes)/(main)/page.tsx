import { getAllProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import { FC, Suspense } from "react";
import NotFoundItems from "@/components/not-found-items";
import dynamic from "next/dynamic";

interface HomeProps {
  searchParams: {
    page: string;
    searchValue: string;
    stockStatus: string;
    sortByPrice: string;
    modelId: string;
  };
}

const Products = dynamic(() => import("../_components/products"));

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const { page, sortByPrice, stockStatus } = searchParams;

  const initialProducts = await getAllProducts({
    page,
    sortByPrice,
    stockStatus,
    pageSize: 20,
  });

  if (
    !initialProducts ||
    !initialProducts.products ||
    initialProducts.products.length === 0
  ) {
    return (
      <NotFoundItems text="Товарів які відносяться до даної категорії не знайдено..." />
    );
  }


  return (
    <MainSection title="Запчастини до Audi" params={searchParams}>
      <Suspense fallback={<p>Завантаження продуктів...</p>}>
        <Products
          products={initialProducts.products}
          page={initialProducts.meta.page}
          totalPages={initialProducts.meta.totalPages}
          searchParams={searchParams}
        />
      </Suspense>
    </MainSection>
  );
};

export default Home;
