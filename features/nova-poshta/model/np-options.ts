export interface CityOption {
  ref: string;
  label: string;
  name: string;
}

/** label — повний опис для замовлення; title/hint — два рядки в підказці, як у макеті. */
export interface WarehouseOption {
  ref: string;
  label: string;
  title: string;
  hint: string;
}

interface RawSettlement {
  Present: string;
  DeliveryCity: string;
  MainDescription: string;
  Warehouses: number;
}

/** Населені пункти без жодного відділення не показуємо: туди однаково нема куди відправити. */
export const toCityOptions = (data: { Addresses?: RawSettlement[] }[] | null): CityOption[] =>
  (data?.[0]?.Addresses ?? [])
    .filter((city) => city.DeliveryCity && city.Warehouses > 0)
    .map((city) => ({ ref: city.DeliveryCity, label: city.Present, name: city.MainDescription }));

export const toWarehouseOptions = (data: { Ref: string; Description: string }[] | null): WarehouseOption[] =>
  (data ?? []).map((warehouse) => {
    const [title, ...rest] = warehouse.Description.split(": ");
    return { ref: warehouse.Ref, label: warehouse.Description, title, hint: rest.join(": ") };
  });
