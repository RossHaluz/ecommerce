import { FC } from "react";
import Products from "../../_components/products";
import NotFoundItems from "@/components/not-found-items";
import { getProductsByModel } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { parseListParams } from "@/features/catalog/lib/list-params";
import { toProductPage } from "@/features/catalog/fetch-product-page";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface SearchPageProps {
  params: { modelName: string };
  searchParams: Record<string, string | undefined>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("search");
  return { title: t("pageTitle"), robots: { index: false, follow: true } };
}

/** Пошук у межах моделі — динамічний, як і загальний пошук. */
const SearchPage: FC<SearchPageProps> = async ({ searchParams, params }) => {
  const { modelName } = params;
  const listParams = parseListParams(new URLSearchParams(searchParams as Record<string, string>));
  const [data, t] = await Promise.all([
    getProductsByModel({ ...listParams, page: String(listParams.page), modelName }),
    getTranslations("search"),
  ]);
  const first = toProductPage(data, listParams.page);

  return (
    <MainSection
      title={t("resultsTitle", { query: listParams.searchValue ?? "" })}
      shouldBeCategories={false}
      shouldBeModels={false}
    >
      {first.products.length ? (
        <Products
          products={first.products}
          page={first.page}
          totalPages={first.totalPages}
          modelId={modelName}
          renderedFor={listParams}
        />
      ) : (
        <NotFoundItems text={t("noResults")} />
      )}
    </MainSection>
  );
};

export default SearchPage;
