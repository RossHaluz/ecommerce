"use client";

import { useTranslations } from "next-intl";

/** «✓ Вхід через Google · Name», the title and why the phone is needed — as on the mockup. */
export const AddPhoneIntro = ({ name }: { name: string }) => {
  const t = useTranslations("auth");

  return (
    <div className="flex flex-col gap-3.5">
      <span className="self-start rounded-full bg-[#EEF6F0] px-2.5 py-1 text-[13px] font-extrabold text-[#1E5E34]">
        ✓ {name ? t("addPhoneBadge", { name }) : t("addPhoneBadgeNoName")}
      </span>
      <h1 className="m-0 text-[26px] font-extrabold leading-8 text-[#2E2E2E]">{t("addPhoneTitle")}</h1>
      <p className="m-0 text-[15px] leading-[21px] text-[#5C5C5C]">{t("addPhoneLead")}</p>
    </div>
  );
};
