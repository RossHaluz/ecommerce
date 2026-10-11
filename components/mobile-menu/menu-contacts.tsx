"use client";

import { useTranslations } from "next-intl";
import { ContactButtons } from "@/components/contacts/contact-buttons";

/** Три дороги до менеджера одним рядом і коли він на місці — щоб не дзвонили в неділю в порожнечу. */
export const MenuContacts = () => {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col gap-2">
      <ContactButtons />
      <span className="text-center text-[13px] text-[#6B6B6B]">
        {t("scheduleWeekdays")} · {t("addressValue")}
      </span>
    </div>
  );
};
