export type AuthFailure =
  | { reason: "wrong"; attemptsLeft: number }
  | { reason: "too_soon" | "too_many"; retryAfterSec: number }
  | { reason: "expired" | "locked" | "missing" | "invalid_input" | "sms_failed" | "network" | "unknown" };

interface FailureBody {
  reason?: string;
  retryAfterSec?: number;
  attemptsLeft?: number;
}

const PLAIN = new Set(["expired", "locked", "missing"]);

/** API reply → why it failed. `status: null` means the request never got an answer. */
export function toAuthFailure(status: number | null, body: FailureBody | null): AuthFailure {
  if (status === null) return { reason: "network" };
  const reason = body?.reason;
  if (reason === "wrong") return { reason, attemptsLeft: body?.attemptsLeft ?? 0 };
  if (reason === "too_soon" || reason === "too_many") return { reason, retryAfterSec: body?.retryAfterSec ?? 60 };
  if (reason && PLAIN.has(reason)) return { reason: reason as "expired" | "locked" | "missing" };
  if (status === 400) return { reason: "invalid_input" };
  if (status === 502) return { reason: "sms_failed" };
  return { reason: "unknown" };
}

/** Message key under `auth.errors` plus its values; the wait is shown in minutes once it passes one. */
export function failureMessage(failure: AuthFailure): { key: string; values?: Record<string, number> } {
  switch (failure.reason) {
    case "wrong":
      return { key: "wrong", values: { left: failure.attemptsLeft } };
    case "too_soon":
      return { key: "tooSoon", values: { seconds: failure.retryAfterSec } };
    case "too_many":
      return { key: "tooMany", values: { minutes: Math.ceil(failure.retryAfterSec / 60) } };
    case "invalid_input":
      return { key: "invalidPhone" };
    case "sms_failed":
      return { key: "smsFailed" };
    default:
      return { key: failure.reason };
  }
}

/** A code that can no longer be used: the person must ask for a new one rather than retype. */
export const needsNewCode = (failure: AuthFailure) =>
  failure.reason === "expired" || failure.reason === "locked" || failure.reason === "missing";
