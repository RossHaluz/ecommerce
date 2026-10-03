"use client";

import { useTranslations } from "next-intl";
import Phone from "/public/images/phone.svg";
import Clock from "/public/images/clock.svg";
import { PhoneNumbersDropdown } from "@/components/phone-numbers-dropdown";

const BLOCK_CLASS = "bg-[#F2F2F2] rounded-[5px] py-[13px] px-[15px] flex gap-[10px] text-[#484848]";

export const MenuContacts = () => {
  const t = useTranslations("contact");

  return (
    <>
      <div className={`${BLOCK_CLASS} items-center`}>
        <Phone className="stroke-[#484848]" aria-hidden />
        <PhoneNumbersDropdown />
      </div>

      <div className={`${BLOCK_CLASS} items-start`}>
        <Clock aria-hidden />
        <div className="flex flex-col gap-[15px] text-base">
          <span>{t("scheduleWeekdays")}</span>
          <span>{t("scheduleWeekend")}</span>
        </div>
      </div>
    </>
  );
};
