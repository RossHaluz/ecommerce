"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { ContactButtons } from "@/components/contacts/contact-buttons";
import { maskPhone } from "@/lib/format/mask-phone";

/** Після «1 клік»: номер замовлення, коли й на який номер передзвонять, і швидший шлях — месенджер. */
export const OneClickSuccess = ({ orderNumber, phone }: { orderNumber: number; phone: string }) => {
  const t = useTranslations("orderOneClick");
  const tContact = useTranslations("contact");

  return (
    <div className="flex flex-col items-center gap-3.5 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6F2EA]">
        <Check size={34} strokeWidth={2.6} className="text-[#008038]" aria-hidden />
      </span>
      <p className="m-0 text-[22px] font-extrabold leading-7 text-[#2E2E2E]">{t("successTitle", { number: orderNumber })}</p>
      <p className="m-0 text-[15px] leading-[22px] text-[#484848]">
        {t("successText", { phone: maskPhone(phone), hours: tContact("scheduleWeekdays") })}
      </p>
      <p className="m-0 mt-1 text-sm font-bold text-[#2E2E2E]">{t("faster")}</p>
      <div className="self-stretch">
        <ContactButtons withCall={false} />
      </div>
    </div>
  );
};
