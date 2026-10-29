"use client";

import { useTranslations } from "next-intl";
import { useAfterLogin } from "../hooks/use-after-login";
import { usePhoneLogin } from "../hooks/use-phone-login";
import { LoginSteps } from "./login-steps";

/** Login drawn inside a panel that already has its own header (the phone menu). */
export const LoginPanel = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations("auth");
  const login = usePhoneLogin(useAfterLogin({ goToAccount: true, close: onClose }));

  return (
    <div className="flex flex-col gap-3">
      {login.step === "phone" && <p className="m-0 text-sm text-[#484848]">{t("phoneLead")}</p>}
      {login.step === "name" && <p className="m-0 text-base font-extrabold">{t("nameTitle")}</p>}
      <LoginSteps login={login} />
    </div>
  );
};
