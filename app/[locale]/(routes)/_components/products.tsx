"use client";
import { FC, Suspense } from "react";
import type { CatalogScope } from "@/features/catalog";
import type { ListParams } from "@/features/catalog/lib/list-params";
import { Product } from "@/lib/types";
import { LiveProducts } from "./live-products";
import { ProductListLayout } from "./product-list-layout";

interface ProductsProps extends CatalogScope {
  products: Product[];
  page: number;
  totalPages: number;
  /** Параметри, для яких сервер відрендерив `products`; за замовчуванням — перша сторінка без фільтрів. */
  renderedFor?: ListParams;
}

/**
 * Fallback — серверна сторінка: саме вона потрапляє в кешований HTML (і для
 * Google), а живий список, що читає адресу, підхоплює її після гідратації.
 */
const Products: FC<ProductsProps> = ({ products, page, totalPages, renderedFor, categoryId, modelId }) => {
  const firstPage = { products, page: Number(page), totalPages: Number(totalPages) };

  return (
    <Suspense
      fallback={
        <ProductListLayout
          items={products}
          page={firstPage.page}
          totalPages={firstPage.totalPages}
          canShowMore={firstPage.page < firstPage.totalPages}
        />
      }
    >
      <LiveProducts scope={{ categoryId, modelId }} firstPage={firstPage} renderedFor={renderedFor} />
    </Suspense>
  );
};

export default Products;
