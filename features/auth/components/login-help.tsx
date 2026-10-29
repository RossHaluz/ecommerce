"use client";

import { useTranslations } from "next-intl";
import { VIBER_URL } from "@/entities/store/model/contacts";

/** The way out when the code never arrives: a person, and a reminder that ordering needs no account. */
export const LoginHelp = () => {
  const t = useTranslations("auth");

  return (
    <p className="m-0 text-[13px] leading-[19px] text-[#6B6B6B]">
      {t.rich("help", {
        viber: (chunks) => (
          <a href={VIBER_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#C0092A]">
            {chunks}
          </a>
        ),
      })}
    </p>
  );
};
