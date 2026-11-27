import { describe, expect, it } from "vitest";
import { modelShortcuts, sectionShortcuts } from "./catalog-shortcuts";

const model = (name: string, modelName: string, products?: number) => ({
  id: modelName,
  name,
  modelName,
  ...(products === undefined ? {} : { _count: { products } }),
});

describe("modelShortcuts", () => {
  it("links models with parts, biggest first, and leaves out the empty ones", () => {
    const links = modelShortcuts([
      model("Q8 2018- 2023", "q8-2018--2023", 748),
      model("VW TRANSPORTER 2015-", "vw-transporter", 0),
      model("Q7 4M 2015-2019", "q7-4m-2015-2019", 1757),
      model("TOUAREG 2018-", "touareg-2018-", 19),
    ]);

    expect(links).toEqual([
      { href: "/q7-4m-2015-2019", label: "Audi Q7 4M (2015–2019)" },
      { href: "/q8-2018--2023", label: "Audi Q8 (2018–2023)" },
      { href: "/touareg-2018-", label: "TOUAREG (2018+)" },
    ]);
  });

  it("skips a model with no address and keeps models when the count is unknown", () => {
    expect(modelShortcuts([model("", "", 5), model("A4", "a4")])).toEqual([{ href: "/a4", label: "Audi A4" }]);
  });
});

describe("sectionShortcuts", () => {
  it("lists every subsection, which the sidebar shows only inside an open section", () => {
    const body = {
      id: "1",
      name: "Кузовні частини",
      category_name: "kuzovni-chastyny",
      parentId: null,
      children: [
        { id: "2", name: "Бампери", category_name: "bampera", parentId: "1" },
        { id: "3", name: "Крила", category_name: "kryla", parentId: "1" },
      ],
    };
    const acoustics = { id: "4", name: "Акустика", category_name: "akustyka", parentId: null };

    expect(sectionShortcuts([body, acoustics])).toEqual([
      { href: "/categories/bampera", label: "Бампери" },
      { href: "/categories/kryla", label: "Крила" },
    ]);
  });
});
