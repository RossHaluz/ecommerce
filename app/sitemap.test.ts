import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAllProducts, getCategories } from "@/actions/get-data";
import sitemap from "./sitemap";

vi.mock("@/actions/get-data", () => ({
  getAllProducts: vi.fn(),
  getCategories: vi.fn(),
}));

const categories = [
  { id: "c1", category_name: "optyka", children: [{ id: "c2", category_name: "fary" }] },
];
const products = [
  {
    product_name: "fara-q7",
    categories: [{ categoryId: "c2" }],
    models: [{ model: { modelName: "q7-4m" } }],
  },
];

const SITE = "https://audiparts.test";
const paths = async () => (await sitemap()).map(({ url }) => url.replace(SITE, ""));

describe("sitemap", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", SITE);
    vi.mocked(getCategories).mockResolvedValue(categories as never);
    vi.mocked(getAllProducts).mockResolvedValue({ products, meta: {} } as never);
  });

  it("lists categories, products, models and non-empty category + model pairs", async () => {
    expect(await paths()).toEqual(
      expect.arrayContaining([
        "/categories/optyka",
        "/categories/fary",
        "/product/fara-q7",
        "/q7-4m",
        "/categories/fary/q7-4m",
      ])
    );
  });

  it("refuses to build a truncated sitemap when products did not load", async () => {
    vi.mocked(getAllProducts).mockResolvedValue(null as never);

    await expect(sitemap()).rejects.toThrow();
  });

  it("refuses to build a truncated sitemap when categories did not load", async () => {
    vi.mocked(getCategories).mockResolvedValue(null as never);

    await expect(sitemap()).rejects.toThrow();
  });
});
