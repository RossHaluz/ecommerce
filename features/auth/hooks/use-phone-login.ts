"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/actions/get-data";
import { useSession } from "@/features/account";
import { AuthRequestError, sendOtp, verifyOtp } from "../api/auth-api";
import type { AuthFailure } from "../model/auth-failure";
import { useCountdown } from "./use-countdown";

export type LoginStep = "phone" | "code" | "name";

const SESSION_DAYS = 30;

const asFailure = (error: unknown): AuthFailure =>
  error instanceof AuthRequestError ? error.failure : { reason: "unknown" };

/** Phone → SMS code → (new customer) name. `onDone` fires once the person is signed in and finished. */
export function usePhoneLogin(onDone: () => void) {
  const { signIn } = useSession();
  const countdown = useCountdown();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [failure, setFailure] = useState<AuthFailure | null>(null);

  const toCodeStep = (sentTo: string, waitSec: number) => {
    setPhone(sentTo);
    setStep("code");
    countdown.start(waitSec);
  };

  const send = useMutation({
    mutationFn: sendOtp,
    onMutate: () => setFailure(null),
    onSuccess: (sent, sentTo) => toCodeStep(sentTo, sent.resendAfterSec),
    onError: (error, sentTo) => {
      const reason = asFailure(error);
      // A code went out less than a minute ago: it is already on the phone, so go and type it.
      if (reason.reason === "too_soon") return toCodeStep(sentTo, reason.retryAfterSec);
      setFailure(reason);
    },
  });

  const verify = useMutation({
    mutationFn: (code: string) => verifyOtp(phone, code),
    onMutate: () => setFailure(null),
    onSuccess: ({ token, isNew }) => {
      signIn(token, { days: SESSION_DAYS });
      if (isNew) setStep("name");
      else onDone();
    },
    onError: (error) => setFailure(asFailure(error)),
  });

  const saveName = useMutation({
    mutationFn: (name: { firstName: string; lastName: string }) => updateUser(name),
    // Already signed in: a name that failed to save is asked again in the account, not a reason to block.
    onSettled: onDone,
  });

  return {
    step,
    phone,
    failure,
    secondsLeft: countdown.secondsLeft,
    sendCode: (to: string) => send.mutate(to),
    resend: () => send.mutate(phone),
    verify: (code: string) => verify.mutate(code),
    saveName: saveName.mutate,
    skipName: onDone,
    changePhone: () => {
      setFailure(null);
      setStep("phone");
    },
    isSending: send.isPending,
    isVerifying: verify.isPending,
    isSavingName: saveName.isPending,
  };
}

export type PhoneLogin = ReturnType<typeof usePhoneLogin>;
