import { useTranslations } from "next-intl";
import { ContactButtons } from "@/components/contacts/contact-buttons";

export const OrderQuestions = () => {
  const t = useTranslations("success");

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-4">
      <h2 className="m-0 text-lg font-extrabold text-[#2E2E2E]">{t("questionsTitle")}</h2>
      <ContactButtons withCall={false} />
      <p className="m-0 text-[13px] text-[#6B6B6B]">{t("questionsNote")}</p>
    </section>
  );
};
