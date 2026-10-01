import { getAllProducts, getCategories } from "@/actions/get-data";
import { MetadataRoute } from "next";
import { categoryModelPaths, modelPaths } from "@/lib/seo/catalog-paths";

const toEntry = (path: string) => ({ url: `${process.env.NEXT_PUBLIC_BASE_URL}${path}` });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, data] = await Promise.all([
    getCategories(),
    getAllProducts({ pageSize: 10000 }),
  ]);

  // Next перебудовує sitemap у фоні (revalidate запитів каталогу, 5 хв). Помилка
  // змушує його лишити попередню версію, а не віддати Google обрізану.
  if (!categories?.length || !data?.products?.length) {
    throw new Error("sitemap: каталог не завантажився");
  }
  const { products } = data;

  return [
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}`, lastModified: new Date() },
    ...categories
      .flatMap((category) => [category, ...(category.children ?? [])])
      .map((category) => toEntry(`/categories/${category.category_name}`)),
    ...products.map(({ product_name }) => toEntry(`/product/${product_name}`)),
    // Лише сторінки з товарами: порожні Google вважає низькоякісними дублями.
    ...modelPaths(products).map(toEntry),
    ...categoryModelPaths(products, categories).map(toEntry),
  ];
}
