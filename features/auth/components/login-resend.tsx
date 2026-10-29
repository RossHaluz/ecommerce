"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface LoginResendProps {
  secondsLeft: number;
  onResend: () => void;
  isSending: boolean;
  /** The old code is dead (expired or locked): the resend becomes the main action. */
  prominent: boolean;
}

export const LoginResend = ({ secondsLeft, onResend, isSending, prominent }: LoginResendProps) => {
  const t = useTranslations("auth");

  if (secondsLeft > 0) {
    return <p className="m-0 text-center text-sm text-[#6B6B6B]">{t("resendIn", { seconds: secondsLeft })}</p>;
  }

  return (
    <button
      type="button"
      onClick={onResend}
      disabled={isSending}
      className={cn(
        "h-11 w-full rounded-lg text-[15px] font-extrabold disabled:opacity-60",
        prominent ? "bg-[#C0092A] text-white" : "text-[#C0092A]"
      )}
    >
      {isSending ? t("sending") : t("resend")}
    </button>
  );
};
