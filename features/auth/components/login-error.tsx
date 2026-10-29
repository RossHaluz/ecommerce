"use client";

import { useTranslations } from "next-intl";
import { failureMessage, type AuthFailure } from "../model/auth-failure";

export const LoginError = ({ failure }: { failure: AuthFailure | null }) => {
  const t = useTranslations("auth.errors");
  if (!failure) return null;
  const { key, values } = failureMessage(failure);

  return (
    <p role="alert" className="m-0 rounded-lg bg-[#FFF2F4] px-3 py-2 text-sm font-semibold text-[#C0092A]">
      {t(key, values)}
    </p>
  );
};
