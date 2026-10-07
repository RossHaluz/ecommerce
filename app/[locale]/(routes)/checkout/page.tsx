import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCurrentUser } from "@/actions/get-data";
import Checkout from "./_components/checkout";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "checkout" });
  return {
    title: t("title"),
    // Оформлення не має сенсу у видачі.
    robots: { index: false, follow: true },
  };
}

const CheckoutPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  setRequestLocale(locale);
  const [t, user] = await Promise.all([getTranslations("checkout"), getCurrentUser()]);

  return (
    <div className="bg-[#F2F2F2]">
      <div className="container flex flex-col gap-4 py-4 lg:gap-6 lg:py-8">
        {/* На телефоні заголовок уже в шапці оформлення. */}
        <h1 className="m-0 text-[32px] font-extrabold text-[#2E2E2E] max-lg:sr-only">{t("title")}</h1>
        <Checkout user={user} />
      </div>
    </div>
  );
};

export default CheckoutPage;
