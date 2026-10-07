import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import OrderDetails from "./_components/order-details";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "success" });
  return { title: t("metaTitle"), robots: { index: false, follow: true } };
}

const SuccessPage = ({ params: { locale } }: { params: { locale: string } }) => {
  setRequestLocale(locale);

  return (
    <div className="bg-[#F2F2F2]">
      <div className="container py-4 lg:py-8">
        <OrderDetails />
      </div>
    </div>
  );
};

export default SuccessPage;
