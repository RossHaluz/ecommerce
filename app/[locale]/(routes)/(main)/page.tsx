import { getAllProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import NotFoundItems from "@/components/not-found-items";
import dynamic from "next/dynamic";

const Products = dynamic(() => import("../_components/products"), {
  ssr: true,
});


interface HomeProps {
  searchParams: {
    page: string;
    searchValue: string;
    stockStatus: string;
    sortByPrice: string;
    modelId: string;
  };
}


const Home = async ({ searchParams }: HomeProps) => {
  const { page, sortByPrice, stockStatus } = searchParams;

  const initialProducts = await getAllProducts({
    page,
    sortByPrice,
    stockStatus,
    pageSize: 52,
  });

  if (!initialProducts?.products?.length) {
    return (
      <NotFoundItems text="Товарів які відносяться до даної категорії не знайдено..." />
    );
  }

  return (
    <MainSection title="Запчастини до Audi" params={searchParams}>
      <Products
        products={initialProducts.products}
        page={initialProducts.meta.page}
        totalPages={initialProducts.meta.totalPages}
        searchParams={searchParams}
      />
    </MainSection>
  );
};

export default Home;
