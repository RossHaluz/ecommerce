import { describe, expect, it } from "vitest";
import { maskPhone } from "./mask-phone";

describe("maskPhone", () => {
  it("лишає код і дві останні цифри — людина впізнає свій номер, екран не видає його повністю", () => {
    expect(maskPhone("+380 67 123 45 67")).toBe("+380 67 ••• •• 67");
    expect(maskPhone("+380671234567")).toBe("+380 67 ••• •• 67");
  });

  it("незвичний формат повертає як є, а не ламає", () => {
    expect(maskPhone("12345")).toBe("12345");
  });
});
