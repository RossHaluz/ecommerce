"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useAfterLogin } from "../hooks/use-after-login";
import { usePhoneLogin, type LoginStep } from "../hooks/use-phone-login";
import { LoginFrame } from "./login-frame";
import { LoginSteps } from "./login-steps";

interface LoginSheetProps {
  /** Each place draws its own «Увійти»; the window is one. */
  renderTrigger: (open: () => void) => ReactNode;
  /** From the header the person wants the account; from favorites or checkout they stay where they are. */
  goToAccount?: boolean;
}

const TITLE: Record<LoginStep, string> = { phone: "phoneTitle", code: "codeTitle", name: "nameTitle" };
const LEAD: Partial<Record<LoginStep, string>> = { phone: "phoneLead", name: "nameLead" };

export const LoginSheet = ({ renderTrigger, goToAccount = false }: LoginSheetProps) => {
  const t = useTranslations("auth");
  const [open, setOpen] = useState(false);
  const login = usePhoneLogin(useAfterLogin({ goToAccount, close: () => setOpen(false) }));
  const lead = LEAD[login.step];

  return (
    <>
      {renderTrigger(() => setOpen(true))}
      <LoginFrame
        open={open}
        onOpenChange={setOpen}
        title={t(TITLE[login.step])}
        lead={lead && t(lead)}
        badge={login.step === "name" ? t("phoneConfirmed") : undefined}
      >
        <LoginSteps login={login} />
      </LoginFrame>
    </>
  );
};
