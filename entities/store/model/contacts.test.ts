import { describe, expect, it } from "vitest";
import { MAIN_PHONE_HREF, TELEGRAM_URL, VIBER_URL, viberDraftUrl } from "./contacts";

describe("контакти магазину", () => {
  // Telegram у віджеті колись розійшовся з футером — тепер усі канали з одного номера.
  it("дзвінок, Viber і Telegram ведуть на головний номер", () => {
    expect(MAIN_PHONE_HREF).toBe("tel:+380673834283");
    expect(TELEGRAM_URL).toBe("https://t.me/+380673834283");
    expect(VIBER_URL).toBe("https://invite.viber.com/?number=380673834283");
  });

  it("чернетка для Viber веде на той самий номер і кодує текст", () => {
    expect(viberDraftUrl("Фара & ліхтар")).toBe("viber://chat?number=%2B380673834283&draft=%D0%A4%D0%B0%D1%80%D0%B0%20%26%20%D0%BB%D1%96%D1%85%D1%82%D0%B0%D1%80");
  });
});
