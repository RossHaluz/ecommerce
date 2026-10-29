"use client";

import { useTranslations } from "next-intl";

/** Says up front that a phone with an existing account is joined, not refused. */
export const AddPhoneMergeNote = () => {
  const t = useTranslations("auth");

  return (
    <p className="m-0 rounded-[10px] bg-[#F7F7F7] p-3 text-[13px] leading-[19px] text-[#484848]">
      <strong>{t("mergeNoteTitle")}</strong> {t("mergeNote")}
    </p>
  );
};
