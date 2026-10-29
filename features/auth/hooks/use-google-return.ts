"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "@/features/account";
import { AuthRequestError, exchangeGoogleHandoff } from "../api/auth-api";
import { parseGoogleReturn, type GoogleReturnError } from "../model/google-return";

const SESSION_DAYS = 30;

/** Trades the handoff from the URL for a session once; `failure` is set when there is nothing to trade. */
export function useGoogleReturn(onSignedIn: (next: string) => void) {
  const { signIn } = useSession();
  const [failure, setFailure] = useState<GoogleReturnError | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const result = parseGoogleReturn(window.location.search, window.location.hash);
    // The handoff leaves the address bar and history at once, whatever happens next.
    window.history.replaceState(null, "", window.location.pathname);
    if (result.kind === "error") return setFailure(result.reason);

    exchangeGoogleHandoff(result.handoff)
      .then(({ token }) => {
        signIn(token, { days: SESSION_DAYS });
        onSignedIn(result.next);
      })
      .catch((error) => setFailure(error instanceof AuthRequestError && error.failure.reason === "network" ? "google" : "expired"));
  }, [signIn, onSignedIn]);

  return failure;
}
