import { describe, expect, it } from "vitest";
import { buildOrderPayload, type CartLine } from "./build-order-payload";
import type { CheckoutValues } from "./checkout-schema";

const values: CheckoutValues = {
  phone: "+380 671 23 45 67",
  firstName: " Олександр ",
  lastName: "Коваль",
  email: "",
  deliveryMethod: "warehouse",
  paymentMethod: "cashOnDelivary",
  city: "м. Київ, Київська обл.",
  ref_city: "city-ref",
  separation: "Відділення №1",
  ref_separation: "wh-ref",
  address: "вул. Хрещатик, 1",
  comment: "",
  clientFirstName: "",
  clientLastName: "",
  clientPhone: "",
};

// Рядок кошика з бекенда: ціна інколи текстом.
const items: CartLine[] = [{ id: "p1", quantity: 2, price: "3500", title: "Обвіс SQ8", article: "3362" }];

describe("buildOrderPayload", () => {
  it("шле бекенду ті самі поля, що й стара форма (роздріб, відділення)", () => {
    expect(buildOrderPayload(values, items, false)).toEqual({
      postService: "novaPoshta",
      paymentMethod: "cashOnDelivary",
      firstName: "Олександр",
      lastName: "Коваль",
      phone: "+380 671 23 45 67",
      email: "",
      comment: "",
      city: "м. Київ, Київська обл.",
      ref_city: "city-ref",
      separation: "Відділення №1",
      ref_separation: "wh-ref",
      // Адреса з кур'єрської вкладки не їде разом з відділенням.
      address: "",
      products: [{ productId: "p1", quantity: 2, price: 3500, title: "Обвіс SQ8", article: "3362" }],
    });
  });

  it("дві однакові деталі по $30: бекенду йде ціна за штуку, а не $60 суми рядка", () => {
    const line: CartLine = { id: "p2", quantity: 2, price: 60, priceForOne: 30, title: "Накладка", article: "1573" };
    expect(buildOrderPayload(values, [line], false).products).toEqual([
      { productId: "p2", quantity: 2, price: 30, title: "Накладка", article: "1573" },
    ]);
  });

  it("кур'єр: адреса без відділення — за цим бекенд ставить «Кур'єрська доставка»", () => {
    const payload = buildOrderPayload({ ...values, deliveryMethod: "courier" }, items, false);
    expect(payload).toMatchObject({ postService: "novaPoshta", address: "вул. Хрещатик, 1", separation: "", ref_separation: "" });
  });

  it("самовивіз: жодної адреси", () => {
    const payload = buildOrderPayload({ ...values, deliveryMethod: "pickup" }, items, false);
    expect(payload).toMatchObject({ postService: "pickup", city: "", ref_city: "", separation: "", address: "" });
  });

  it("перевізник лишається окремою службою", () => {
    expect(buildOrderPayload({ ...values, deliveryMethod: "transporter" }, items, true).postService).toBe("transporter");
  });

  it("дропшипер: додає отримувача; роздрібний запит цих полів не містить", () => {
    const drop = { ...values, clientFirstName: "Ірина ", clientLastName: "Бойко", clientPhone: "+380 501 11 22 33" };
    expect(buildOrderPayload(drop, items, true)).toMatchObject({
      clientFirstName: "Ірина",
      clientLastName: "Бойко",
      clientPhone: "+380 501 11 22 33",
    });
    expect(buildOrderPayload(drop, items, false)).not.toHaveProperty("clientPhone");
  });
});
