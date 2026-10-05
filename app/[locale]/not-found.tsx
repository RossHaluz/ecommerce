import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/api";
import { DEFAULT_LOCALE } from "@/i18n/locales";

// not-found не отримує params, а метадані рендеряться поза layout із setRequestLocale:
// без явної мови next-intl читає headers(), і в кешованому маршруті 404 стає 500.
export async function generateMetadata() {
  const t = await getTranslations({ locale: DEFAULT_LOCALE, namespace: "notFound" });

  return {
    title: `${t("metaTitle")} — Audiparts`,
    robots: { index: false, follow: true },
  };
}

/**
 * Не тупик, а розвилка.
 *
 * 404 — це трафік, який уже прийшов. Порожнє «нічого не знайдено» його
 * втрачає, тому даємо шлях далі: живі категорії й кнопки навігації. Людина,
 * яка шукала деталь за старим посиланням, лишається на сайті.
 */
const NotFound = async () => {
  const t = await getTranslations("notFound");
  const categories = (await getCategories())?.slice(0, 8) ?? [];

  return (
    <section className="container my-16 flex flex-col items-center gap-6 text-center">
      <p className="text-6xl font-bold text-[#c0092a]">{t("code")}</p>

      <h1 className="text-2xl font-bold text-[#484848]">{t("title")}</h1>

      <p className="max-w-xl text-[#484848]">{t("description")}</p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">{t("toHome")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/categories">{t("allCategories")}</Link>
        </Button>
      </div>

      {categories.length > 0 && (
        <nav className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.category_name}`}
              className="text-sm text-[#484848] underline hover:text-[#c0092a]"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
};

export default NotFound;
