import { describe, expect, it } from "vitest";
import { DELIVERY_METHODS, deliveryMethodOf, deliveryMethodsFor, isPaymentMethod, toPostService } from "./order-options";

describe("order-options", () => {
  it("відділення й кур'єр для бекенду — обидва novaPoshta", () => {
    expect(toPostService("warehouse")).toBe("novaPoshta");
    expect(toPostService("courier")).toBe("novaPoshta");
    expect(toPostService("pickup")).toBe("pickup");
  });

  it("зі збереженого замовлення відновлює той самий спосіб, що обрав покупець", () => {
    expect(deliveryMethodOf({ postService: "novaPoshta", address: "" })).toBe("warehouse");
    expect(deliveryMethodOf({ postService: "novaPoshta", address: "вул. Хрещатик, 1" })).toBe("courier");
    expect(deliveryMethodOf({ postService: "pickup" })).toBe("pickup");
    expect(deliveryMethodOf({ postService: "transporter" })).toBe("transporter");
  });

  it("туди й назад — без втрат для кожного способу", () => {
    for (const method of DELIVERY_METHODS) {
      const address = method === "courier" ? "вул. Хрещатик, 1" : "";
      expect(deliveryMethodOf({ postService: toPostService(method), address })).toBe(method);
    }
  });

  it("перевізник — лише дропшиперам", () => {
    expect(deliveryMethodsFor(false)).not.toContain("transporter");
    expect(deliveryMethodsFor(true)).toContain("transporter");
  });

  it("невідомий спосіб оплати зі старих замовлень (напр. monobank) не видається за наш", () => {
    expect(isPaymentMethod("cashOnDelivary")).toBe(true);
    expect(isPaymentMethod("monobank")).toBe(false);
  });
});
