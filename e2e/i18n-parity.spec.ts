import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { LOCALES } from "../i18n/locales";

const readCatalog = (locale: string): Record<string, unknown> =>
  JSON.parse(
    readFileSync(join(__dirname, "..", "messages", `${locale}.json`), "utf-8"),
  );

const flattenKeys = (value: unknown, prefix = ""): string[] => {
  if (typeof value !== "object" || value === null) return [prefix];

  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, nested]) => flattenKeys(nested, prefix ? `${prefix}.${key}` : key),
  );
};

const valueAt = (messages: Record<string, unknown>, path: string) =>
  path.split(".").reduce<any>((node, part) => node?.[part], messages);

test.describe("паритет мовних каталогів", () => {
  test("усі мови мають однакові ключі", () => {
    const [referenceLocale, ...others] = LOCALES;
    const referenceKeys = flattenKeys(readCatalog(referenceLocale)).sort();

    for (const locale of others) {
      const keys = flattenKeys(readCatalog(locale)).sort();

      expect(
        referenceKeys.filter((key) => !keys.includes(key)),
        `у messages/${locale}.json бракує ключів`,
      ).toEqual([]);
      expect(
        keys.filter((key) => !referenceKeys.includes(key)),
        `у messages/${locale}.json є лишні ключі, яких немає в ${referenceLocale}`,
      ).toEqual([]);
    }
  });

  test("жодне значення не порожнє", () => {
    for (const locale of LOCALES) {
      const messages = readCatalog(locale);
      const empty = flattenKeys(messages).filter(
        (key) => !String(valueAt(messages, key) ?? "").trim(),
      );

      expect(empty, `порожні значення в messages/${locale}.json`).toEqual([]);
    }
  });
});
