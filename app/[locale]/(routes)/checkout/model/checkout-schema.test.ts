import { describe, expect, it } from "vitest";
import { createCheckoutSchema, type CheckoutValues } from "./checkout-schema";

const t = (key: string) => key;

const valid: CheckoutValues = {
  phone: "+380 671 23 45 67",
  firstName: "Олександр",
  lastName: "Коваль",
  email: "",
  deliveryMethod: "warehouse",
  paymentMethod: "cashOnDelivary",
  city: "м. Київ, Київська обл.",
  ref_city: "city-ref",
  separation: "Відділення №1",
  ref_separation: "wh-ref",
  address: "",
  comment: "",
  clientFirstName: "",
  clientLastName: "",
  clientPhone: "",
};

const errors = (values: Partial<CheckoutValues>, isDrop = false) => {
  const result = createCheckoutSchema(t, isDrop).safeParse({ ...valid, ...values });
  // Перша помилка поля — та, що бачить людина під полем.
  return result.success ? {} : Object.fromEntries(result.error.issues.reverse().map((i) => [i.path.join("."), i.message]));
};

describe("createCheckoutSchema", () => {
  it("повністю заповнена форма на відділення проходить", () => {
    expect(errors({})).toEqual({});
  });

  it("без прізвища не пропускає: Нова пошта не видасть посилку", () => {
    expect(errors({ lastName: "  " })).toEqual({ lastName: "lastNameRequired" });
  });

  it("телефон лише у форматі маски", () => {
    expect(errors({ phone: "0671234567" })).toEqual({ phone: "phoneInvalid" });
  });

  it("email необов'язковий, але якщо введено — має бути справжнім", () => {
    expect(errors({ email: "" })).toEqual({});
    expect(errors({ email: "ivan@" })).toEqual({ email: "emailInvalid" });
  });

  it("відділення: місто й відділення мають бути обрані з довідника", () => {
    expect(errors({ ref_city: "", ref_separation: "" })).toEqual({
      city: "cityRequired",
      separation: "warehouseRequired",
    });
  });

  it("кур'єр: потрібна адреса, відділення — ні", () => {
    expect(errors({ deliveryMethod: "courier", ref_separation: "", address: "" })).toEqual({
      address: "addressRequired",
    });
  });

  it("самовивіз: ні міста, ні відділення не питаємо", () => {
    expect(errors({ deliveryMethod: "pickup", city: "", ref_city: "", ref_separation: "" })).toEqual({});
  });

  it("перевізник: досить назви міста без довідника", () => {
    expect(errors({ deliveryMethod: "transporter", ref_city: "", ref_separation: "" })).toEqual({});
    expect(errors({ deliveryMethod: "transporter", city: "" , ref_city: "" })).toEqual({ city: "cityRequired" });
  });

  it("дропшипер мусить вказати отримувача; роздрібному ці поля не потрібні", () => {
    expect(errors({}, true)).toEqual({
      clientFirstName: "firstNameRequired",
      clientLastName: "lastNameRequired",
      clientPhone: "phoneRequired",
    });
    expect(errors({ clientFirstName: "Ірина", clientLastName: "Бойко", clientPhone: "+380 501 11 22 33" }, true)).toEqual({});
  });
});
