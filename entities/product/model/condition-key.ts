import type { Product } from "@/lib/types";

const KEY = { used: "conditionUsed", new: "conditionNew" } as const;

/** The trust list's line for the part's condition; an unknown condition gets no line rather than a guess. */
export const conditionKey = (condition: Product["condition"]) => (condition ? KEY[condition] : null);
