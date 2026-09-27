import Section from "@/components/section";
import Contacts from "./_components/contacts";
import Map from "./_components/map";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
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
