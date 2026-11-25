import { describe, expect, it } from "vitest";
import { conditionKey } from "./condition-key";

describe("conditionKey", () => {
  it("names the part's condition for the trust list", () => {
    expect(conditionKey("used")).toBe("conditionUsed");
    expect(conditionKey("new")).toBe("conditionNew");
  });

  it("says nothing when the condition is unknown", () => {
    expect(conditionKey(undefined)).toBeNull();
  });
});
