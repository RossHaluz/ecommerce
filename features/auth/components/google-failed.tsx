"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { GoogleReturnError } from "../model/google-return";
import { googleStartUrl } from "../api/auth-api";
import { LoginSheet } from "./login-sheet";

const BUTTON = "flex h-12 w-full items-center justify-center rounded-lg text-base font-extrabold";

/** Says why Google login did not work and offers the way that always does — the phone. */
export const GoogleFailed = ({ reason }: { reason: GoogleReturnError }) => {
  const t = useTranslations("auth");
  // Retrying makes no sense when the e-mail belongs to another account: the phone is the way in.
  const canRetry = reason !== "email_taken";

  return (
    <section className="mx-auto flex w-full max-w-[420px] flex-col gap-3 rounded-2xl bg-white p-5" aria-live="polite">
      <h1 className="m-0 text-xl font-extrabold text-[#2E2E2E]">{t("googleFailedTitle")}</h1>
      <p role="alert" className="m-0 text-[15px] leading-[22px] text-[#484848]">
        {t(`googleErrors.${reason}`)}
      </p>
      <LoginSheet
        goToAccount
        renderTrigger={(open) => (
          <button type="button" onClick={open} className={`${BUTTON} bg-[#C0092A] text-white`}>
            {t("usePhone")}
          </button>
        )}
      />
      {canRetry && (
        <a href={googleStartUrl("/account")} className={`${BUTTON} border border-[#CFCFCF] text-[#2E2E2E]`}>
          {t("retryGoogle")}
        </a>
      )}
      <Link href="/" className="py-2 text-center text-[15px] font-bold text-[#484848]">
        {t("home")}
      </Link>
    </section>
  );
};
