"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { PhoneLogin } from "../hooks/use-phone-login";
import { needsNewCode } from "../model/auth-failure";
import { LoginError } from "./login-error";
import { LoginHelp } from "./login-help";
import { LoginResend } from "./login-resend";

const CODE_LENGTH = 6;

type Props = Pick<
  PhoneLogin,
  "phone" | "failure" | "verify" | "resend" | "changePhone" | "secondsLeft" | "isVerifying" | "isSending"
>;

export const LoginCodeStep = ({ phone, failure, verify, resend, changePhone, secondsLeft, isVerifying, isSending }: Props) => {
  const t = useTranslations("auth");
  const [code, setCode] = useState("");
  const dead = failure !== null && needsNewCode(failure);
  const complete = code.length === CODE_LENGTH;

  // A rejected code is cleared so the next six digits submit on their own again.
  useEffect(() => {
    if (failure) setCode("");
  }, [failure]);

  return (
    <div className="flex flex-col gap-4">
      <p className="m-0 text-[15px] leading-[21px] text-[#484848]">
        {t("codeSent", { phone })} ·{" "}
        <button type="button" onClick={changePhone} className="font-extrabold text-[#C0092A]">
          {t("changePhone")}
        </button>
      </p>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-extrabold" id="login-code-label">
          {t("codeLabel")}
        </span>
        <InputOTP
          maxLength={CODE_LENGTH}
          value={code}
          onChange={setCode}
          onComplete={verify}
          disabled={isVerifying || dead}
          autoFocus
          autoComplete="one-time-code"
          inputMode="numeric"
          aria-labelledby="login-code-label"
        >
          <InputOTPGroup className="grid w-full grid-cols-6 gap-2">
            {Array.from({ length: CODE_LENGTH }, (_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-14 w-full rounded-[10px] border-2 border-[#CFCFCF] text-2xl font-extrabold first:rounded-[10px] last:rounded-[10px]"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <span className="text-[13px] text-[#6B6B6B]">{t("codeHint")}</span>
      </div>
      <LoginError failure={failure} />
      {!dead && (
        <button
          type="button"
          onClick={() => verify(code)}
          disabled={!complete || isVerifying}
          className="h-[52px] w-full rounded-[10px] bg-[#C0092A] text-[17px] font-extrabold text-white hover:bg-[#E2153B] disabled:opacity-50"
        >
          {isVerifying ? t("checking") : t("signIn")}
        </button>
      )}
      <LoginResend secondsLeft={secondsLeft} onResend={resend} isSending={isSending} prominent={dead} />
      <LoginHelp />
    </div>
  );
};
