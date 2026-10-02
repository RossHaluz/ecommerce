import { FC } from "react";
import NotFoundItems from "@/components/not-found-items";
import { getSearchProducts } from "@/actions/get-data";
import MainSection from "@/components/main-section";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { parseListParams } from "@/features/catalog/lib/list-params";
import { toProductPage } from "@/features/catalog/fetch-product-page";

const Products = dynamic(() => import("@/app/[locale]/(routes)/_components/products"), {
  ssr: true,
});

interface SearchPageProps {
  searchParams: Record<string, string | undefined>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("search");
  return { title: t("pageTitle"), robots: { index: false, follow: true } };
}

/** Пошук лишається динамічним: запит і є вмістом сторінки. */
const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const listParams = parseListParams(new URLSearchParams(searchParams as Record<string, string>));
  const [data, t] = await Promise.all([
    getSearchProducts({
      ...listParams,
      page: String(listParams.page),
      searchValue: listParams.searchValue ?? "",
      modelId: searchParams.modelId,
    }),
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
          key={listParams.searchValue}
          products={first.products}
          page={first.page}
          totalPages={first.totalPages}
          renderedFor={listParams}
        />
      ) : (
        <NotFoundItems text={t("noResults")} />
      )}
    </MainSection>
  );
};

export default SearchPage;
