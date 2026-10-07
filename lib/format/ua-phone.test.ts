import { describe, expect, it } from "vitest";
import { UA_PHONE_PATTERN, toMaskedPhone } from "./ua-phone";

describe("toMaskedPhone", () => {
  it("будь-який запис українського номера — у формат маски, який пропускає перевірка", () => {
    for (const raw of ["380671234567", "+380 67 123 45 67", "0671234567", "+380 671 23 45 67"]) {
      const masked = toMaskedPhone(raw);
      expect(masked).toBe("+380 671 23 45 67");
      expect(UA_PHONE_PATTERN.test(masked)).toBe(true);
    }
  });

  it("невідомий чи неповний номер — порожньо, щоб людина ввела сама, а не бачила сміття в масці", () => {
    expect(toMaskedPhone(undefined)).toBe("");
    expect(toMaskedPhone("12345")).toBe("");
    expect(toMaskedPhone("+48 600 123 456")).toBe("");
  });
});
