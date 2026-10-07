import { describe, expect, it } from "vitest";
import { shouldLeaveSuccess } from "./should-leave-success";

describe("shouldLeaveSuccess", () => {
  it("щойно оформлене замовлення: перший рендер ще не бачить його — лишаємось на «Дякуємо»", () => {
    expect(shouldLeaveSuccess({ mounted: false, rehydrated: true, hasOrder: false })).toBe(false);
  });

  it("перезавантаження сторінки: поки localStorage не відновлено — не йдемо", () => {
    expect(shouldLeaveSuccess({ mounted: true, rehydrated: false, hasOrder: false })).toBe(false);
  });

  it("замовлення є — лишаємось", () => {
    expect(shouldLeaveSuccess({ mounted: true, rehydrated: true, hasOrder: true })).toBe(false);
  });

  it("зайшли на /success без замовлення — на головну", () => {
    expect(shouldLeaveSuccess({ mounted: true, rehydrated: true, hasOrder: false })).toBe(true);
  });
});
