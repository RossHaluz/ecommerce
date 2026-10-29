import { describe, it, expect } from "vitest";
import { parseGoogleReturn } from "./google-return";

describe("parseGoogleReturn", () => {
  it("takes the handoff from after «#» and the way back from the query", () => {
    expect(parseGoogleReturn("?next=%2Fcheckout", "#h=abc.def")).toEqual({ kind: "handoff", handoff: "abc.def", next: "/checkout" });
  });

  it("keeps the language prefix of the page the person came from", () => {
    expect(parseGoogleReturn("?next=%2Fpl%2Ffavorites", "#h=x")).toMatchObject({ next: "/pl/favorites" });
  });

  it("never sends the person off the site", () => {
    expect(parseGoogleReturn("?next=https%3A%2F%2Fevil.example", "#h=x")).toMatchObject({ next: "/account" });
    expect(parseGoogleReturn("?next=%2F%2Fevil.example", "#h=x")).toMatchObject({ next: "/account" });
  });

  it("passes on the reason the API gave", () => {
    expect(parseGoogleReturn("?error=email_taken", "")).toEqual({ kind: "error", reason: "email_taken" });
    expect(parseGoogleReturn("?error=cancelled", "")).toEqual({ kind: "error", reason: "cancelled" });
  });

  it("does not show an unknown reason as if it were known", () => {
    expect(parseGoogleReturn("?error=%3Cscript%3E", "")).toEqual({ kind: "error", reason: "unknown" });
  });

  it("treats a page opened without a handoff (reload, old link) as expired", () => {
    expect(parseGoogleReturn("?next=%2Fcheckout", "")).toEqual({ kind: "error", reason: "expired" });
  });
});
