export type GoogleReturnError = "cancelled" | "state" | "google" | "email_taken" | "expired" | "unknown";

export type GoogleReturn =
  | { kind: "handoff"; handoff: string; next: string }
  | { kind: "error"; reason: GoogleReturnError };

const KNOWN: GoogleReturnError[] = ["cancelled", "state", "google", "email_taken", "expired"];

/** Only a path on this site; anything that could lead away → the account. */
export const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/account";

/** What the API's redirect back from Google says: a handoff to trade for a session, or why it failed. */
export function parseGoogleReturn(search: string, hash: string): GoogleReturn {
  const params = new URLSearchParams(search);
  const error = params.get("error");
  if (error) return { kind: "error", reason: KNOWN.includes(error as GoogleReturnError) ? (error as GoogleReturnError) : "unknown" };

  const handoff = new URLSearchParams(hash.replace(/^#/, "")).get("h");
  if (!handoff) return { kind: "error", reason: "expired" };
  return { kind: "handoff", handoff, next: safeNext(params.get("next")) };
}
