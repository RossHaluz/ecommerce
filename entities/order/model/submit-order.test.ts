import { describe, expect, it, vi } from "vitest";
import { submitOrder } from "./submit-order";

describe("submitOrder", () => {
  it("шле тіло як є і повертає номер замовлення", async () => {
    const create = vi.fn().mockResolvedValue({ orderNumber: 1042 });
    await expect(submitOrder({ phone: "+380 671 23 45 67" }, create)).resolves.toBe(1042);
    expect(create).toHaveBeenCalledWith({ phone: "+380 671 23 45 67" });
  });

  it("бекенд не створив замовлення — помилка, а не порожній успіх", async () => {
    await expect(submitOrder({}, vi.fn().mockResolvedValue(null))).rejects.toThrow();
  });
});
