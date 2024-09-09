import axios from "axios";
import Hero from "./_components/hero";
import Categories from "./_components/categories";
import BesrSellers from "./_components/best-sellers";
import Subscribe from "./_components/subscribe";
import { cookies } from 'next/headers';

export default async function Home() {
  const token = cookies().get('token')?.value;
  

  const { data: settings } = await axios.get(
    `${process.env.BACKEND_URL}/api/store/${process.env.STORE_ID}`
  );

  const { data: categories } = await axios.get(
    `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/categories`
  );

  const { data: bestSellersProducts } = await axios.get(
    `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/products/best`
  );

  return (
    <>
      <Hero
        heroTitle={settings.heroTitle}
        heroDesc={settings.heroDesc}
        heroImages={settings.heroImages}
      />
      <Categories categories={categories} />
      <BesrSellers bestSellersProducts={bestSellersProducts} />
      <Subscribe />

      {/* <News /> */}
    </>
  );
}
