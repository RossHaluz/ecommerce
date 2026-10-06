import { describe, expect, it, vi } from "vitest";
import { placeOneClickOrder } from "./place-one-click-order";

const item = { productId: "p1", title: "Обвіс SQ8", price: "3500", article: "3362", quantity: 1 as const };

describe("placeOneClickOrder", () => {
  it("шле телефон і товар з тими самими доставкою/оплатою, що й раніше, і повертає номер", async () => {
    const create = vi.fn().mockResolvedValue({ orderNumber: 1042 });

    await expect(placeOneClickOrder("+380 67 123 45 67", item, create)).resolves.toBe(1042);
    expect(create).toHaveBeenCalledWith({
      phone: "+380 67 123 45 67",
      postService: "novaPoshta",
      paymentMethod: "cashOnDelivary",
      products: [item],
    });
  });

  // createOrder повертає null при збої — «Дякуємо» без замовлення губить покупця.
  it("якщо бекенд не створив замовлення — помилка, а не порожній успіх", async () => {
    await expect(placeOneClickOrder("+380 67 123 45 67", item, vi.fn().mockResolvedValue(null))).rejects.toThrow();
  });
});
