import Section from "@/components/section";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo/alternates";
import { ReturnsSection, type ReturnsSectionContent } from "./_components/returns-section";

interface ReturnsPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: ReturnsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "returns" });

  return {
    alternates: buildAlternates("/returns", params.locale),
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

/** Умови повернення: на них посилаються картка товару, футер і Google Merchant Center. */
const ReturnsPage = async ({ params }: ReturnsPageProps) => {
  // Без цього переклади читають мову з headers() і сторінка стає динамічною.
  setRequestLocale(params.locale);
  const t = await getTranslations("returns");
  const sections = Object.values(t.raw("sections") as Record<string, ReturnsSectionContent>);

  return (
    <Section title={t("pageTitle")} titleAs="h1">
      <div className="flex max-w-[760px] flex-col gap-6">
        {sections.map((section) => (
          <ReturnsSection key={section.title} {...section} />
        ))}
      </div>
    </Section>
  );
};

export default ReturnsPage;
