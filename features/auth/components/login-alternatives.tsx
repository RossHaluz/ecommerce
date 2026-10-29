"use client";

import { useTranslations } from "next-intl";
import { GoogleButton } from "./google-button";

/** Other ways in, under the phone form. Apple joins here once its developer account exists. */
export const LoginAlternatives = () => {
  const t = useTranslations("auth");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 text-sm text-[#6B6B6B]" aria-hidden>
        <span className="h-px flex-1 bg-[#E6E6E6]" />
        {t("or")}
        <span className="h-px flex-1 bg-[#E6E6E6]" />
      </div>
      <GoogleButton />
    </div>
  );
};
