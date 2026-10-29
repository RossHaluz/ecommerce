"use client";

import { useTranslations } from "next-intl";
import { LoginSheet } from "@/features/auth";

/** Постійному покупцю — вхід тим самим кодом із SMS, що в шапці; після входу форма заповниться його даними. */
export const LoginPrompt = () => {
  const t = useTranslations("checkout");

  return (
    <p className="m-0 text-sm text-[#484848]">
      {t("loginPrompt")}{" "}
      <LoginSheet
        renderTrigger={(open) => (
          <button type="button" onClick={open} className="font-extrabold text-[#C0092A]">
            {t("loginCta")}
          </button>
        )}
      />{" "}
      <span className="lg:hidden">{t("loginNote")}</span>
    </p>
  );
};
