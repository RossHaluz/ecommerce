import { getAllProducts, getCategories } from "@/actions/get-data";
import { MetadataRoute } from "next";
import { categoryModelPaths, modelPaths } from "@/lib/seo/catalog-paths";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const data = await getAllProducts({ pageSize: 10000 });

  const productEntries: MetadataRoute.Sitemap =
    data?.products
      ?.map(({ product_name }) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${product_name}`,
      }))
      .filter(Boolean) || [];

  const categoryEntries: MetadataRoute.Sitemap = (categories ?? []).map(
    (category) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category.category_name}`,
    })
  );

  const childCategoryEntries: MetadataRoute.Sitemap = (categories ?? [])
    .flatMap((category) => category.children ?? [])
    .map((child) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${child.category_name}`,
    }));

  // Лише сторінки з товарами: порожні Google вважає низькоякісними дублями.
  const products = data?.products ?? [];
  const toEntry = (path: string) => ({ url: `${process.env.NEXT_PUBLIC_BASE_URL}${path}` });

  const modelEntries: MetadataRoute.Sitemap = modelPaths(products).map(toEntry);

  const categoryModelEntries: MetadataRoute.Sitemap = categoryModelPaths(
    products,
    categories ?? []
  ).map(toEntry);

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
    },
    ...categoryEntries,
    ...childCategoryEntries,
    ...productEntries,
    ...modelEntries,
    ...categoryModelEntries,
  ];
}
