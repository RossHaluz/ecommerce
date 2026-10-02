import { useTranslations } from "next-intl";
import { PhoneIcon } from "lucide-react";
import Logo from "@/components/ui/logo";
import { PhoneNumbersDropdown } from "@/components/phone-numbers-dropdown";

export const FooterContacts = () => {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col gap-[10px] mb-[15px] items-start">
      <Logo className="h-[34px] w-[56px]" />
      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center gap-2">
          <PhoneIcon className="stroke-[#FFFDFD]" />
          <PhoneNumbersDropdown />
        </div>
        <address className="text-current text-xs not-italic">
          {t("address")}: {t("addressValue")}
        </address>
        <p className="text-current text-xs">
          {t("scheduleWeekdays")}, {t("scheduleWeekend")}
        </p>
      </div>
    </div>
  );
};
