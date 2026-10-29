"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { maskPhone } from "@/lib/format/mask-phone";
import type { PhoneLogin } from "../hooks/use-phone-login";
import { needsNewCode } from "../model/auth-failure";
import { LoginError } from "./login-error";
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

  // A rejected code is cleared so the next six digits submit on their own again.
  useEffect(() => {
    if (failure) setCode("");
  }, [failure]);

  return (
    <div className="flex flex-col gap-4">
      <p className="m-0 text-sm text-[#484848]">
        {t("codeSent", { phone: maskPhone(phone) })}{" "}
        <button type="button" onClick={changePhone} className="font-extrabold text-[#C0092A]">
          {t("changePhone")}
        </button>
      </p>
      <InputOTP
        maxLength={CODE_LENGTH}
        value={code}
        onChange={setCode}
        onComplete={verify}
        disabled={isVerifying || dead}
        autoFocus
        autoComplete="one-time-code"
        inputMode="numeric"
        aria-label={t("codeLabel")}
        containerClassName="justify-center"
      >
        <InputOTPGroup className="gap-2">
          {Array.from({ length: CODE_LENGTH }, (_, index) => (
            <InputOTPSlot key={index} index={index} className="h-12 w-11 rounded-lg border border-[#CFCFCF] text-xl font-extrabold" />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {isVerifying && <p className="m-0 text-center text-sm text-[#6B6B6B]">{t("checking")}</p>}
      <LoginError failure={failure} />
      <LoginResend secondsLeft={secondsLeft} onResend={resend} isSending={isSending} prominent={dead} />
    </div>
  );
};
