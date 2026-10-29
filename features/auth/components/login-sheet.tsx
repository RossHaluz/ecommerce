"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import { useAfterLogin } from "../hooks/use-after-login";
import { usePhoneLogin, type LoginStep } from "../hooks/use-phone-login";
import { LoginSteps } from "./login-steps";

interface LoginSheetProps {
  /** Each place draws its own «Увійти»; the sheet is one. */
  renderTrigger: (open: () => void) => ReactNode;
  /** From the header the person wants the account; from favorites or checkout they stay where they are. */
  goToAccount?: boolean;
}

const TITLE: Record<LoginStep, string> = { phone: "phoneTitle", code: "codeTitle", name: "nameTitle" };
const LEAD: Partial<Record<LoginStep, string>> = { phone: "phoneLead", name: "nameLead" };

export const LoginSheet = ({ renderTrigger, goToAccount = false }: LoginSheetProps) => {
  const t = useTranslations("auth");
  const isPhone = useIsSmallScreen(1023);
  const [open, setOpen] = useState(false);
  const login = usePhoneLogin(useAfterLogin({ goToAccount, close: () => setOpen(false) }));
  const lead = LEAD[login.step];

  return (
    <>
      {renderTrigger(() => setOpen(true))}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={isPhone ? "bottom" : "right"}
          className="flex flex-col gap-4 bg-white p-4 text-[#2E2E2E] max-lg:rounded-t-2xl sm:max-w-[420px] lg:p-6"
        >
          <SheetHeader className="space-y-1 pr-8 text-left">
            <SheetTitle className="text-xl font-extrabold text-[#2E2E2E]">{t(TITLE[login.step])}</SheetTitle>
            {lead && <SheetDescription className="text-sm text-[#484848]">{t(lead)}</SheetDescription>}
          </SheetHeader>
          <LoginSteps login={login} />
        </SheetContent>
      </Sheet>
    </>
  );
};
