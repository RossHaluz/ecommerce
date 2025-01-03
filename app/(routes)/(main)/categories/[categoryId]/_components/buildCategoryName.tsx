import { getCategoryDetails } from "@/actions/get-data";

const buildCategoryName = async (categoryId: string) => {
  let categoryName = "";

  const fetchCategoryChain = async (currentCategoryId: string) => {
    const currentCategory = await getCategoryDetails({
      categoryId: currentCategoryId,
    });

    if (currentCategory?.category?.parentId) {
      await fetchCategoryChain(currentCategory?.category?.parentId);
    }

    categoryName += (categoryName ? " " : "") + currentCategory?.category?.name;
  };
  await fetchCategoryChain(categoryId);

  return categoryName;
};

export default buildCategoryName;
