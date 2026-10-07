import { describe, expect, it } from "vitest";
import { checkoutDefaults, isDropshipper } from "./checkout-defaults";

describe("checkoutDefaults", () => {
  it("постійному покупцю підставляє профіль, телефон — у форматі маски", () => {
    const user = { firstName: "Олександр", lastName: "Коваль", phoneNumber: "380671234567", email: "o@k.ua" };
    expect(checkoutDefaults(user)).toMatchObject({
      phone: "+380 671 23 45 67",
      firstName: "Олександр",
      lastName: "Коваль",
      email: "o@k.ua",
      deliveryMethod: "warehouse",
      paymentMethod: "cashOnDelivary",
    });
  });

  it("гість — порожні контакти", () => {
    expect(checkoutDefaults(null)).toMatchObject({ phone: "", firstName: "", lastName: "", email: "" });
  });
});

describe("isDropshipper", () => {
  it("лише тип drop", () => {
    expect(isDropshipper({ type: "drop" })).toBe(true);
    expect(isDropshipper({ type: "user" })).toBe(false);
    expect(isDropshipper(null)).toBe(false);
  });
});
