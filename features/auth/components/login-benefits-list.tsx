"use client";

import { useTranslations } from "next-intl";

const KEYS = ["track", "favorites", "checkout"] as const;

/** On a phone there is no side column, so the same reasons sit under the buttons, shorter. */
export const LoginBenefitsList = () => {
  const t = useTranslations("auth.benefits");

  return (
    <ul className="m-0 mt-2 flex list-none flex-col gap-2.5 rounded-xl bg-[#F7F7F7] p-3.5 text-sm leading-5 text-[#484848] lg:hidden">
      {KEYS.map((key) => (
        <li key={key}>✓ {t(key)}</li>
      ))}
    </ul>
  );
};
