import { notFound } from "next/navigation";
import { ApiError, fetchProductDetails, findProductSlugByArticle } from "@/lib/api";
import { permanentRedirect } from "@/i18n/routing";
import { productHref } from "@/entities/product/model/product-href";
import { articleFromSlug, renamedTo } from "@/entities/product/model/renamed-product";

const currentAddressOf = async (slug: string) => {
  const article = articleFromSlug(slug);
  return article ? renamedTo(slug, await findProductSlugByArticle(article)) : null;
};

/**
 * The product behind an address. A renamed product's old address (Google, bookmarks) moves permanently to the
 * current one instead of a 404; an address that names no product is a real 404.
 */
export async function loadProduct(slug: string, locale: string) {
  try {
    return await fetchProductDetails(slug);
  } catch (error) {
    if (!(error instanceof ApiError && error.isNotFound)) throw error;
    const current = await currentAddressOf(slug);
    if (current) permanentRedirect({ href: productHref(current), locale });
    notFound();
  }
}
