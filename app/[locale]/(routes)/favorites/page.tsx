import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FavoritesView } from "@/features/favorites";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "favorites" });
  // Список у кожного свій, як і кошик — у видачі йому нічого робити.
  return { title: t("metaTitle"), robots: { index: false, follow: true } };
}

const FavoritesPage = ({ params: { locale } }: { params: { locale: string } }) => {
  setRequestLocale(locale);

  return (
    <div className="bg-[#F2F2F2]">
      <div className="container py-4 lg:py-8">
        <FavoritesView />
      </div>
    </div>
  );
};

export default FavoritesPage;
