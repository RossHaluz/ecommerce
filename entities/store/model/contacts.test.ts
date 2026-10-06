import { describe, expect, it } from "vitest";
import { MAIN_PHONE_HREF, TELEGRAM_URL, VIBER_URL } from "./contacts";

describe("контакти магазину", () => {
  // Telegram у віджеті колись розійшовся з футером — тепер усі канали з одного номера.
  it("дзвінок, Viber і Telegram ведуть на головний номер", () => {
    expect(MAIN_PHONE_HREF).toBe("tel:+380673834283");
    expect(TELEGRAM_URL).toBe("https://t.me/+380673834283");
    expect(VIBER_URL).toBe("https://invite.viber.com/?number=380673834283");
  });
});
