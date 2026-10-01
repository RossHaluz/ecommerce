import Section from "@/components/section";
import Contacts from "./_components/contacts";
import Map from "./_components/map";
import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    alternates: buildAlternates("/contacts", params.locale),
    title: `Контактна інформація інтернет магазину Audiparts`,
    description: `Контактна інформація інтернет магазину Audiparts по зачастинах під усі моделі Audi`,
  };
}

const ContactsPage = () => {
  return (
    <Section title="Контакти">
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[30px] md:flex-row">
          <Contacts />
          <Map />
        </div>
      </div>
    </Section>
  );
};

export default ContactsPage;
