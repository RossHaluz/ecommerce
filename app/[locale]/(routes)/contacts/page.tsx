import Section from "@/components/section";
import Contacts from "./_components/contacts";
import Map from "./_components/map";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo/alternates";

interface ContactsPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: ContactsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "contact" });

  return {
    alternates: buildAlternates("/contacts", params.locale),
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const ContactsPage = async ({ params }: ContactsPageProps) => {
  // Без цього переклади читають мову з headers() і сторінка стає динамічною.
  setRequestLocale(params.locale);
  const t = await getTranslations("contact");

  return (
    <Section title={t("pageTitle")} titleAs="h1">
      <div className="flex flex-col gap-[30px] md:flex-row">
        <Contacts />
        <Map />
      </div>
    </Section>
  );
};

export default ContactsPage;
