import { describe, expect, it, vi } from "vitest";
import { submitOrder } from "./submit-order";

describe("submitOrder", () => {
  it("шле тіло як є і повертає створене замовлення цілим — його показує сторінка «Дякуємо»", async () => {
    const order = { orderNumber: 1042, createdAt: "2026-10-07" };
    const create = vi.fn().mockResolvedValue(order);
    await expect(submitOrder({ phone: "+380 671 23 45 67" }, create)).resolves.toBe(order);
    expect(create).toHaveBeenCalledWith({ phone: "+380 671 23 45 67" });
  });

  it("бекенд не створив замовлення — помилка, а не порожній успіх", async () => {
    await expect(submitOrder({}, vi.fn().mockResolvedValue(null))).rejects.toThrow();
  });
});
