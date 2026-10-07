import { describe, expect, it } from "vitest";
import { toCityOptions, toWarehouseOptions } from "./np-options";

describe("toCityOptions", () => {
  it("бере ref міста доставки й повну назву з областю", () => {
    const data = [
      {
        Addresses: [
          { Present: "м. Хмельницький, Хмельницька обл.", DeliveryCity: "db5c88ac", MainDescription: "Хмельницький", Warehouses: 1060 },
        ],
      },
    ];
    expect(toCityOptions(data)).toEqual([{ ref: "db5c88ac", label: "м. Хмельницький, Хмельницька обл.", name: "Хмельницький" }]);
  });

  it("відкидає села без відділень і без міста доставки", () => {
    const data = [
      {
        Addresses: [
          { Present: "с. Без відділень", DeliveryCity: "x1", MainDescription: "Без", Warehouses: 0 },
          { Present: "с. Без ref", DeliveryCity: "", MainDescription: "Без", Warehouses: 2 },
        ],
      },
    ];
    expect(toCityOptions(data)).toEqual([]);
  });

  it("порожня або невдала відповідь — порожній список, а не виняток", () => {
    expect(toCityOptions(null)).toEqual([]);
    expect(toCityOptions([])).toEqual([]);
  });
});

describe("toWarehouseOptions", () => {
  it("повний опис — у замовлення; номер і адреса — двома рядками підказки", () => {
    expect(toWarehouseOptions([{ Ref: "w1", Description: "Відділення №1: вул. Трудова, 5/4" }])).toEqual([
      { ref: "w1", label: "Відділення №1: вул. Трудова, 5/4", title: "Відділення №1", hint: "вул. Трудова, 5/4" },
    ]);
    expect(toWarehouseOptions(null)).toEqual([]);
  });

  it("двокрапка всередині адреси не губить її частину", () => {
    const [option] = toWarehouseOptions([{ Ref: "w2", Description: "Поштомат №5: ТЦ «Плаза»: 2 поверх" }]);
    expect(option).toMatchObject({ title: "Поштомат №5", hint: "ТЦ «Плаза»: 2 поверх" });
  });
});
