"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "@/features/account";
import { AuthRequestError, exchangeGoogleHandoff } from "../api/auth-api";
import { parseGoogleReturn, type GoogleReturnError } from "../model/google-return";

const SESSION_DAYS = 30;

export type GoogleReturnState =
  | { kind: "working" }
  | { kind: "failed"; reason: GoogleReturnError }
  /** Signed in, but without a phone: orders need one, so it is asked before going back. */
  | { kind: "needsPhone"; name: string; next: string };

/** Trades the handoff from the URL for a session once, then goes back — or says what is still needed. */
export function useGoogleReturn(onSignedIn: (next: string) => void): GoogleReturnState {
  const { signIn } = useSession();
  const [state, setState] = useState<GoogleReturnState>({ kind: "working" });
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const result = parseGoogleReturn(window.location.search, window.location.hash);
    // The handoff leaves the address bar and history at once, whatever happens next.
    window.history.replaceState(null, "", window.location.pathname);
    if (result.kind === "error") return setState({ kind: "failed", reason: result.reason });

    exchangeGoogleHandoff(result.handoff)
      .then(({ token, needsPhone, name }) => {
        signIn(token, { days: SESSION_DAYS });
        if (needsPhone) setState({ kind: "needsPhone", name, next: result.next });
        else onSignedIn(result.next);
      })
      .catch((error) =>
        setState({
          kind: "failed",
          reason: error instanceof AuthRequestError && error.failure.reason === "network" ? "google" : "expired",
        })
      );
  }, [signIn, onSignedIn]);

  return state;
}
