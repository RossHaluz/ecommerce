import { describe, it, expect } from "vitest";
import { formatTtn, novaPoshtaTrackingUrl } from "./waybill";

describe("waybill", () => {
  it("groups a 14-digit number like Nova Poshta does and leaves anything else as is", () => {
    expect(formatTtn("20450123456789")).toBe("20 4501 2345 6789");
    expect(formatTtn("123")).toBe("123");
  });

  it("links to the tracking page for that number", () => {
    expect(novaPoshtaTrackingUrl("20450123456789")).toBe("https://novaposhta.ua/tracking/?cargo_number=20450123456789");
  });
});
