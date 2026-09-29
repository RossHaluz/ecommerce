import { getAllProducts, getCategories, getModels } from "@/actions/get-data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const data = await getAllProducts({ pageSize: 10000 });
  const models = await getModels();

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

  const modelEntries: MetadataRoute.Sitemap = (models ?? []).map((model) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${model.modelName}`,
  }));

  const categoryModelEntries: MetadataRoute.Sitemap = (categories ?? []).flatMap(
    (category) =>
      (models ?? []).map((model) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category.category_name}/${model.modelName}`,
      }))
  );

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
