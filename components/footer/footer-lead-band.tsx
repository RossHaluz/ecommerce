import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { ContactButtons } from "@/components/contacts/contact-buttons";
import { MAIN_PHONE, MAIN_PHONE_HREF } from "@/entities/store/model/contacts";

/** Останній шанс не втратити покупця, який дійшов до низу й нічого не знайшов. */
export const FooterLeadBand = () => {
  const t = useTranslations("footer");

  return (
    <div className="bg-[#3A3A3A]">
      <div className="container flex flex-col gap-2.5 py-5 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex flex-col gap-1 lg:flex-1">
          <p className="text-lg font-extrabold text-white md:text-xl">{t("leadTitle")}</p>
          <p className="text-sm md:text-[15px]">{t("leadText")}</p>
        </div>
        <a
          href={MAIN_PHONE_HREF}
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-[15px] font-extrabold text-[#2E2E2E]"
        >
          <Phone size={18} aria-hidden />
          <span className="lg:hidden">{t("call")} ·</span>
          {MAIN_PHONE.display}
        </a>
        <div className="lg:w-[260px]">
          <ContactButtons withCall={false} />
        </div>
      </div>
    </div>
  );
};
