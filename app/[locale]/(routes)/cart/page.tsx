import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CartView } from "./_components/cart-view";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "cart" });
  // Кошик у кожного свій — у видачі йому нічого робити.
  return { title: t("metaTitle"), robots: { index: false, follow: true } };
}

const CartPage = ({ params: { locale } }: { params: { locale: string } }) => {
  setRequestLocale(locale);

  return (
    <div className="bg-[#F2F2F2]">
      <div className="container py-4 lg:py-8">
        <CartView />
      </div>
    </div>
  );
};

export default CartPage;
