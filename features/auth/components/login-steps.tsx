"use client";

import type { PhoneLogin } from "../hooks/use-phone-login";
import { LoginPhoneStep } from "./login-phone-step";
import { LoginCodeStep } from "./login-code-step";
import { LoginNameStep } from "./login-name-step";
import { LoginAlternatives } from "./login-alternatives";
import { LoginBenefitsList } from "./login-benefits-list";

/** The current step only; the frame around it (sheet, menu panel) belongs to whoever opened the login. */
export const LoginSteps = ({ login }: { login: PhoneLogin }) => {
  if (login.step === "code") return <LoginCodeStep {...login} />;
  if (login.step === "name") return <LoginNameStep {...login} />;
  return (
    <>
      <LoginPhoneStep {...login} />
      <LoginAlternatives />
      <LoginBenefitsList />
    </>
  );
};
