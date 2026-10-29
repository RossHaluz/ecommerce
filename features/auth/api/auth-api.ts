import { toAuthFailure, type AuthFailure } from "../model/auth-failure";

export class AuthRequestError extends Error {
  constructor(readonly failure: AuthFailure) {
    super(failure.reason);
    this.name = "AuthRequestError";
  }
}

export interface OtpSent {
  resendAfterSec: number;
  expiresInSec: number;
}

export interface OtpVerified {
  token: string;
  isNew: boolean;
}

// Straight from the browser, not through a server action: the API limits SMS per client address,
// and via the site's server every visitor would share that server's one address.
async function post<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${process.env.BACKEND_URL}/api/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new AuthRequestError(toAuthFailure(null, null));
  }
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new AuthRequestError(toAuthFailure(response.status, payload));
  return payload?.data as T;
}

export const sendOtp = (phoneNumber: string) => post<OtpSent>("send-otp", { phoneNumber });

export const verifyOtp = (phoneNumber: string, code: string) => post<OtpVerified>("verify-otp", { phoneNumber, code });

export const exchangeGoogleHandoff = (handoff: string) => post<OtpVerified>("google/exchange", { handoff });

/** The API's own page that sends the person to Google; `next` is where to come back on this site. */
export const googleStartUrl = (next: string) =>
  `${process.env.BACKEND_URL}/auth/google?next=${encodeURIComponent(next)}`;
