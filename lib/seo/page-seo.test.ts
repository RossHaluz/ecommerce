import { describe, expect, it, vi } from "vitest";
import { createTranslator } from "next-intl";
import uk from "@/messages/uk.json";
import pl from "@/messages/pl.json";
import { buildPageMetadata, getPageSeo } from "./page-seo";

const MESSAGES = { uk, pl } as const;

vi.mock("next-intl/server", () => ({
  getTranslations: async ({ locale, namespace }: { locale: "uk" | "pl"; namespace: string }) =>
    createTranslator({ locale, messages: MESSAGES[locale], namespace: namespace as never }),
}));

// Google обрізає заголовок приблизно на 60 символах — запит має вміститися до обрізу.
const SERP_TITLE_LIMIT = 60;

describe("getPageSeo", () => {
  it("головна: головний запит і «б/у» в заголовку, H1 і описі", async () => {
    const seo = await getPageSeo("uk", "home");

    expect(seo.title.startsWith("Запчастини до Ауді")).toBe(true);
    for (const text of [seo.title, seo.h1, seo.description]) expect(text).toContain("б/у");
  });

  it("каталог має свою тему й не повторює заголовок головної", async () => {
    const [home, catalog] = await Promise.all([getPageSeo("uk", "home"), getPageSeo("uk", "catalog")]);

    expect(catalog.title.startsWith("Каталог запчастин Audi")).toBe(true);
    expect(catalog.h1).toBe("Каталог запчастин Audi");
    expect(catalog.title).not.toContain("Запчастини до");
    expect(catalog.title).not.toBe(home.title);
  });

  it.each(["uk", "pl"])("заголовки (%s) вміщаються у видачу", async (locale) => {
    for (const page of ["home", "catalog"] as const) {
      expect((await getPageSeo(locale, page)).title.length).toBeLessThanOrEqual(SERP_TITLE_LIMIT);
    }
  });

  it("текст головної містить російські формулювання, за якими нас зараз не знаходять", () => {
    expect(uk.seo.home.text).toContain("запчасти ауди");
    expect(uk.seo.home.text).toContain("автозапчасти Audi б/у");
  });
});

describe("buildPageMetadata", () => {
  it("кладе ті самі заголовок і опис у метадані й openGraph, з адресою сторінки", async () => {
    const meta = await buildPageMetadata("uk", "catalog", "/categories");
    const seo = await getPageSeo("uk", "catalog");

    expect(meta.title).toBe(seo.title);
    expect(meta.openGraph).toEqual({ title: seo.title, description: seo.description });
    expect(String(meta.alternates?.canonical)).toContain("/categories");
  });
});
