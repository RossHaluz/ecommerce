"use client";

import { useTranslations } from "next-intl";
import { formatCountdown } from "../model/format-countdown";

interface LoginResendProps {
  secondsLeft: number;
  onResend: () => void;
  isSending: boolean;
  /** The old code is dead (expired or locked): the resend becomes the main action. */
  prominent: boolean;
}

export const LoginResend = ({ secondsLeft, onResend, isSending, prominent }: LoginResendProps) => {
  const t = useTranslations("auth");
  const waiting = secondsLeft > 0;

  if (prominent && !waiting) {
    return (
      <button
        type="button"
        onClick={onResend}
        disabled={isSending}
        className="h-[52px] w-full rounded-[10px] bg-[#C0092A] text-[17px] font-extrabold text-white disabled:opacity-60"
      >
        {isSending ? t("sending") : t("resend")}
      </button>
    );
  }

  return (
    <p className="m-0 flex flex-wrap items-center justify-center gap-x-1.5 text-[15px] text-[#484848]">
      {t("resendQuestion")}
      {waiting ? (
        <span className="font-bold text-[#6B6B6B]">{t("resendIn", { time: formatCountdown(secondsLeft) })}</span>
      ) : (
        <button
          type="button"
          onClick={onResend}
          disabled={isSending}
          className="min-h-11 font-extrabold text-[#C0092A] disabled:opacity-60"
        >
          {isSending ? t("sending") : t("resend")}
        </button>
      )}
    </p>
  );
};
