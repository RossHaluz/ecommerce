import { npRequest } from "./np-request";
import { toCityOptions, toWarehouseOptions } from "../model/np-options";

export const searchCities = async (query: string, signal?: AbortSignal) =>
  toCityOptions(await npRequest("searchSettlements", { CityName: query, Limit: "20", Language: "UA" }, signal));

// За ref міста, а не за назвою: однойменні міста давали відділення з чужої області.
export const searchWarehouses = async (cityRef: string, query: string, signal?: AbortSignal) =>
  toWarehouseOptions(
    await npRequest("getWarehouses", { CityRef: cityRef, FindByString: query, Limit: "50", Language: "UA" }, signal)
  );
