import { describe, expect, it } from "vitest";
import { toSuccessView, type StoredOrder } from "./success-view";

const order: StoredOrder = {
  orderNumber: 1042,
  firstName: "Олександр",
  lastName: "Коваль",
  phone: "+380 671 23 45 67",
  city: "м. Київ, Київська обл.",
  separation: "Відділення №1: вул. Пирогівський шлях, 135",
  address: "",
  postService: "novaPoshta",
  paymentMethod: "cashOnDelivary",
  orderType: "RETAIL",
};

describe("toSuccessView", () => {
  it("роздріб на відділення: ім'я, замаскований телефон, місто й відділення, три кроки з ТТН", () => {
    expect(toSuccessView(order)).toMatchObject({
      orderNumber: 1042,
      recipient: { name: "Олександр Коваль", phone: "+380 67 ••• •• 67" },
      deliveryMethod: "warehouse",
      deliveryPlace: "м. Київ, Київська обл., Відділення №1: вул. Пирогівський шлях, 135",
      paymentMethod: "cashOnDelivary",
      nextSteps: ["call", "shipping", "tracking"],
      items: [],
    });
  });

  it("кур'єр: місце доставки — адреса, а не відділення", () => {
    const view = toSuccessView({ ...order, address: "вул. Хрещатик, 1", separation: "" });
    expect(view.deliveryMethod).toBe("courier");
    expect(view.deliveryPlace).toBe("м. Київ, Київська обл., вул. Хрещатик, 1");
  });

  it("самовивіз: без відправки й ТТН", () => {
    const view = toSuccessView({ ...order, postService: "pickup", city: "", separation: "" });
    expect(view.nextSteps).toEqual(["call", "pickup"]);
    expect(view.deliveryPlace).toBe("");
  });

  it("дропшипер: отримувач — його клієнт", () => {
    const view = toSuccessView({
      ...order,
      orderType: "DROPSHIP",
      dropshipDetails: { clientFirstName: "Ірина", clientLastName: "Бойко", clientPhone: "+380 501 11 22 33" },
    });
    expect(view.recipient).toEqual({ name: "Ірина Бойко", phone: "+380 50 ••• •• 33" });
  });

  it("старий спосіб оплати (monobank) не показуємо як наш варіант", () => {
    expect(toSuccessView({ ...order, paymentMethod: "monobank" }).paymentMethod).toBeNull();
  });
});
