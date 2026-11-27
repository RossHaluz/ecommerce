import { describe, expect, it, vi } from "vitest";
import { createTranslator } from "next-intl";
import uk from "@/messages/uk.json";
import pl from "@/messages/pl.json";
import { getCategoryModelSeo } from "./category-model-seo";

const MESSAGES = { uk, pl } as const;

vi.mock("next-intl/server", () => ({
  getTranslations: async ({ locale, namespace }: { locale: "uk" | "pl"; namespace: string }) =>
    createTranslator({ locale, messages: MESSAGES[locale], namespace: namespace as never }),
}));

const bumpersQ8 = { categoryName: "Бампери", modelName: "Q8 2018- 2023", productCount: 18 };

describe("getCategoryModelSeo", () => {
  it("називає кількість і «б/у та нові» в заголовку — те, за що клікають у видачі", async () => {
    const seo = await getCategoryModelSeo({ locale: "uk", ...bumpersQ8 });

    expect(seo.title).toBe("Бампери Audi Q8 (2018–2023) — 18 шт., б/у та нові | Audiparts");
    expect(seo.h1).toBe("Бампери Audi Q8 (2018–2023)");
  });

  it("не обіцяє цін в описі: у багатьох парах більшість деталей «договірна»", async () => {
    const seo = await getCategoryModelSeo({ locale: "uk", ...bumpersQ8 });

    expect(seo.description).toContain("б/у та нові: 18 деталей в каталозі");
    expect(seo.description).not.toMatch(/цін/);
  });

  it("польська — ті самі факти", async () => {
    const seo = await getCategoryModelSeo({ locale: "pl", ...bumpersQ8, productCount: 1 });

    expect(seo.title).toBe("Бампери Audi Q8 (2018–2023) — 1 szt., używane i nowe | Audiparts");
    expect(seo.description).toContain("1 część w katalogu");
  });
});
