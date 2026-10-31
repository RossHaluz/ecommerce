import { describe, it, expect } from "vitest";
import { parseTab, stepStates } from "./order-stage";

describe("stepStates", () => {
  it("marks only the first step for a fresh order", () => {
    expect(stepStates("accepted")).toEqual(["now", "todo", "todo", "todo"]);
  });

  it("completes every step for a received order", () => {
    expect(stepStates("received")).toEqual(["done", "done", "done", "done"]);
  });

  it("draws no line for cancelled or finished orders", () => {
    expect(stepStates("cancelled")).toBeNull();
    expect(stepStates("finished")).toBeNull();
  });
});

describe("parseTab", () => {
  it("keeps a known tab and falls back to all", () => {
    expect(parseTab("done")).toBe("done");
    expect(parseTab("x")).toBe("all");
    expect(parseTab(undefined)).toBe("all");
  });
});
