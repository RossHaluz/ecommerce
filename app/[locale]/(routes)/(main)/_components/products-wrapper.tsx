"use client";

import { useQuery } from "@tanstack/react-query";
import NotFoundItems from "@/components/not-found-items";
import { getAllProducts } from "@/actions/get-data";
import Products from "../../_components/products";

interface ProductsWrapperProps {
  initialProducts: any;
  searchParams: {
    page: string;
    searchValue: string;
    stockStatus: string;
    sortByPrice: string;
  };
}

const ProductsWrapper = ({
  initialProducts,
  searchParams,
}: ProductsWrapperProps) => {
  const { page, sortByPrice, stockStatus } = searchParams;

  const { data, isPending } = useQuery({
    queryKey: ["products", page, sortByPrice],
    queryFn: async () => {
      return await getAllProducts({
        page,
        sortByPrice,
        stockStatus,
        pageSize: 50,
      });
    },
    initialData: initialProducts,
  });

  if (isPending) return <p>Завантаження...</p>;

  if (!data || !data.products || data.products.length === 0) {
    return <NotFoundItems text="Товарів не знайдено..." />;
  }

  return (
    <Products
      products={data.products}
      page={data.meta.page}
      totalPages={data.meta.totalPages}
      searchParams={searchParams}
    />
  );
};

export default ProductsWrapper;
