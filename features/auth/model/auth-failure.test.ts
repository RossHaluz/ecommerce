import { describe, it, expect } from "vitest";
import { toAuthFailure, failureMessage, needsNewCode } from "./auth-failure";

describe("toAuthFailure", () => {
  it("reads the reason the API gives, with its numbers", () => {
    expect(toAuthFailure(400, { reason: "wrong", attemptsLeft: 3 })).toEqual({ reason: "wrong", attemptsLeft: 3 });
    expect(toAuthFailure(429, { reason: "too_soon", retryAfterSec: 42 })).toEqual({ reason: "too_soon", retryAfterSec: 42 });
    expect(toAuthFailure(429, { reason: "locked" })).toEqual({ reason: "locked" });
  });

  it("treats a request that got no answer as a network problem", () => {
    expect(toAuthFailure(null, null)).toEqual({ reason: "network" });
  });

  it("maps a bare 400 to a bad number and 502 to an SMS that did not go", () => {
    expect(toAuthFailure(400, { message: "x" } as never)).toEqual({ reason: "invalid_input" });
    expect(toAuthFailure(502, null)).toEqual({ reason: "sms_failed" });
  });

  it("does not invent a reason it does not know", () => {
    expect(toAuthFailure(500, { reason: "boom" })).toEqual({ reason: "unknown" });
  });
});

describe("failureMessage", () => {
  it("shows attempts left and seconds as given", () => {
    expect(failureMessage({ reason: "wrong", attemptsLeft: 2 })).toEqual({ key: "wrong", values: { left: 2 } });
    expect(failureMessage({ reason: "too_soon", retryAfterSec: 40 })).toEqual({ key: "tooSoon", values: { seconds: 40 } });
  });

  it("rounds a long wait up to whole minutes", () => {
    expect(failureMessage({ reason: "too_many", retryAfterSec: 601 })).toEqual({ key: "tooMany", values: { minutes: 11 } });
  });
});

describe("needsNewCode", () => {
  it("is true only when retyping cannot help", () => {
    expect(needsNewCode({ reason: "expired" })).toBe(true);
    expect(needsNewCode({ reason: "locked" })).toBe(true);
    expect(needsNewCode({ reason: "wrong", attemptsLeft: 1 })).toBe(false);
    expect(needsNewCode({ reason: "network" })).toBe(false);
  });
});
