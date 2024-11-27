import Categories from "./_components/categories";
import BesrSellers from "./_components/best-sellers";
import Subscribe from "./_components/subscribe";
import {
  getBestSellersProducts,
  getCategories,
  getStoreDetails,
} from "@/actions/get-data";
import HeroSlider from "./_components/hero-slider";

export default async function Home() {
  const store = await getStoreDetails();
  const categories = await getCategories("4");
  const bestSellersProducts = await getBestSellersProducts();

  return (
    <>
      <HeroSlider heroBillboards={store?.heroBillboards} />
      <Categories categories={categories} />
      <BesrSellers bestSellersProducts={bestSellersProducts} />
      <Subscribe />

      {/* <News /> */}
    </>
  );
}
