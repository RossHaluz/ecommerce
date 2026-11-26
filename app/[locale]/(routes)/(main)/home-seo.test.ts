import { describe, expect, it, vi } from "vitest";
import { createTranslator } from "next-intl";
import uk from "@/messages/uk.json";
import pl from "@/messages/pl.json";
import { getHomeSeo } from "./home-seo";

const MESSAGES = { uk, pl } as const;

vi.mock("next-intl/server", () => ({
  getTranslations: async ({
    locale,
    namespace,
  }: {
    locale: "uk" | "pl";
    namespace: string;
  }) =>
    createTranslator({
      locale,
      messages: MESSAGES[locale],
      namespace: namespace as never,
    }),
}));

// Google обрізає заголовок приблизно на 60 символах — запит має вміститися до обрізу.
const SERP_TITLE_LIMIT = 60;

describe("getHomeSeo", () => {
  it("ставить головний запит і «б/у» в заголовок, H1 і опис", async () => {
    const seo = await getHomeSeo("uk");

    expect(seo.title.startsWith("Запчастини до Ауді")).toBe(true);
    expect(seo.title.length).toBeLessThanOrEqual(SERP_TITLE_LIMIT);
    for (const text of [seo.title, seo.h1, seo.description])
      expect(text).toContain("б/у");
  });

  it("польська версія має свої тексти тієї ж довжини", async () => {
    const seo = await getHomeSeo("pl");

    expect(seo.title.startsWith("Części do Audi")).toBe(true);
    expect(seo.title.length).toBeLessThanOrEqual(SERP_TITLE_LIMIT);
  });

  it("текст головної містить російські формулювання, за якими нас зараз не знаходять", () => {
    expect(uk.seo.home.text).toContain("запчасти ауди");
    expect(uk.seo.home.text).toContain("автозапчасти Audi б/у");
  });
});
