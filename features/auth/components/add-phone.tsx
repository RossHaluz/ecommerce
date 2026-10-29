"use client";

import { useTranslations } from "next-intl";
import { attachPhone } from "../api/auth-api";
import { usePhoneLogin } from "../hooks/use-phone-login";
import { AddPhoneIntro } from "./add-phone-intro";
import { AddPhoneMergeNote } from "./add-phone-merge-note";
import { LoginCodeStep } from "./login-code-step";
import { LoginNameStep } from "./login-name-step";
import { LoginPhoneStep } from "./login-phone-step";

const STEP_TITLE = "m-0 text-[26px] font-extrabold leading-8 text-[#2E2E2E]";

/** «Останній крок — ваш телефон» after Google: the same phone and code steps, confirming into the account. */
export const AddPhone = ({ name, onDone }: { name: string; onDone: () => void }) => {
  const t = useTranslations("auth");
  const login = usePhoneLogin(onDone, attachPhone);

  return (
    <section className="mx-auto flex w-full max-w-[440px] flex-col gap-4 rounded-2xl bg-white p-5 lg:p-8">
      {login.step === "phone" && (
        <>
          <AddPhoneIntro name={name} />
          <LoginPhoneStep {...login} />
          <AddPhoneMergeNote />
        </>
      )}
      {login.step === "code" && (
        <>
          <h1 className={STEP_TITLE}>{t("codeTitle")}</h1>
          <LoginCodeStep {...login} />
        </>
      )}
      {login.step === "name" && (
        <>
          <h1 className={STEP_TITLE}>{t("nameTitle")}</h1>
          <LoginNameStep {...login} />
        </>
      )}
    </section>
  );
};
