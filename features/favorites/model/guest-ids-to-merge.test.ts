import { describe, expect, it } from "vitest";
import { guestIdsToMerge } from "./guest-ids-to-merge";

const item = (id: string) => ({ id, productName: id, title: id, catalogNumber: "OE", savedPrice: 1 });

describe("guestIdsToMerge", () => {
  it("first sign-in sends the guest list to the account", () => {
    expect(guestIdsToMerge({ items: [item("a"), item("b")], accountId: null })).toEqual(["a", "b"]);
  });

  it("an already-synced browser sends nothing, so removals on other devices stick", () => {
    expect(guestIdsToMerge({ items: [item("a")], accountId: "u1" })).toEqual([]);
  });

  it("a list left from another account never leaks into the new one", () => {
    expect(guestIdsToMerge({ items: [item("a")], accountId: "u0" })).toEqual([]);
  });
});
